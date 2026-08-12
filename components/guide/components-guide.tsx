"use client"

import type { ReactNode } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  CommandBlock,
  CommentaryBubble,
  Section,
  Step,
} from "@/components/guide/guide-ui"
import { withBasePath } from "@/lib/base-path"

function AskClaudeCode({
  prompt,
  children,
}: {
  prompt: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2 rounded-none border border-primary/25 bg-primary/5 p-4">
      <p className="text-[11px] font-semibold tracking-wide text-primary [font-variant:small-caps]">
        Type this in Claude Code (in the terminal, inside the cloned repo)
      </p>
      <p className="text-sm font-medium leading-snug text-foreground">
        &ldquo;{prompt}&rdquo;
      </p>
      <div className="border-t border-primary/15 pt-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  )
}

function DownloadCard({
  fileName,
  description,
  href,
}: {
  fileName: string
  description: string
  href: string
}) {
  return (
    <a
      href={href}
      download
      className="block rounded-none border border-border bg-muted/30 p-4 transition hover:bg-muted/50"
    >
      <p className="font-mono text-sm font-medium text-primary">↓ {fileName}</p>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </a>
  )
}

export function ComponentsGuide() {
  const templateHref = withBasePath("/design-components/app-components-template.csv")
  const scriptHref = withBasePath("/design-components/generate_components.py")

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="font-mono text-4xl font-bold tracking-tight">Jira Components, by App Section</h1>
        <p className="text-lg text-muted-foreground">
          Tag Jira issues by the screen they touch — not just the epic they sit under — so anyone can see what&apos;s shipped, in flight, or backlog per page.
        </p>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Table of contents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a href="#components-intro" className="block text-sm text-primary hover:underline">
            Why this exists
          </a>
          <a href="#components-naming" className="block text-sm text-primary hover:underline">
            The naming convention
          </a>
          <a href="#components-map" className="block text-sm text-primary hover:underline">
            Mapping your app&apos;s surface area (no tracker needed)
          </a>
          <a href="#components-run" className="block text-sm text-primary hover:underline">
            Fill in the template &amp; run the script
          </a>
          <a href="#components-apply" className="block text-sm text-primary hover:underline">
            Once your components exist
          </a>
        </CardContent>
      </Card>

      <div className="space-y-12">
        <Section id="components-intro" title="Why this exists">
          <p className="text-sm text-muted-foreground">
            Jira&apos;s hierarchy (initiative → epic → story/bug) tells you what kind of work a ticket is, but not where in the product it lives. On MO, that gap was causing real design drift: nobody could glance at the backlog and see every ticket touching, say, the Rates page, so related fixes spread across loosely-connected tickets and nobody noticed the same screen had three things in flight at once.
          </p>
          <p className="text-sm text-muted-foreground">
            Jira Components close that gap — a native field, filterable and groupable on the board, and any issue can carry more than one. MO now has a full <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">MO/…</code> taxonomy built this way (72 components covering every section down to individual tabs). This page is how any other app repo — Servicing, Renewals, whatever&apos;s next — gets the same thing.
          </p>
          <CommentaryBubble name="Gate">
            The MO taxonomy took a few passes to get right — I started with one component per top-level section, then split the big multi-tab ones (Application Review, Closing Documents) once it was clear a single &quot;App Review&quot; bucket was hiding way too much. Worth deciding upfront how granular you want to go rather than redoing it.
          </CommentaryBubble>
        </Section>

        <Separator />

        <Section
          id="components-naming"
          title="The naming convention"
          description="One pattern, applied consistently, is what keeps this useful once more than one app adopts it"
        >
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Every component name is <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">&lt;Prefix&gt;/&lt;Section&gt;</code>, optionally followed by <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">– &lt;Sub-page&gt;</code>.
            </p>
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <strong className="text-foreground">Prefix</strong> is your app&apos;s short name — <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">MO</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Servicing</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Renewals</code>. Keep it consistent — Jira sorts components alphabetically, so a shared prefix is what keeps your team&apos;s components clustered together instead of scattered through everyone else&apos;s.
              </li>
              <li>
                <strong className="text-foreground">Section</strong> is a top-level nav item, named the way a user would see it — the label in the sidebar, not an internal codename.
              </li>
              <li>
                <strong className="text-foreground">Sub-page</strong> only applies when a section is really several distinct screens under one nav item — tabs, wizard steps, detail pages. One screen → one component, stop there. Multiple screens → a <em>shell</em> component for the section as a whole (nav behavior, shared layout) plus one component per screen.
              </li>
              <li>
                <strong className="text-foreground">Watch for collisions.</strong> The same word can mean two different screens — MO has a standalone &quot;Qualification&quot; page <em>and</em> a &quot;Qualification&quot; tab buried inside Application Review, genuinely different tools for different roles. Keep the sub-page form for the nested one, reserve the bare name for the standalone page, and say so in the description.
              </li>
              <li>
                <strong className="text-foreground">Every app gets two standing components</strong> regardless of its nav: <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">&lt;Prefix&gt;/Design System</code> for tickets about a shared, reusable component (not any one screen) and <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">&lt;Prefix&gt;/Sitewide</code> for audits or fixes that apply everywhere. These absorb the tickets that don&apos;t belong to one page — they came up constantly the moment MO started an accessibility sweep, and the same will happen for any cross-cutting pass (performance, a design-system migration, etc).
              </li>
            </ul>
          </div>
        </Section>

        <Separator />

        <Section
          id="components-map"
          title="Mapping your app's surface area"
          description="MO had a CSV tracker to start from. Your app almost certainly doesn't — and you don't need to build one by hand."
        >
          <CommentaryBubble name="Gate">
            My MO tracker didn&apos;t come from remembering every page — I cloned the{" "}
            <a
              href="https://github.com/nestoca/backoffice"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              backoffice
            </a>{" "}
            repo locally and had Claude Code go through it to identify every route. That&apos;s the fastest path for anyone else too — most of us aren&apos;t going to sit down and build our own spreadsheet tracker, and we don&apos;t need to.
          </CommentaryBubble>

          <Step number={1} title="Clone your app's repo locally">
            <p className="text-sm text-muted-foreground">
              Get a local copy of whichever repo powers the app you&apos;re mapping.
            </p>
            <CommandBlock
              command="git clone <your-app-repo-url>"
              description="Whatever repo the app you're mapping actually lives in"
            />
          </Step>

          <Step number={2} title="Open a terminal in that folder and start Claude Code">
            <CommandBlock command="cd <cloned-folder-name>" />
            <CommandBlock command="claude" description="Launches Claude Code in this terminal session" />
          </Step>

          <Step number={3} title="Ask it to inventory every route">
            <p className="text-sm text-muted-foreground">
              Point it at the routing/nav config and ask for the output in exactly the template&apos;s shape — that way its answer can go almost straight into the CSV, no manual reformatting.
            </p>
            <AskClaudeCode prompt="Look through this codebase's routing and navigation config and list every distinct page a user can reach. Group them the way the app's own nav does: a top-level section, then any tabs or sub-routes inside it. Output it as CSV with columns prefix,section,subpage,route,notes — use '<YOUR_APP_PREFIX>' as the prefix on every row, and leave subpage blank for a section that's genuinely one screen. If a route is gated behind a feature flag, say so in notes.">
              <p>
                Swap <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">&lt;YOUR_APP_PREFIX&gt;</code> for your app&apos;s short name (e.g. <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Servicing</code>) before sending. Claude Code can read the router file directly and usually the nav/sidebar config too — it doesn&apos;t need you to point it at anything more specific than &quot;this repo.&quot;
              </p>
            </AskClaudeCode>
          </Step>

          <Step number={4} title="Sanity-check the output">
            <p className="text-sm text-muted-foreground">
              Skim the CSV it produces against the app&apos;s live nav sidebar, or ask whoever knows the app best to eyeball it for five minutes. This mostly catches two things: a route that&apos;s in the code but hidden behind a flag you didn&apos;t know about, and a section named differently in code than what users actually see on screen — rename it to match the visible label.
            </p>
            <CommentaryBubble name="Gate">
              Claude Code got MO&apos;s routes right almost immediately, but a couple of role-gated screens (SDR-only flows, partner-portal-only pages) needed a second look since they don&apos;t show up unless you&apos;re logged in as that role.
            </CommentaryBubble>
          </Step>
        </Section>

        <Separator />

        <Section
          id="components-run"
          title="Fill in the template & run the script"
          description="Same script that built the MO/* taxonomy — pointed at your CSV instead of hardcoded Python"
        >
          <p className="text-sm text-muted-foreground">
            Save Claude Code&apos;s CSV output as your own copy of the template below (or open the template and paste its rows in — the columns already match). Delete the worked MO example rows once you see the pattern.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <DownloadCard
              fileName="app-components-template.csv"
              description="Columns: prefix, section, subpage, route, notes — with MO rows as a worked example"
              href={templateHref}
            />
            <DownloadCard
              fileName="generate_components.py"
              description="Reads any filled-in CSV and creates/repairs the matching Jira Components"
              href={scriptHref}
            />
          </div>

          <Step number={1} title="Get a Jira API token">
            <p className="text-sm text-muted-foreground">
              id.atlassian.com → Security → API tokens → Create. Treat it like a password — don&apos;t paste it into Slack or a chat thread. If you ever do, revoke it and make a new one.
            </p>
          </Step>

          <Step number={2} title="Set your environment variables">
            <CommandBlock command='export JIRA_EMAIL="you@nesto.ca"' />
            <CommandBlock command='export JIRA_API_TOKEN="<your token>"' />
            <CommandBlock command='export JIRA_PROJECT_KEY="UXUI"' description="Or whichever project your team files tickets in" />
          </Step>

          <Step number={3} title="Preview first">
            <CommandBlock command="DRY_RUN=1 python3 generate_components.py app-components-template.csv" description="Prints what it would create — makes no changes" />
            <CommentaryBubble name="Gate">
              Always do this pass first. It&apos;s the easiest way to catch a typo&apos;d prefix or a section name that got split into two by accident.
            </CommentaryBubble>
          </Step>

          <Step number={4} title="Run it for real">
            <CommandBlock command="pip install requests" />
            <CommandBlock command="python3 generate_components.py app-components-template.csv" />
            <p className="text-sm text-muted-foreground">
              It&apos;s safe to re-run any time you add rows later — it only creates what&apos;s missing and fills in a blank description, and never overwrites a description you&apos;ve already set by hand.
            </p>
          </Step>
        </Section>

        <Separator />

        <Section id="components-apply" title="Once your components exist">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Apply them to your team&apos;s existing tickets the way MO did: start with one pilot epic rather than everything at once, get a second pair of eyes from whoever owns that epic, and confirm the mapping before doing it project-wide.
            </p>
            <p>
              From there, filtering or grouping your board by Component gives the same &quot;what&apos;s shipped / in flight / backlog, by screen&quot; view MO built a small dashboard for. Ask Gate if it&apos;d help to extend that overlay to your app&apos;s components too, rather than building a separate one from scratch.
            </p>
          </div>
        </Section>
      </div>

      <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
        <p>Questions? Ask Gate on Slack.</p>
      </div>
    </div>
  )
}
