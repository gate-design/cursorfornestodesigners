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
  MissingInfoBadge,
  Section,
  Step,
} from "@/components/guide/guide-ui"

const REBRAND_BRANCH = "style/figma-rebrand"
const TOOL_BRANCH = "design/token-swap-tool"
const REPO_URL = "https://github.com/nestoca/fe-shared"

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-none border-l-2 border-primary bg-muted/30 p-4">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

function Code({ children }: { children: ReactNode }) {
  return <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{children}</code>
}

const LOOP = [
  {
    where: "Tokens Studio",
    what: "New or changed token values (core, semantic, new component tokens)",
    lands: REBRAND_BRANCH,
  },
  {
    where: "Token swap tool",
    what: "Which semantic token each component token points at, checked live on the real components",
    lands: "a review branch, design/<topic>",
  },
  {
    where: "A colleague",
    what: "Opens your review branch in their own tool and checks it, in any brand, light or dark",
    lands: "feedback in Slack",
  },
  {
    where: "GitHub",
    what: "Once you agree, the review branch is merged into the rebrand branch",
    lands: REBRAND_BRANCH,
  },
  {
    where: "Front-end",
    what: "When the whole rebrand is ready, one pull request into master",
    lands: "master",
  },
]

export function TokenSwapGuide() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="font-mono text-4xl font-bold tracking-tight">Token swap</h1>
        <p className="text-lg text-muted-foreground">
          Map the rebrand&apos;s tokens onto our real Storybook components, see the result live, and get a colleague to review it — all before anything goes to front-end.
        </p>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Table of contents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            ["ts-what", "What it is"],
            ["ts-loop", "How the pieces fit"],
            ["ts-setup", "Set it up once"],
            ["ts-start", "Start it"],
            ["ts-map", "Map tokens to a component"],
            ["ts-share", "Share it for review"],
            ["ts-review", "Review a colleague's work"],
            ["ts-merge", "When you agree"],
            ["ts-rules", "Rules and fixes"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="block text-sm text-primary hover:underline">
              {label}
            </a>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-12">
        <Section id="ts-what" title="What it is">
          <p className="text-sm text-muted-foreground">
            A <strong className="text-foreground">Token swap</strong> tab inside our Storybook. Open any component, and it lists the component tokens behind it —{" "}
            <Code>button / primary / text</Code>, <Code>input-like-group / border / error</Code> — with the semantic token each one points at. Pick a different one and the real component changes in front of you. Switch brand, switch light and dark, and it shows the contrast for every text and icon token.
          </p>
          <p className="text-sm text-muted-foreground">
            A swap changes one thing only: which semantic token a component token uses. Token <em>values</em> still live in Tokens Studio. Both end up in the same file on GitHub, so the rebrand reaches front-end as one review.
          </p>
          <CommentaryBubble name="Gate">
            Until now, the only way to see a token decision on a real component was to ask an engineer to build it. This lets us try ten options in ten minutes, argue about them with the actual component on screen, and only hand over the one we agree on.
          </CommentaryBubble>
        </Section>

        <Separator />

        <Section id="ts-loop" title="How the pieces fit" description="Everything is shared through branches — the same ones Tokens Studio already uses">
          <ol className="space-y-3">
            {LOOP.map((step, i) => (
              <li key={step.where} className="flex gap-3 rounded-none border bg-muted/20 p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-primary font-mono text-xs font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <div className="min-w-0 text-sm">
                  <p className="font-medium text-foreground">{step.where}</p>
                  <p className="text-muted-foreground">{step.what}</p>
                  <p className="mt-1 font-mono text-xs text-primary">→ {step.lands}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-sm text-muted-foreground">
            Steps 1 to 4 repeat as new token needs come up. Nothing reaches <Code>master</Code> — what ships — until step 5, and that one is front-end&apos;s call.
          </p>
        </Section>

        <Separator />

        <Section id="ts-setup" title="Set it up once" description="About 15 minutes, in the terminal. You'll only do this on a new computer">
          <Callout title="Before you start">
            You need the GitHub CLI logged in with your nesto account. If you set up{" "}
            <a href="#component-ac" className="font-medium text-primary hover:underline">Component ACs</a>, you already have it — check with <Code>gh auth status</Code>.
          </Callout>

          <Step number={1} title="Install Node 22">
            <CommandBlock command="brew install node@22 && brew link --overwrite --force node@22" />
            <CommandBlock command="node --version" description="Should print v22 followed by anything" />
          </Step>

          <Step number={2} title="Turn on yarn">
            <CommandBlock
              command="corepack enable"
              description="Node ships with this. It gives you the exact yarn version the repo asks for"
            />
          </Step>

          <Step number={3} title="Let your computer install nesto's private packages">
            <p className="text-sm text-muted-foreground">
              Some of the code comes from nesto&apos;s private package registry on GitHub. This gives your existing GitHub login permission to read it — no new password or token to create.
            </p>
            <CommandBlock command="gh auth refresh --scopes read:packages" description="A browser window opens. Approve it" />
            <CommandBlock command="npm config set @nestoca:registry https://npm.pkg.github.com/" />
            <CommandBlock command={`npm config set //npm.pkg.github.com/:_authToken "$(gh auth token)"`} />
            <p className="text-xs text-muted-foreground">
              If step 5 later fails with <strong className="text-foreground">401</strong> or <strong className="text-foreground">403</strong>, use the personal-access-token method in the{" "}
              <a href={`${REPO_URL}#using-packages--authenticating-to-github-packages`} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                fe-shared README
              </a>{" "}
              instead, then run step 5 again.
            </p>
          </Step>

          <Step number={4} title="Get the code">
            <CommandBlock command="gh repo clone nestoca/fe-shared ~/fe-shared" description="Already have a copy? Skip this and use yours" />
            <CommandBlock command={`cd ~/fe-shared && git switch ${TOOL_BRANCH}`} />
            <p className="text-sm text-muted-foreground">
              The tool lives on its own branch for now. <MissingInfoBadge>not on GitHub yet</MissingInfoBadge>
            </p>
          </Step>

          <Step number={5} title="Install">
            <CommandBlock command="yarn" description="Takes a few minutes the first time" />
          </Step>

          <Step number={6} title="Build the styles Storybook needs">
            <CommandBlock command="yarn transform:style-dictionary && yarn build:style-dictionary" />
          </Step>
        </Section>

        <Separator />

        <Section id="ts-start" title="Start it" description="Every time you want to use it">
          <Step number={1} title="Get the latest version of the tool">
            <CommandBlock command={`cd ~/fe-shared && git switch ${TOOL_BRANCH} && git pull`} />
          </Step>
          <Step number={2} title="Start Storybook with the tool">
            <CommandBlock
              command="yarn workspace doc storybook:tokens"
              description="Leave this terminal window open. The first start takes a couple of minutes"
            />
          </Step>
          <Step number={3} title="Open it">
            <p className="text-sm text-muted-foreground">
              Go to{" "}
              <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                localhost:6006
              </a>
              , open a component, and choose the <strong className="text-foreground">Token swap</strong> tab in the panel under the preview.
            </p>
          </Step>
          <p className="text-sm text-muted-foreground">
            To stop it, click the terminal and press <Code>Ctrl + C</Code>.
          </p>
        </Section>

        <Separator />

        <Section id="ts-map" title="Map tokens to a component">
          <Step number={1} title="Check where the tokens come from">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Tokens from</strong>, top right of the panel, should say <Code>{REBRAND_BRANCH}</Code>. Press <strong className="text-foreground">Reload</strong> to pick up anything pushed from Tokens Studio since you started.
            </p>
          </Step>
          <Step number={2} title="Pick a brand and a mode">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Brand</strong> and <strong className="text-foreground">Light / Dark</strong> recolour everything, so you can check one change across tenants before committing to it. Untick <strong className="text-foreground">Preview rebrand tokens</strong> to compare with what ships today.
            </p>
          </Step>
          <Step number={3} title="Swap a token">
            <p className="text-sm text-muted-foreground">
              Click the token name next to any row, then pick another one. Type to filter, the way it&apos;s shown — <Code>text / default</Code>. The component updates straight away.
            </p>
            <p className="text-sm text-muted-foreground">
              Text and icon tokens show their contrast against the surface they sit on, before → after. Red means it fails WCAG: 4.5:1 for text, 3:1 for icons.
            </p>
          </Step>
          <Step number={4} title="Keep going">
            <p className="text-sm text-muted-foreground">
              Your changes collect at the bottom of the panel. <strong className="text-foreground">Review</strong> lists them, each with a <strong className="text-foreground">Revert</strong>. They survive closing the browser, but they only exist on your computer until you share them.
            </p>
          </Step>
          <Callout title="“no live preview”">
            That component doesn&apos;t read its tokens yet, so the swap won&apos;t show — but it&apos;s still saved and still goes to review. Today Button, TextInput, Banner and Tooltip preview live; more get added as they&apos;re wired up.
          </Callout>
        </Section>

        <Separator />

        <Section id="ts-share" title="Share it for review">
          <p className="text-sm text-muted-foreground">
            <MissingInfoBadge>being built</MissingInfoBadge> This section describes the next version of the tool.
          </p>
          <Step number={1} title="Save for review">
            <p className="text-sm text-muted-foreground">
              Click <strong className="text-foreground">Save for review</strong> and give it a short name for what you changed —{" "}
              <Code>button-mapping</Code>, <Code>dark-mode-borders</Code>. It saves to a branch called <Code>design/&lt;name&gt;</Code> on GitHub. No pull request, nothing for front-end yet.
            </p>
            <p className="text-sm text-muted-foreground">
              The panel then switches to that branch, so anything else you change adds to the same review. One topic per branch keeps reviews short.
            </p>
          </Step>
          <Step number={2} title="Send it">
            <p className="text-sm text-muted-foreground">
              Click <strong className="text-foreground">Copy review link</strong> and paste it to your colleague in Slack, with a line on what you&apos;re trying to solve.
            </p>
          </Step>
        </Section>

        <Separator />

        <Section id="ts-review" title="Review a colleague's work">
          <Step number={1} title="Open it">
            <p className="text-sm text-muted-foreground">
              Start the tool, then open the link you were sent. Or type the branch name into <strong className="text-foreground">Tokens from</strong> and press <strong className="text-foreground">Reload</strong>.
            </p>
          </Step>
          <Step number={2} title="See what changed">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Changes on this branch</strong> lists every component token they re-pointed, across all components. Open each component and look at it in the brands and modes that matter.
            </p>
            <p className="text-sm text-muted-foreground">
              For the exact file change, GitHub shows it too:{" "}
              <Code>{`${REPO_URL}/compare/${REBRAND_BRANCH}...design/<name>`}</Code>
            </p>
          </Step>
          <Step number={3} title="Reply">
            <p className="text-sm text-muted-foreground">
              Answer in the Slack thread. If you want to try an alternative, make your swaps on top of theirs and save them to the same review branch.
            </p>
          </Step>
        </Section>

        <Separator />

        <Section id="ts-merge" title="When you agree">
          <Step number={1} title="Open a pull request into the rebrand branch">
            <p className="text-sm text-muted-foreground">
              From the review branch, use <strong className="text-foreground">Open PR…</strong>. It goes into <Code>{REBRAND_BRANCH}</Code>, never <Code>master</Code>, and opens as a draft.
            </p>
          </Step>
          <Step number={2} title="Merge it">
            <p className="text-sm text-muted-foreground">
              Mark it ready on GitHub and merge it. This updates the rebrand branch only — nothing ships.
            </p>
          </Step>
          <Step number={3} title="Everyone pulls in Tokens Studio">
            <p className="text-sm text-muted-foreground">
              In Tokens Studio, click the branch name bottom left, choose <Code>{REBRAND_BRANCH}</Code>, then the <strong className="text-foreground">down arrow</strong> to pull. The new mapping is now in everyone&apos;s plugin.
            </p>
          </Step>
          <p className="text-sm text-muted-foreground">
            When the whole rebrand is settled, one pull request takes <Code>{REBRAND_BRANCH}</Code> into <Code>master</Code>. That&apos;s where front-end reviews it.
          </p>
        </Section>

        <Separator />

        <Section id="ts-rules" title="Rules and fixes">
          <Callout title="Pull in Tokens Studio before you edit">
            A push from Tokens Studio replaces the whole token file. If your plugin is out of date, your push quietly undoes mapping work merged since your last pull. Pull first, every time.
          </Callout>
          <Callout title="Values in Tokens Studio, mapping in the tool">
            Change what a colour <em>is</em> in Tokens Studio. Change which token a component <em>uses</em> in the tool. Doing both on the same token in the same afternoon is how work gets overwritten.
          </Callout>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">“The token-swap server isn&apos;t running”</strong> — Storybook was started with <Code>yarn storybook</Code> instead of <Code>yarn workspace doc storybook:tokens</Code>. Stop it and start it again with the second one.
            </p>
            <p>
              <strong className="text-foreground">“N not on GitHub yet”</strong> next to the branch — your copy has changes nobody else can see. They&apos;ll go up when you save for review.
            </p>
            <p>
              <strong className="text-foreground">“…is X on GitHub, not Y”</strong> when saving — someone changed that token since you loaded it. Press <strong className="text-foreground">Reload</strong>, check their change, and redo yours on top.
            </p>
            <p>
              <strong className="text-foreground">A component looks broken in Storybook</strong> — run step 6 of the setup again; the styles are out of date.
            </p>
            <p>
              <strong className="text-foreground">404 or “not found” from GitHub</strong> — an access problem, not a typo. See the access checks on the{" "}
              <a href="#component-ac" className="font-medium text-primary hover:underline">Component ACs</a> tab, then ask in Slack.
            </p>
          </div>
        </Section>
      </div>
    </div>
  )
}
