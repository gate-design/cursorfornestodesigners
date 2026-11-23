// Capture the Token swap panel screenshots used on the "Token swap" tab.
//
//   node scripts/capture-token-swap-shots.mjs public/token-swap
//
// Needs: the Token swap tool running on localhost:6006 (yarn workspace doc storybook:tokens),
// a local review branch design/button-mapping for the "Changes on…" shots, and fe-shared's
// installed Playwright. Env: FE_SHARED (default ~/fe-shared), CHROMIUM (optional browser path).
// Uses a fresh headless browser profile, so it never touches anyone's saved session.
// Fills the Save and PR forms for the pictures but never submits them.
import { createRequire } from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const require = createRequire(path.join(process.env.FE_SHARED || path.join(os.homedir(), "fe-shared"), "package.json"));
const { chromium } = require("playwright");

const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });
const SB = "http://localhost:6006";
const STORY = "ui-components-forms-button--brand-variants";
const REVIEW = "design/button-mapping";

const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const context = await browser.newContext({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 2 });
// Open Storybook with the Token swap tab already selected (clicking the tab races Storybook)
await context.addInitScript(() => {
  try {
    const k = "@storybook/manager/store";
    const s = JSON.parse(localStorage.getItem(k) || "{}");
    s.selectedPanel = "token-swap/panel";
    localStorage.setItem(k, JSON.stringify(s));
  } catch {}
});
const page = await context.newPage();
/** Make the addon panel taller by dragging its top edge up. */
const tallPanel = async (pg) => {
  // Storybook may open on Controls whatever we preselect: click the tab until the panel shows
  const tabEl = pg.getByRole("tab", { name: "Token swap" });
  await tabEl.waitFor({ timeout: 60000 });
  const listed = pg.getByRole("heading", { name: / · \d+ tokens/ }).first();
  for (let i = 0; i < 8 && !(await listed.isVisible()); i++) {
    await tabEl.click();
    await pg.waitForTimeout(1000);
  }
  const tab = await pg.getByRole("tab", { name: "Token swap" }).boundingBox();
  await pg.mouse.move(700, tab.y - 3);
  await pg.mouse.down();
  await pg.mouse.move(700, 250, { steps: 12 });
  await pg.mouse.up();
  await pg.waitForTimeout(600);
  // Resizing can send Storybook back to the Controls tab
  for (let i = 0; i < 8 && !(await listed.isVisible()); i++) {
    await tabEl.click();
    await pg.waitForTimeout(1000);
  }
};
const saved = [];

const union = (boxes, pad = 0) => {
  const x = Math.min(...boxes.map((b) => b.x)) - pad;
  const y = Math.min(...boxes.map((b) => b.y)) - pad;
  const r = Math.max(...boxes.map((b) => b.x + b.width)) + pad;
  const btm = Math.max(...boxes.map((b) => b.y + b.height)) + pad;
  return { x: Math.max(0, x), y: Math.max(0, y), width: r - Math.max(0, x), height: btm - Math.max(0, y) };
};
const shot = async (name, clip) => {
  await page.screenshot({ path: path.join(OUT, name), clip });
  saved.push(name);
};
const center = (loc) => loc.evaluate((el) => el.scrollIntoView({ block: "center" }));
const box = async (loc) => {
  await center(loc);
  return loc.boundingBox();
};
/** Box of the nearest ancestor (or self) matching a predicate, found in the page. */
const ancestorBox = async (loc, predicateSrc) => {
  const handle = await loc.evaluateHandle((el, src) => {
    const pred = new Function("el", `return (${src})(el)`);
    let n = el;
    while (n && !pred(n)) n = n.parentElement;
    return n || el;
  }, predicateSrc);
  await handle.evaluate((el) => el.scrollIntoView({ block: "center" }));
  return handle.boundingBox();
};

const open = async (extra = "") => {
  await page.goto(`${SB}/?path=/story/${STORY}&addonPanel=token-swap/panel${extra}`);
  await tallPanel(page);
  try {
    await page.getByRole("heading", { name: /^button · \d+ tokens/ }).waitFor({ timeout: 30000 });
  } catch (err) {
    await page.screenshot({ path: path.join(OUT, "_failed-open.png") });
    console.log("headings:", await page.getByRole("heading").allInnerTexts());
    throw err;
  }
  await page.waitForTimeout(800);
};

const preview = page.frameLocator("#storybook-preview-iframe");
const buttonRow = async () => {
  const names = ["Primary", "Secondary", "Alternative", "Ghost"];
  const boxes = [];
  for (const n of names) boxes.push(await preview.getByRole("button", { name: n, exact: true }).boundingBox());
  return union(boxes, 16);
};

if (process.env.ONLY_OPEN) {
  await open();
  await page.screenshot({ path: path.join(OUT, "_debug.png") });
  await browser.close();
  process.exit(0);
}

// ── 1. Story with the panel, before any swap ──────────────────────────────────────────────
await open();
const frameBox = await page.locator("#storybook-preview-iframe").boundingBox();
await shot("overview.png", { x: frameBox.x, y: frameBox.y, width: 1280 - frameBox.x, height: 1000 - frameBox.y });
await shot("before.png", await buttonRow());

// ── 2. Header ─────────────────────────────────────────────────────────────────────────────
await shot("panel-header.png", await ancestorBox(page.getByText("Preview rebrand tokens"), "(el) => el.tagName === 'DIV' && getComputedStyle(el).borderBottomStyle === 'solid'"));

// ── 3. A token row, then the picker ────────────────────────────────────────────────────────
const trigger = page.locator('button[aria-label^="button.primary.text:"]');
const row = trigger.locator("xpath=ancestor::li[1]");
await shot("token-row.png", await box(row));
await trigger.click();
await page.getByLabel("Filter semantic tokens").fill("text");
await page.waitForTimeout(300);
await shot("picker.png", await box(row));

// ── 4. Swap, result, swapped row ───────────────────────────────────────────────────────────
await row.locator("li > button", { hasText: /^text \/ default/ }).first().click();
await page.waitForTimeout(800);
await shot("after.png", await buttonRow());
await shot("swapped-row.png", await box(page.locator('button[aria-label^="button.primary.text:"]').locator("xpath=ancestor::li[1]")));

// ── 5. Session bar ─────────────────────────────────────────────────────────────────────────
await shot("session-bar.png", await ancestorBox(page.getByText(/^1 unsaved change$/), "(el) => getComputedStyle(el).position === 'sticky'"));

// ── 6. Tokens without a live preview (another component) ───────────────────────────────────
await page.getByLabel(/Other component/).selectOption("chip");
const chipHeading = page.getByRole("heading", { name: /^chip · / });
await chipHeading.waitFor();
const chipRows = chipHeading.locator("xpath=following-sibling::ul[1]/li");
const chipBoxes = [await box(chipHeading)];
for (let i = 0; i < 3; i++) chipBoxes.push(await chipRows.nth(i).boundingBox());
await shot("no-live-preview.png", union(chipBoxes));
await page.getByLabel(/Other component/).selectOption("");

// ── 7. Save for review form (filled, not submitted) ────────────────────────────────────────
await page.getByRole("button", { name: /^Save for review/ }).click();
const saveForm = page.locator("form", { has: page.getByRole("button", { name: /^Save/, exact: false }) }).last();
const inputs = saveForm.locator("input");
await inputs.nth(0).fill("button-mapping");
if ((await inputs.count()) > 1) await inputs.nth(1).fill("Button colours for the rebrand");
await page.waitForTimeout(300);
await shot("save-form.png", await box(saveForm));

// ── 8. On a review branch: changes list, review link, PR form ──────────────────────────────
const fresh = await context.newPage();
await page.close();
const p = fresh;
await p.goto(`${SB}/?path=/story/${STORY}&addonPanel=token-swap/panel&tokenSwapRef=${encodeURIComponent(REVIEW)}`);
await tallPanel(p);
const changes = p.getByRole("region", { name: `Changes on ${REVIEW}` });
await changes.waitFor({ timeout: 60000 });
const toggle = changes.getByRole("button", { name: /changes$/ });
if ((await toggle.getAttribute("aria-expanded")) !== "true") await toggle.click();
await p.waitForTimeout(800);
await changes.evaluate((el) => el.scrollIntoView({ block: "start" }));
await p.screenshot({ path: path.join(OUT, "changes-list.png"), clip: await changes.boundingBox() });
saved.push("changes-list.png");

const footer = await p.getByRole("button", { name: "Copy review link" }).evaluateHandle((el) => {
  let n = el;
  while (n && getComputedStyle(n).position !== "sticky") n = n.parentElement;
  return n || el;
});
await p.screenshot({ path: path.join(OUT, "review-link.png"), clip: await footer.boundingBox() });
saved.push("review-link.png");

await p.getByRole("button", { name: /^Open PR/ }).click();
const prForm = p.locator("form", { has: p.getByRole("button", { name: /PR/ }) }).last();
const prInputs = prForm.locator("input");
await prInputs.nth(0).fill("Re-point secondary text and outlined border");
await p.waitForTimeout(300);
await prForm.evaluate((el) => el.scrollIntoView({ block: "center" }));
await p.screenshot({ path: path.join(OUT, "pr-form.png"), clip: await prForm.boundingBox() });
saved.push("pr-form.png");

await browser.close();
console.log("saved:", saved.join(", "));
