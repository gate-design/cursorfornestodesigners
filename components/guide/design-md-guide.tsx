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
  CopyButton,
  Section,
  Step,
} from "@/components/guide/guide-ui"

// The pack lives on a branch until its PR merges. When it does, set PACK_BRANCH to "master".
const PACK_BRANCH = "docs/design-md-pack"
const PR_URL = "https://github.com/nestoca/fe-shared/pull/1876"
const FOLDER_URL = `https://github.com/nestoca/fe-shared/tree/${PACK_BRANCH}/design-md`
const fileUrl = (file: string) => `https://github.com/nestoca/fe-shared/blob/${PACK_BRANCH}/design-md/${file}`

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border-l-2 border-primary bg-muted/30 p-4">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{children}</code>
}

function Ui({ children }: { children: ReactNode }) {
  return <strong className="text-foreground">{children}</strong>
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
      {children}
    </a>
  )
}

function PromptBlock({ label, prompt }: { label: string; prompt: string }) {
  return (
    <div className="space-y-2 rounded-lg border border-primary/25 bg-primary/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold tracking-wide text-primary [font-variant:small-caps]">
          {label}
        </p>
        <CopyButton text={prompt} className="-mt-1 shrink-0" />
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-foreground">
        {prompt}
      </pre>
    </div>
  )
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/40">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-3 py-2 font-medium text-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t align-top">
              {row.map((cell, j) => (
                <td key={j} className={j === 0 ? "px-3 py-2 text-foreground" : "px-3 py-2 text-muted-foreground"}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const FILES: { file: string; what: string }[] = [
  { file: "DESIGN.md", what: "Start here. Every token (colour, type, spacing, radius, elevation, motion) plus the core rules, do's and don'ts, and the Open questions we haven't settled." },
  { file: "layouts.md", what: "The app shell (side nav, header, drawers, footer), breakpoints, content layouts and screen recipes." },
  { file: "components.md", what: "Which component to use when, with Storybook and Figma links, and what isn't in Figma yet." },
  { file: "patterns.md", what: "How we solve recurring problems: validation and policy feedback, forms, confirmations, empty and error states, filtering, tables…" },
  { file: "content.md", what: "Voice, capitalisation, copy patterns, EN/FR formats and the mortgage glossary." },
  { file: "brand.md", what: "nesto and nesto cloud, logos, icons (Phosphor regular and fill), imagery." },
  { file: "theming.md", what: "How tenants re-skin the base, and which product uses which brand." },
  { file: "assets/logos/", what: "Clean SVG logos exported from Foundations." },
  { file: "_test-prototypes/", what: "Prototypes built only from this folder. Good examples of what it produces." },
]

const GET_FILES_PROMPT = `Get the design-md folder from nestoca/fe-shared onto this computer.

- Clone nestoca/fe-shared to ~/fe-shared if it isn't there.
- Check out ${PACK_BRANCH} (or master if that branch no longer exists) and pull.
- Tell me the full path to the design-md folder when you're done.`

const PROTOTYPE_PROMPT = `Using the files in ~/fe-shared/design-md as our design system, build <screen> for <product: MiddleOffice / Portal / Console / …> as a single HTML file.

Who uses it: <advisor, underwriter, client…>
What they need to do: <one or two sentences>
Data to show: <fields, or "make up realistic data">

Follow DESIGN.md first, then layouts.md and patterns.md. When you had to guess, tell me where.`

const CHANGE_PROMPT = `In ~/fe-shared/design-md, add a pattern for <problem> based on this Figma frame: <link with node-id>.

Follow design-md/CONTRIBUTING.md: put the rule in the right file, regenerate the tokens, lint DESIGN.md, then commit on a new branch and open a draft PR. Show me the diff before you push.`

const TEST_PROMPT = `You're a PM with no design background. Using only the files in ~/fe-shared/design-md (don't open _test-prototypes/), build <screen> as a single HTML file.

Then list every point where you had to guess, found a contradiction or couldn't find a value, plus the 3 things the docs did best.`

export function DesignMdGuide() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="font-mono text-4xl font-bold tracking-tight">DESIGN.md</h1>
        <p className="text-lg text-muted-foreground">
          All of our design knowledge in a few markdown files, so anyone in the org (or any AI tool) can build a prototype that looks and behaves like nesto. And we, the designers, keep it true.
        </p>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Table of contents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a href="#dm-what" className="block text-sm text-primary hover:underline">What it is</a>
          <a href="#dm-inside" className="block text-sm text-primary hover:underline">What&apos;s inside</a>
          <a href="#dm-get" className="block text-sm text-primary hover:underline">Get the files</a>
          <a href="#dm-use" className="block text-sm text-primary hover:underline">Use it to prototype</a>
          <a href="#dm-true" className="block text-sm text-primary hover:underline">How it stays true</a>
          <a href="#dm-change" className="block text-sm text-primary hover:underline">Change it</a>
          <a href="#dm-test" className="block text-sm text-primary hover:underline">Check it still works</a>
          <a href="#dm-open" className="block text-sm text-primary hover:underline">Where we need you</a>
        </CardContent>
      </Card>

      <div className="space-y-12">
        <Section id="dm-what" title="What it is">
          <CommentaryBubble name="Gate">
            Our design knowledge was spread across Storybook, the UI Kit, Foundations, the Icons file, the page-structure branch, the MiddleOffice files and the brand site. Every prototype meant hunting through all of it. Now it lives in one folder, <Code>design-md/</Code> in <Code>nestoca/fe-shared</Code>, written in Google&apos;s{" "}
            <Ext href="https://github.com/google-labs-code/design.md">DESIGN.md</Ext> format: tokens at the top of the file, rules in plain language underneath.
          </CommentaryBubble>
          <p className="text-sm text-muted-foreground">
            People read it, and AI tools read it too: Claude Design, Claude Code, Cursor, Figma Make. Give a tool this folder and a brief, and you get a prototype that uses our tokens, our page shell, our components and our way of solving things: validation in MiddleOffice, confirmations, empty states, French copy.
          </p>
          <Callout title="It's a draft">
            <p>
              The pack is in review in <Ext href={PR_URL}>nestoca/fe-shared#1876</Ext>. Until it merges, it lives on the <Code>{PACK_BRANCH}</Code> branch. The links on this page point there.
            </p>
          </Callout>
        </Section>

        <Separator />

        <Section id="dm-inside" title="What's inside" description="Open DESIGN.md first. The rest go deeper on one topic each">
          <Table
            head={["File", "What it covers"]}
            rows={FILES.map(({ file, what }) => [
              <Ext key={file} href={file.endsWith("/") ? `${FOLDER_URL}/${file}` : fileUrl(file)}>
                <span className="font-mono text-xs">{file}</span>
              </Ext>,
              what,
            ])}
          />
          <p className="text-sm text-muted-foreground">
            The base theme is <Ui>nesto cloud</Ui> (its blue, Montserrat). Internal tools like MiddleOffice and Console use it as they are. Customer-facing products show the tenant&apos;s brand; <Ext href={fileUrl("theming.md")}>theming.md</Ext> explains how.
          </p>
        </Section>

        <Separator />

        <Section id="dm-get" title="Get the files" description="Once per computer. Needs access to nestoca/fe-shared">
          <p className="text-sm text-muted-foreground">
            <Code>nestoca/fe-shared</Code> is private, so you need to be signed in to GitHub with your nesto account. If the{" "}
            <a href="#component-ac" className="font-medium text-primary hover:underline">Component ACs</a> or{" "}
            <a href="#token-swap" className="font-medium text-primary hover:underline">Token swap</a> setup works for you, you&apos;re set.
          </p>
          <Step number={1} title="Just reading? Use GitHub">
            <p className="text-sm text-muted-foreground">
              Open <Ext href={FOLDER_URL}>the design-md folder on GitHub</Ext>. The markdown renders nicely there, and you can download a file with the <Ui>Download raw file</Ui> button.
            </p>
          </Step>
          <Step number={2} title="Prototyping? Put it on your computer">
            <p className="text-sm text-muted-foreground">
              Open Claude Code (Claude Desktop, <Ui>Code</Ui> mode) in any folder and paste this:
            </p>
            <PromptBlock label="Get the files" prompt={GET_FILES_PROMPT} />
            <p className="text-sm text-muted-foreground">
              To pick up the latest version later, ask Claude to <em>&ldquo;pull the latest fe-shared&rdquo;</em>.
            </p>
          </Step>
        </Section>

        <Separator />

        <Section id="dm-use" title="Use it to prototype" description="Same files, whichever tool you prefer">
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 font-mono text-lg font-medium tracking-tight">Claude Code or Cursor</h3>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Point it at the folder and give it a brief. Fill in the angle brackets:
                </p>
                <PromptBlock label="Prototype brief" prompt={PROTOTYPE_PROMPT} />
                <p className="text-sm text-muted-foreground">
                  In Cursor, open <Code>~/fe-shared</Code> and mention the files in chat (<Code>@DESIGN.md</Code>, <Code>@layouts.md</Code>…) so it reads them.
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-mono text-lg font-medium tracking-tight">Claude Design</h3>
              <p className="text-sm text-muted-foreground">
                Give it the folder as design-system context: <Ui>Import → Link code folder</Ui> and pick <Code>~/fe-shared/design-md</Code>, or upload <Code>DESIGN.md</Code> plus the files your screen needs. Then describe the screen the same way as in the brief above.
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-mono text-lg font-medium tracking-tight">Figma</h3>
              <p className="text-sm text-muted-foreground">
                Attach <Code>DESIGN.md</Code> (and <Code>layouts.md</Code> for full screens) as context in Figma Make, or anywhere Figma takes written specs. You&apos;ll still use the real UI Kit components in your file. The markdown tells the AI which ones to pick and how to arrange them.
              </p>
            </div>
          </div>

          <Callout title="Tips for better results">
            <ul className="list-disc space-y-1 pl-5">
              <li>Name the product and the user. MiddleOffice and Portal follow different rules.</li>
              <li>Ask for French when the screen is customer-facing. content.md has the formats and glossary.</li>
              <li>Ask it to list where it guessed. Those guesses show us where the pack has gaps.</li>
              <li>Hover every icon-only button: each one needs a tooltip saying what it does. If it&apos;s missing, the prototype broke a rule.</li>
            </ul>
          </Callout>
        </Section>

        <Separator />

        <Section id="dm-true" title="How it stays true" description="Figma owns the values, the files own the rules, a script keeps them in sync">
          <Table
            head={["", "Owns", "You edit"]}
            rows={[
              [<Ui key="f">Figma</Ui>, "Token values (Tokens Studio) and how components look (Nest UI Kit)", "Figma, as you do today"],
              [<Ui key="m">The markdown</Ui>, "Rules: when to use what, how pages are built, recurring patterns, copy", "The .md files"],
              [<Ui key="s">A script</Ui>, "Copies every token value from Figma into the markdown", "Nothing. Never type a token value by hand"],
            ]}
          />
          <CommentaryBubble name="Gate">
            If a value is wrong, fix it in Tokens Studio. If a rule is wrong or missing, fix it in the markdown. The YAML at the top of DESIGN.md, and everything between the <Code>BEGIN GENERATED</Code> and <Code>END GENERATED</Code> markers, is written by the script. Edit them and your change gets overwritten.
          </CommentaryBubble>
          <p className="text-sm text-muted-foreground">
            Every pull request that touches the folder runs two checks: the generated parts must match the tokens, and DESIGN.md must pass Google&apos;s linter with zero errors. If something fails, the error message says what to run.
          </p>
        </Section>

        <Separator />

        <Section id="dm-change" title="Change it" description="Every change is a pull request that another designer reviews">
          <Table
            head={["You changed or decided…", "Edit"]}
            rows={[
              ["A token value", "Nothing here. Push from Tokens Studio, then run the script (or ask Claude or a developer to)"],
              ["A rule, a do/don't, a copy rule", "The .md file it belongs in"],
              ["A component's size, padding, radius or colour pairing", <Code key="c">tokens/component-specs.json</Code>],
              ["A new component", <span key="n"><Code>components.md</Code> and <Code>tokens/component-specs.json</Code></span>],
              ["A recurring problem we solved", <Code key="p">patterns.md</Code>],
              ["An Open question settled", "The file the rule belongs in, and remove it from Open questions in DESIGN.md, in the same PR"],
              ["Logos", <span key="l"><Code>assets/logos/</Code>, exported from Foundations, never redrawn</span>],
            ]}
          />

          <div className="space-y-6 pt-2">
            <Step number={1} title="Easiest: ask Claude">
              <p className="text-sm text-muted-foreground">
                Claude follows the rules in <Ext href={fileUrl("CONTRIBUTING.md")}>CONTRIBUTING.md</Ext>, so you describe the change and it handles the files, the checks and the PR.
              </p>
              <PromptBlock label="Propose a change" prompt={CHANGE_PROMPT} />
            </Step>
            <Step number={2} title="Small text fix: GitHub in the browser">
              <p className="text-sm text-muted-foreground">
                Open the file on GitHub, click the pencil, edit, then <Ui>Commit changes… → Create a new branch → Propose changes</Ui>. Fill in the description and request a review. No setup needed.
              </p>
            </Step>
            <Step number={3} title="Running the checks yourself">
              <p className="text-sm text-muted-foreground">From <Code>~/fe-shared</Code>, if you&apos;re comfortable in the terminal:</p>
              <CommandBlock command="node design-md/scripts/build-tokens.mjs" description="Rewrites the generated parts from the tokens. Add --check to only verify" />
              <CommandBlock command="npx @google/design.md@0.4.0 lint design-md/DESIGN.md" description="Must report 0 errors. Known warnings are listed in CONTRIBUTING.md" />
            </Step>
          </div>

          <Callout title="Writing rules that work for people and AI">
            <ul className="list-disc space-y-1 pl-5">
              <li>Lead with the rule, then the reason in one clause: &ldquo;Use X when Y. Don&apos;t use X for Z.&rdquo;</li>
              <li>Use the real names: token names, and component names as they appear in Figma and code.</li>
              <li>Say what to do instead: &ldquo;Don&apos;t use a toast for blocking errors; use an inline message.&rdquo;</li>
              <li>One rule, one place. If it already exists, link to it instead of repeating it.</li>
              <li>Not agreed yet? Mark it <em>(proposed)</em> or add it to Open questions.</li>
            </ul>
          </Callout>

          <CommentaryBubble name="Gate">
            A UI Kit change isn&apos;t done until its rule is here too. Add <em>&ldquo;design-md updated (link the PR)&rdquo;</em> to your Asset Contribution Companion checklist.
          </CommentaryBubble>
        </Section>

        <Separator />

        <Section id="dm-test" title="Check it still works" description="After a significant change, see if a newcomer can still build from it">
          <p className="text-sm text-muted-foreground">
            Start a fresh Claude session, give it only the folder and a realistic brief, and ask what it had to guess:
          </p>
          <PromptBlock label="Test the pack" prompt={TEST_PROMPT} />
          <p className="text-sm text-muted-foreground">
            Compare the list with the last run. New guesses mean the change made the pack less clear. Attach the list to your PR, and keep the best prototypes in <Code>_test-prototypes/</Code> as worked examples.
          </p>
        </Section>

        <Separator />

        <Section id="dm-open" title="Where we need you" description="The pack is honest about what we haven't decided">
          <p className="text-sm text-muted-foreground">
            DESIGN.md ends with <Ui>Open questions</Ui>: things the sources disagree on or never covered. Some of the big ones:
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Shells for Portal and Console. The page-structure branch still shows the same layout everywhere.</li>
            <li>When the side nav collapses to a rail, and how the content grid behaves.</li>
            <li>Thresholds for ratio states in MiddleOffice.</li>
            <li>Logo clear space and placement, and when we move from Montserrat to Inter.</li>
          </ul>
          <CommentaryBubble name="Gate">
            Pick one, bring a proposal to design review, and whoever settles it updates the files. That&apos;s how this stays ours rather than mine.
          </CommentaryBubble>
        </Section>
      </div>
    </div>
  )
}
