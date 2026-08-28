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
import { withBasePath } from "@/lib/base-path"

const CONFLUENCE_URL = "https://nestoca.atlassian.net/wiki/x/d4G9OgE"

function PromptBlock({ label, prompt }: { label: string; prompt: string }) {
  return (
    <div className="space-y-2 rounded-none border border-primary/25 bg-primary/5 p-4">
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

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-none border-l-2 border-primary bg-muted/30 p-4">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

const STARTER_PROMPT = `/component-ac

Component: <name> — new, or an update to one that already ships
Figma: <link with node-id>
Accessibility spec: <link, or none>
Decisions already made:
- <one line each, or none>`

const EXAMPLE_SIMPLE = `/component-ac

Component: Chip — existing, this is an update
Figma: https://www.figma.com/design/CHACynbUiJMgOrwgNWdsoz/branch/0TIb0xpdr3g3AqM1DDFK2n/Nest-UI-Kit?node-id=420-1191
Accessibility spec: none
Decisions already made: none`

const EXAMPLE_RICH = `/component-ac

Component: Table — existing, this is an update
Figma: https://www.figma.com/design/CHACynbUiJMgOrwgNWdsoz/branch/TilWBI6tRUxOycqa2lIcpW/Nest-UI-Kit?node-id=73671-42091
Accessibility spec: https://nestoca.atlassian.net/wiki/spaces/PD/pages/5276565729/A11Y+MO+BB+Table+v2
Decisions already made:
- Whole-row click is decided per table, not per row
- A row either navigates or expands, never both
- Density is being removed; one row height
- Copy says "results", never "entries"`

const EXAMPLE_NEW = `/component-ac

Component: Segmented control — new
Figma: https://www.figma.com/design/.../Nest-UI-Kit?node-id=1234-5678
Accessibility spec: none
Decisions already made:
- Replaces the tab-styled radio group on the Documents screen
- Max four segments; longer lists stay a Select`

export function ComponentAcGuide() {
  const skillHref = withBasePath("/skills/component-ac.zip")

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="font-mono text-4xl font-bold tracking-tight">Component ACs</h1>
        <p className="text-lg text-muted-foreground">
          A skill that turns a Figma component into acceptance criteria an engineer can actually groom — no implementation details, no measurements, no invented rules.
        </p>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Table of contents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a href="#ac-why" className="block text-sm text-primary hover:underline">
            What it does
          </a>
          <a href="#ac-install" className="block text-sm text-primary hover:underline">
            Get the skill
          </a>
          <a href="#ac-access" className="block text-sm text-primary hover:underline">
            Give it access to fe-shared
          </a>
          <a href="#ac-gather" className="block text-sm text-primary hover:underline">
            Gather four things
          </a>
          <a href="#ac-use" className="block text-sm text-primary hover:underline">
            Use it
          </a>
          <a href="#ac-back" className="block text-sm text-primary hover:underline">
            What comes back
          </a>
        </CardContent>
      </Card>

      <div className="space-y-12">
        <Section id="ac-why" title="What it does">
          <p className="text-sm text-muted-foreground">
            You point it at a Figma component. It reads the design, reads the current implementation in{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">nestoca/fe-shared</code>, and writes a markdown document you paste straight into a Jira description.
          </p>
          <p className="text-sm text-muted-foreground">
            The rules it follows came from front-end feedback on a real hand-off: state the expected outcome, leave the <em>how</em> to engineering, and hand back the decisions that aren&apos;t design&apos;s to make. The full reasoning lives on{" "}
            <a href={CONFLUENCE_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
              the Confluence page
            </a>{" "}
            — you don&apos;t need to read it to use the skill.
          </p>

          <Callout title="Two things it deliberately won't do">
            <ul className="ml-4 list-disc space-y-1">
              <li>
                <strong className="text-foreground">No measurements.</strong> No px, no rem, no hex. Figma is the source for values — the developer reads specs there, so a number in the ticket is a second source of truth that goes stale.
              </li>
              <li>
                <strong className="text-foreground">No invented rules.</strong> If a behaviour is ambiguous and you haven&apos;t told it the answer, it goes in <em>Open decisions</em> rather than being written as though it were settled.
              </li>
            </ul>
          </Callout>

          <CommentaryBubble name="Gate">
            The first version of this doc told engineers which files to change and what to name the props. That&apos;s the part they pushed back on hardest — not because it was wrong, but because they then had to work out which of my guesses to keep before they could start. The skill exists to stop me doing that again.
          </CommentaryBubble>
        </Section>

        <Separator />

        <Section
          id="ac-install"
          title="Get the skill"
          description="Nothing to install if you use Claude Desktop"
        >
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 font-mono text-lg font-medium tracking-tight">In Claude Desktop — already there</h3>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  It&apos;s published to everyone at nesto, so you don&apos;t download or upload anything. Start a chat and type{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">/component-ac</code>. If it doesn&apos;t come up, check Settings → Capabilities → Skills and make sure it&apos;s switched on — then ask Gate if it still isn&apos;t showing.
                </p>
                <p className="text-sm text-muted-foreground">
                  You do need the <strong className="text-foreground">Figma connector</strong> for it to read your design file. Settings → Connectors, if it isn&apos;t there already.
                </p>
                <Callout title="Still check your GitHub access">
                  <p>
                    Being able to run the skill isn&apos;t the same as it being able to read the code. For an update it needs{" "}
                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">nestoca/fe-shared</code>, which is private and connector-gated — that&apos;s the next section, and it&apos;s a one-time setup.
                  </p>
                </Callout>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-3 font-mono text-lg font-medium tracking-tight">In Claude Code — download it</h3>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  The terminal reads skills from your own machine, so this one you install yourself.
                </p>
                <DownloadCard
                  fileName="component-ac.zip"
                  description="The skill — one SKILL.md plus a short readme. 7 KB."
                  href={skillHref}
                />
                <Step number={1} title="Unzip it into your skills folder">
                  <CommandBlock
                    command="unzip ~/Downloads/component-ac.zip -d ~/.claude/skills/"
                    description="Creates ~/.claude/skills/component-ac/"
                  />
                </Step>
                <Step number={2} title="Restart Claude Code, then type the slash command">
                  <CommandBlock command="/component-ac" description="If it doesn't appear, close the session and start a new one" />
                </Step>
              </div>
            </div>
          </div>

          <CommentaryBubble name="Gate">
            Desktop users get updates automatically — I republish the skill and everyone has it. If you&apos;re on Claude Code, I&apos;ll post in Slack when there&apos;s a new version and you re-download from here. If this page ever contradicts your local copy, this page is newer.
          </CommentaryBubble>
        </Section>

        <Separator />

        <Section
          id="ac-access"
          title="Give it access to fe-shared"
          description="Everyone needs this, Desktop and terminal alike — but only for an existing component"
        >
          <p className="text-sm text-muted-foreground">
            To write an <strong className="text-foreground">update</strong>, the skill compares your design against what actually shipped, which means reading{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">nestoca/fe-shared</code>. That repo is private, so it needs your GitHub access. Set this up once.
          </p>

          <div className="space-y-6 pt-2">
            <div>
              <h3 className="mb-3 font-mono text-lg font-medium tracking-tight">Claude Code — the terminal</h3>
              <div className="space-y-4">
                <Step number={1} title="Install the GitHub CLI">
                  <CommandBlock command="brew install gh" description="Skip if `gh --version` already works" />
                </Step>
                <Step number={2} title="Log in">
                  <CommandBlock
                    command="gh auth login"
                    description="Choose GitHub.com → HTTPS → yes to git credentials → login with a web browser"
                  />
                  <p className="text-sm text-muted-foreground">
                    Accept the default scopes. You need{" "}
                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">repo</code> for private repos and{" "}
                    <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">read:org</code> for nesto&apos;s org membership — the browser flow grants both.
                  </p>
                </Step>
                <Step number={3} title="Check it can actually see the repo">
                  <CommandBlock
                    command="gh api repos/nestoca/fe-shared --jq .full_name"
                    description="Should print: nestoca/fe-shared"
                  />
                </Step>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-3 font-mono text-lg font-medium tracking-tight">Claude Desktop</h3>
              <div className="space-y-4">
                <Step number={1} title="Add the GitHub connector">
                  <p className="text-sm text-muted-foreground">
                    Settings → Connectors → GitHub → connect, and authorise it in the browser window that opens.
                  </p>
                </Step>
                <Step number={2} title="Grant it the nestoca organisation">
                  <p className="text-sm text-muted-foreground">
                    This is the step that gets missed. On the GitHub authorisation screen there&apos;s a list of organisations — <strong className="text-foreground">nestoca</strong> needs to be granted, not just your personal account. If it shows <em>Request</em> instead of <em>Grant</em>, a GitHub org owner has to approve it before you can continue.
                  </p>
                </Step>
                <Step number={3} title="Check it worked">
                  <p className="text-sm text-muted-foreground">
                    Ask Claude:{" "}
                    <em>&ldquo;read packages/ui/src/components/chip/chip.tsx from nestoca/fe-shared&rdquo;</em>. If it comes back with the file, you&apos;re set.
                  </p>
                </Step>
              </div>
            </div>
          </div>

          <Callout title="If it says it can't reach the repo">
            <p>
              An error mentioning <strong className="text-foreground">404</strong> means no access, not a typo. GitHub hides private repos from anyone who isn&apos;t allowed to see them, so &ldquo;not found&rdquo; and &ldquo;not permitted&rdquo; look identical from outside. A <strong className="text-foreground">403</strong> usually means the connector is there but wasn&apos;t granted the nestoca org.
            </p>
            <p className="mt-2">
              Either way, first check you can open{" "}
              <a href="https://github.com/nestoca/fe-shared" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                github.com/nestoca/fe-shared
              </a>{" "}
              in a browser. If you can&apos;t, it&apos;s an org access request, not a setup problem — ask in Slack.
            </p>
          </Callout>

          <Callout title="You can carry on without it">
            <p>
              The skill tells you up front if it can&apos;t reach the repo, then offers two ways forward: paste the component&apos;s source yourself, or work from the design alone. If you go design-only it drops the sections that depend on reading code, and records in the document that the implementation wasn&apos;t checked — so nobody mistakes silence for verification.
            </p>
          </Callout>
        </Section>

        <Separator />

        <Section
          id="ac-gather"
          title="Gather four things"
          description="It will ask for anything you leave out, but having them ready makes it one round trip"
        >
          <div className="space-y-4 text-sm text-muted-foreground">
            <ol className="ml-4 list-decimal space-y-3">
              <li>
                <strong className="text-foreground">The Figma link.</strong> It has to point at the specific component or frame, not the file. Select the frame, right-click → <em>Copy link to selection</em>. If the link has no{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">node-id=</code> in it, it&apos;s the wrong link.
              </li>
              <li>
                <strong className="text-foreground">The component name, and whether it&apos;s new or an update.</strong> That&apos;s all — you don&apos;t need to know where it lives in the codebase. If you&apos;re not sure whether it already ships, say so and it will check.
              </li>
              <li>
                <strong className="text-foreground">The accessibility spec</strong>, if the component has one. A link, or <em>none</em>.
              </li>
              <li>
                <strong className="text-foreground">Anything already decided.</strong> Rulings from a review, a Slack thread, a call with engineering.
              </li>
            </ol>
          </div>

          <Callout title="Point 4 is the one people skip">
            <p>
              A decision like &ldquo;row click is decided per table, not per row&rdquo; cannot be worked out from a Figma file. Leave it out and you get a document that looks right and isn&apos;t, with nothing flagging that it was a guess. Two lines here saves a full re-review later.
            </p>
          </Callout>
        </Section>

        <Separator />

        <Section id="ac-use" title="Use it">
          <p className="text-sm text-muted-foreground">
            Type the slash command and fill in the four lines. You can also just send{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">/component-ac</code> on its own and answer the questions it asks.
          </p>

          <PromptBlock label="The shape" prompt={STARTER_PROMPT} />

          <div className="space-y-4 pt-2">
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">
                A component that already exists, nothing special about it
              </p>
              <PromptBlock label="Most common case" prompt={EXAMPLE_SIMPLE} />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-foreground">
                A component with an accessibility spec and prior rulings
              </p>
              <PromptBlock label="Note how short each decision is — one line is enough" prompt={EXAMPLE_RICH} />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-foreground">
                A brand new component
              </p>
              <PromptBlock label="Say what it's for — it can see the design but not the problem it solves" prompt={EXAMPLE_NEW} />
            </div>
          </div>
        </Section>

        <Separator />

        <Section id="ac-back" title="What comes back">
          <p className="text-sm text-muted-foreground">
            A markdown document you can paste straight into a Jira description. It describes <strong className="text-foreground">behaviour</strong> — no sizes, no spacing, no colours, because the developer reads those from Figma.
          </p>

          <Callout title="You don't need to reread it line by line. Check one thing.">
            <p>
              The <strong className="text-foreground">Open decisions</strong> table near the bottom. Every row is a question the skill deliberately didn&apos;t answer for you — because it belongs to engineering, to accessibility, or to you. Each row gives you at most two options and says which one it would pick. Answer them, route them, or accept the recommendation, and the document is ready.
            </p>
          </Callout>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Two rows worth reading carefully when they appear:</p>
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <strong className="text-foreground">&ldquo;This value has no token.&rdquo;</strong> Something in the design is unbound, so there&apos;s no name for the developer to reference. That&apos;s a real finding — chase the design system.
              </li>
              <li>
                <strong className="text-foreground">Migration impact.</strong> On an update, a changed default silently alters every instance that never set the prop. Chip is the example: its default size moves up one step, so every chip that never set a size gets taller. Nothing in either design says &ldquo;breaking change&rdquo;.
              </li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground">
            If something looks wrong, say so in plain language and it will redo it — &ldquo;this is too long&rdquo;, &ldquo;this is telling engineers how to build it&rdquo;, &ldquo;you invented that rule, we never decided it&rdquo;. You don&apos;t have to fix the document yourself.
          </p>
        </Section>
      </div>

      <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
        <p>Questions? Ask Gate on Slack.</p>
      </div>
    </div>
  )
}
