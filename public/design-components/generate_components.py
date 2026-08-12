#!/usr/bin/env python3
"""
Generic Jira Component bulk-creator, driven by a CSV app-surface map.

This is the reusable version of the script that built the MO/* taxonomy --
any team can point it at their own filled-in CSV (see
app-components-template.csv) instead of editing Python.

Usage:
    pip install requests
    export JIRA_EMAIL="you@nesto.ca"
    export JIRA_API_TOKEN="..."                # id.atlassian.com -> Security -> API tokens
    export JIRA_PROJECT_KEY="UXUI"              # whichever project you file tickets in
    python3 generate_components.py app-components-template.csv

Optional env vars:
    JIRA_BASE_URL    (default: https://nestoca.atlassian.net)
    DRY_RUN=1        (print what would happen, make no changes -- do this first!)

CSV columns (see the template for a filled example using MO's own rows):
    prefix   - short app/repo name, e.g. "Servicing" (same value on every row for that app)
    section  - the nav-level section name, e.g. "Payments"
    subpage  - the tab/sub-route name, or blank if the section is a single page
    route    - optional; the real URL path, used as the component description
    notes    - optional; short disambiguation text, e.g. "distinct from the
               standalone X page" -- appended to the description

What it does with those rows:
    - Groups rows by (prefix, section).
    - A section with exactly one row and no subpage -> ONE component:
          <prefix>/<section>
    - A section with more than one row, or any subpage filled in -> a SHELL
      component for the section itself, plus one component per row:
          <prefix>/<section>                       (shell / cross-tab)
          <prefix>/<section> – <subpage>            (one per row)
    - Every distinct prefix in the file also gets two standing cross-cutting
      components, since these consistently show up once a team starts
      tagging accessibility/perf/DS sweeps that don't belong to one page:
          <prefix>/Design System
          <prefix>/Sitewide

Same repair-safe behavior as the MO script: creates what's missing, fills
in a blank description on something that already exists, never overwrites
a description that's already set, and skips anything already correct. Safe
to re-run any time -- e.g. after adding new rows to the CSV.
"""

import csv
import os
import sys
import time
from collections import defaultdict

import requests

BASE_URL = os.environ.get("JIRA_BASE_URL", "https://nestoca.atlassian.net").rstrip("/")
PROJECT_KEY = os.environ.get("JIRA_PROJECT_KEY", "UXUI")
EMAIL = os.environ.get("JIRA_EMAIL")
TOKEN = os.environ.get("JIRA_API_TOKEN")
DRY_RUN = os.environ.get("DRY_RUN") == "1"

if not EMAIL or not TOKEN:
    sys.exit("Set JIRA_EMAIL and JIRA_API_TOKEN environment variables first.")

if len(sys.argv) < 2:
    sys.exit("Usage: python3 generate_components.py <path-to-csv>")

CSV_PATH = sys.argv[1]


def load_rows(path):
    with open(path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        rows = []
        for r in reader:
            prefix = (r.get("prefix") or "").strip()
            section = (r.get("section") or "").strip()
            if not prefix or not section or prefix.startswith("#"):
                continue  # skip blank rows / comment rows
            subpage = (r.get("subpage") or "").strip()
            if subpage in ("-", "—", "--"):
                subpage = ""
            rows.append({
                "prefix": prefix,
                "section": section,
                "subpage": subpage,
                "route": (r.get("route") or "").strip(),
                "notes": (r.get("notes") or "").strip(),
            })
        return rows


def describe(row):
    parts = [row["route"]]
    if row["notes"]:
        parts.append(f"({row['notes']})")
    return " ".join(p for p in parts if p)


def build_components(rows):
    """Returns an ordered list of (full_name, description) tuples."""
    groups = defaultdict(list)
    prefixes = set()
    for r in rows:
        groups[(r["prefix"], r["section"])].append(r)
        prefixes.add(r["prefix"])

    components = []
    for (prefix, section), group_rows in groups.items():
        is_multi = len(group_rows) > 1 or any(gr["subpage"] for gr in group_rows)
        if not is_multi:
            components.append((f"{prefix}/{section}", describe(group_rows[0])))
        else:
            # shell description never borrows a sub-page's specific route --
            # it's the "issue is about the section generally" bucket
            components.append((f"{prefix}/{section}", "(shell / cross-tab)"))
            for r in group_rows:
                label = r["subpage"] or section
                components.append((f"{prefix}/{section} – {label}", describe(r)))

    for prefix in sorted(prefixes):
        components.append((f"{prefix}/Design System",
                            "Cross-cutting: shared DS component fixes, not tied to one page"))
        components.append((f"{prefix}/Sitewide",
                            f"Cross-cutting: applies to every {prefix} screen (audits, sitewide code fixes)"))

    return components


def get_existing(session, project_key):
    url = f"{BASE_URL}/rest/api/3/project/{project_key}/components"
    resp = session.get(url)
    resp.raise_for_status()
    return {c["name"]: {"id": c["id"], "description": c.get("description") or ""} for c in resp.json()}


def create_component(session, project_key, name, description):
    url = f"{BASE_URL}/rest/api/3/component"
    return session.post(url, json={"name": name, "description": description, "project": project_key})


def update_component_description(session, component_id, description):
    url = f"{BASE_URL}/rest/api/3/component/{component_id}"
    return session.put(url, json={"description": description})


def main():
    rows = load_rows(CSV_PATH)
    if not rows:
        sys.exit(f"No usable rows found in {CSV_PATH} -- check the 'prefix' and 'section' columns are filled in.")

    components = build_components(rows)
    print(f"Parsed {len(rows)} CSV rows -> {len(components)} components to ensure.\n")

    session = requests.Session()
    session.auth = (EMAIL, TOKEN)
    session.headers.update({"Accept": "application/json", "Content-Type": "application/json"})

    print(f"Checking existing components on project {PROJECT_KEY}...")
    existing = get_existing(session, PROJECT_KEY)
    print(f"  {len(existing)} already exist\n")

    created, updated, skipped, failed = [], [], [], []

    for full_name, description in components:
        current = existing.get(full_name)

        if current is None:
            if DRY_RUN:
                print(f"[DRY RUN] would create: {full_name}  ({description})")
                created.append(full_name)
                continue
            resp = create_component(session, PROJECT_KEY, full_name, description)
            if resp.status_code == 201:
                print(f"  created: {full_name}")
                created.append(full_name)
            else:
                print(f"  FAILED (create): {full_name} -> {resp.status_code} {resp.text[:200]}")
                failed.append(full_name)
            time.sleep(0.25)

        elif not current["description"].strip():
            if DRY_RUN:
                print(f"[DRY RUN] would add description to existing: {full_name}")
                updated.append(full_name)
                continue
            resp = update_component_description(session, current["id"], description)
            if resp.status_code == 200:
                print(f"  updated description: {full_name}")
                updated.append(full_name)
            else:
                print(f"  FAILED (update): {full_name} -> {resp.status_code} {resp.text[:200]}")
                failed.append(full_name)
            time.sleep(0.25)

        else:
            skipped.append(full_name)

    print("\n--- Summary ---")
    print(f"Created: {len(created)}")
    print(f"Updated (description filled in): {len(updated)}")
    print(f"Skipped (already existed with a description): {len(skipped)}")
    print(f"Failed: {len(failed)}")
    if failed:
        print("Failed components:")
        for f in failed:
            print(f"  - {f}")


if __name__ == "__main__":
    main()
