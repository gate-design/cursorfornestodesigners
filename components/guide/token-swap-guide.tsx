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
  CommentaryBubble,
  CopyButton,
  Section,
  Step,
} from "@/components/guide/guide-ui"
import { withBasePath } from "@/lib/base-path"

const REBRAND_BRANCH = "style/figma-rebrand"
const TOOL_BRANCH = "feat/token-swap-tool"
const TOOL_PR_URL = "https://github.com/nestoca/fe-shared/pull/1866"
const REPO_URL = "https://github.com/nestoca/fe-shared"

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

/** A captured piece of the Token swap panel. Images live in /public/token-swap. */
function Shot({ src, alt, caption }: { src: string; alt: string; caption?: ReactNode }) {
  return (
    <figure className="space-y-2">
      <div className="overflow-x-auto rounded-lg border bg-background">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBasePath(`/token-swap/${src}`)} alt={alt} className="block h-auto max-w-full" />
      </div>
      {caption && <figcaption className="text-xs text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}

const SETUP_PROMPT = `Set up the Token swap tool from nestoca/fe-shared on this computer, then start it.

- Clone nestoca/fe-shared to ~/fe-shared if it isn't there, check out the ${TOOL_BRANCH} branch, and follow apps/doc/.storybook/token-swap/SETUP.md.
- Check what's already installed first and skip anything that's done.
- For the @nestoca package registry, first try: gh auth refresh --scopes read:packages, then set the npm auth token for npm.pkg.github.com from gh auth token. If yarn still fails with 401 or 403, stop and walk me through step 3 of SETUP.md — I'll create the token and type it myself.
- Never show me, or ask me to paste, a token or password.
- Finish by starting yarn workspace doc storybook:tokens in the background, and tell me when http://localhost:6006 is ready.`

const START_PROMPT = `Update and start the Token swap tool in ~/fe-shared: switch to ${TOOL_BRANCH}, pull, run yarn, then start yarn workspace doc storybook:tokens in the background and tell me when http://localhost:6006 is ready.`

const STOP_PROMPT = `Stop the Token swap tool.`

const LOOP = [
  {
    where: "Tokens Studio",
    what: "New or changed token values (core, semantic, new component tokens)",
    lands: REBRAND_BRANCH,
  },
  {
    where: "Token swap tool",
    what: "Which semantic token each component token points at, checked live on the real components",
    lands: "a review branch, style/tokens-<name>",
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

      <figure className="mb-12 space-y-2">
        <video
          controls
          playsInline
          preload="none"
          poster={withBasePath("/token-swap/walkthrough-poster.jpg")}
          className="block w-full rounded-lg border bg-black"
          aria-label="Token swap walkthrough, 3 minutes 22 seconds, narrated with captions"
        >
          <source src={withBasePath("/token-swap/walkthrough.mp4")} type="video/mp4" />
        </video>
        <figcaption className="text-xs text-muted-foreground">
          The whole workflow in under 3½ minutes, including connecting components to their tokens. Narrated, with captions. The steps below go through each part.
        </figcaption>
      </figure>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Table of contents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            ["ts-what", "What it is"],
            ["ts-loop", "How the pieces fit"],
            ["ts-setup", "Let Claude set it up"],
            ["ts-start", "Start and stop it"],
            ["ts-map", "Map tokens to a component"],
            ["ts-connect", "Connect a component to its tokens"],
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
            A <Ui>Token swap</Ui> tab inside our Storybook. Open a component and it lists the component tokens behind it —{" "}
            <Code>button / primary / text</Code>, <Code>input-like-group / border / error</Code> — with the semantic token each one points at. Pick a different one and the real component changes in front of you. Switch brand, switch light and dark, and it shows the contrast for every text and icon token.
          </p>
          <p className="text-sm text-muted-foreground">
            A swap changes one thing only: which semantic token a component token uses. Token <em>values</em> still live in Tokens Studio. Both end up in the same file on GitHub, so the rebrand reaches front-end as one review.
          </p>
          <Shot
            src="overview.png"
            alt="Storybook showing the Button component above the Token swap panel, which lists the button's component tokens"
            caption="The Token swap tab under a Button story. Every row is one component token."
          />
          <CommentaryBubble name="Gate">
            Until now, the only way to see a token decision on a real component was to ask an engineer to build it. This lets us try ten options in ten minutes, argue about them with the actual component on screen, and only hand over the one we agree on.
          </CommentaryBubble>
        </Section>

        <Separator />

        <Section id="ts-loop" title="How the pieces fit" description="Everything is shared through branches — the same ones Tokens Studio already uses">
          <ol className="space-y-3">
            {LOOP.map((step, i) => (
              <li key={step.where} className="flex gap-3 rounded-lg border bg-muted/20 p-3">
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

        <Section id="ts-setup" title="Let Claude set it up" description="Once per computer. Claude does the installing; you approve a couple of things">
          <Step number={1} title="Open Claude Code">
            <p className="text-sm text-muted-foreground">
              In Claude Desktop, switch the mode picker to <Ui>Code</Ui> — the same as for{" "}
              <a href="#component-ac" className="font-medium text-primary hover:underline">Component ACs</a>. Any folder will do.
            </p>
          </Step>
          <Step number={2} title="Paste this">
            <PromptBlock label="setup prompt" prompt={SETUP_PROMPT} />
            <p className="text-sm text-muted-foreground">
              The tool lives on its own branch until front-end merges it (<a href={TOOL_PR_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">draft PR #1866</a>).
            </p>
          </Step>
          <Step number={3} title="Step in when it asks">
            <p className="text-sm text-muted-foreground">Claude stops and hands over for the parts only you can do:</p>
            <ul className="ml-4 list-disc space-y-2 text-sm text-muted-foreground">
              <li>
                <Ui>Approving GitHub in your browser.</Ui> A page opens with a short code. Check it matches the one Claude shows, then approve. This lets the tool save branches as you.
              </li>
              <li>
                <Ui>Your Mac password</Ui>, only if your computer has never had Homebrew. Claude gives you one line to paste into Terminal; type the password there, never in the chat.
              </li>
              <li>
                <Ui>A GitHub token</Ui>, only if the automatic route fails. Claude walks you through making it on github.com. You type it into Terminal yourself.
              </li>
            </ul>
          </Step>
          <Callout title="Prefer to do it by hand?">
            The same steps are in <Code>apps/doc/.storybook/token-swap/SETUP.md</Code> in{" "}
            <a href={`${REPO_URL}/blob/${TOOL_BRANCH}/apps/doc/.storybook/token-swap/SETUP.md`} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
              fe-shared
            </a>
            .
          </Callout>
        </Section>

        <Separator />

        <Section id="ts-start" title="Start and stop it" description="Ask Claude, in Code mode">
          <PromptBlock label="start" prompt={START_PROMPT} />
          <p className="text-sm text-muted-foreground">
            The first start takes a couple of minutes. Then open{" "}
            <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
              localhost:6006
            </a>
            , pick a component in the sidebar, and choose the <Ui>Token swap</Ui> tab in the panel under the preview.
          </p>
          <PromptBlock label="stop" prompt={STOP_PROMPT} />
        </Section>

        <Separator />

        <Section id="ts-map" title="Map tokens to a component">
          <Step number={1} title="Check where the tokens come from">
            <Shot
              src="panel-header.png"
              alt="Panel header with the Preview rebrand tokens checkbox, Brand menu, Light and Dark buttons, the Tokens from field and Reload"
            />
            <p className="text-sm text-muted-foreground">
              <Ui>Tokens from</Ui> should say <Code>{REBRAND_BRANCH}</Code>. Press <Ui>Reload</Ui> to pick up anything pushed from Tokens Studio since you started.
            </p>
          </Step>
          <Step number={2} title="Pick a brand and a mode">
            <p className="text-sm text-muted-foreground">
              <Ui>Brand</Ui> and <Ui>Light / Dark</Ui> recolour everything, so you can check one change across tenants before committing to it. Untick <Ui>Preview rebrand tokens</Ui> to compare with what ships today.
            </p>
            <Shot
              src="story-sets.png"
              alt="The Token sets for this story bar: a button chip with a remove cross, a + link a set menu, and a Browse menu"
            />
            <p className="text-sm text-muted-foreground">
              <Ui>Token sets for this story</Ui> says which sets the story shows. A story can have several — Radio Group shows <Code>checkbox-radio</Code> and <Code>label</Code>. Use <Ui>×</Ui> and <Ui>+ link a set…</Ui> to change them; that&apos;s saved and reviewed like a swap. <Ui>Browse</Ui> opens any other set.
            </p>
          </Step>
          <Step number={3} title="Open a token">
            <Shot
              src="token-row.png"
              alt="A token row: a split light and dark swatch, the token name primary / text, and the semantic token it uses, text / inverse"
              caption="Left to right: the colour in light | dark, the component token, the semantic token it points at."
            />
            <p className="text-sm text-muted-foreground">
              Click the semantic token on the right to open the picker.
            </p>
          </Step>
          <Step number={4} title="Pick another one">
            <Shot
              src="picker.png"
              alt="The token picker filtered to text, listing the text tokens with swatches and the current one highlighted"
            />
            <p className="text-sm text-muted-foreground">
              Type to filter — <Code>text</Code>, or a full name the way it&apos;s shown, <Code>text / default</Code> — or scroll. The current token is highlighted, and tokens of the same kind (text, border, surface) are listed first. The component updates as soon as you click.
            </p>
          </Step>
          <Step number={5} title="Check the result">
            <div className="grid gap-3 sm:grid-cols-2">
              <Shot src="before.png" alt="The Primary button with light text, before the swap" caption="Before: text / inverse" />
              <Shot src="after.png" alt="The Primary button with dark text, after the swap" caption="After: text / default" />
            </div>
            <Shot
              src="swapped-row.png"
              alt="The swapped row in bold, with contrast 5.6 to 2.9 to 1 marked fails, and a Revert button"
            />
            <p className="text-sm text-muted-foreground">
              Swapped rows turn bold and remember what they were. Text and icon tokens show their contrast against the surface they sit on, before → after. Red means it fails WCAG: 4.5:1 for text, 3:1 for icons. <Ui>Revert</Ui> undoes one swap.
            </p>
          </Step>
          <Step number={6} title="Keep going">
            <Shot
              src="session-bar.png"
              alt="The bar at the bottom of the panel showing 1 change, button, and the Review, Copy JSON, Clear, Save for review and Open PR buttons"
            />
            <p className="text-sm text-muted-foreground">
              Your swaps collect in the bar at the bottom. <Ui>Review</Ui> lists them all. They survive closing the browser, but only exist on your computer until you save them for review.
            </p>
          </Step>
          <Callout title="“no live preview”">
            <p>
              No part of the component is connected to that token yet, so a swap won&apos;t show — but it&apos;s still saved and still goes to review. Connect it yourself, next section.
            </p>
          </Callout>
          <Shot src="no-live-preview.png" alt="Token rows marked no live preview on the right" />
        </Section>

        <Separator />

        <Section
          id="ts-connect"
          title="Connect a component to its tokens"
          description="So a token previews live — and so a split set can be remapped"
        >
          <p className="text-sm text-muted-foreground">
            Our coded components still use the old tokens. A <Ui>connection</Ui> tells the preview which token paints which part of a component, in which state. Checkbox, Radio, Button, TextInput, Banner and Tooltip are connected already; anything else, you connect here.
          </p>
          <Step number={1} title="Switch to Connect parts">
            <Shot src="connect-switch.png" alt="The Map tokens and Connect parts switch, with Connect parts selected" />
          </Step>
          <Step number={2} title="Click a part of the component">
            <Shot
              src="connect-hover.png"
              alt="A checkbox in the preview outlined in yellow, with a label reading checkbox"
              caption="Parts are outlined as you hover. Clicking picks the part; it doesn't tick the box."
            />
          </Step>
          <Step number={3} title="See every state its code styles">
            <Shot
              src="connect-rows.png"
              alt="The picked part, checkbox, with its states: Default, Checked plus Indeterminate, Checked plus Indeterminate plus Disabled. Each lists Border and Fill, the variable the code uses today, and the connected token"
            />
            <p className="text-sm text-muted-foreground">
              Each state the component&apos;s CSS styles gets a row — <em>Default, Hover, Focus, Checked, Disabled</em>, and combinations — with what it paints (<em>Fill, Border, Text, Focus ring</em>) and the variable the code uses today. Connected rows show their token.
            </p>
          </Step>
          <Step number={4} title="Connect a row to a token">
            <Shot
              src="connect-picker.png"
              alt="The Hover Fill row's picker, filtered to background, with checkbox-radio tokens listed first and marked this story"
            />
            <p className="text-sm text-muted-foreground">
              Click <Ui>Connect…</Ui>. The story&apos;s own sets are listed first. Pick one and the preview updates straight away.
            </p>
            <Shot
              src="connect-connected.png"
              alt="The Hover Fill row now connected to checkbox-radio / background / intermediate, with Disconnect and Revert buttons"
            />
            <p className="text-sm text-muted-foreground">
              <Ui>Disconnect</Ui> removes a connection; <Ui>Revert</Ui> undoes your change. Connections save and go to review with your swaps.
            </p>
          </Step>
          <Callout title="When a set is split or renamed">
            Say <Code>checkbox-radio</Code> becomes <Code>checkbox</Code> and <Code>radio</Code> in Tokens Studio. Connections to tokens that no longer exist are flagged — <em>token removed, choose another</em>. Re-link the story to its new set, pick the part, and connect it to the new tokens.
          </Callout>
          <Callout title="What a connection can't fix">
            A connection recolours what the component&apos;s CSS already paints. If something is drawn another way — the checkbox tick is a fixed white image — it needs front-end, and the token&apos;s row keeps saying <em>no live preview</em>.
          </Callout>
        </Section>

        <Separator />

        <Section id="ts-share" title="Share it for review">
          <Step number={1} title="Save for review">
            <Shot
              src="save-form.png"
              alt="The Save for review form: a review branch name, style/tokens-button-mapping, a description, and the Save and push button"
            />
            <p className="text-sm text-muted-foreground">
              Click <Ui>Save for review…</Ui>, name the branch after what you changed — <Code>button-mapping</Code>, <Code>dark-mode-borders</Code> — add a one-line description, then <Ui>Save and push</Ui>. It saves to <Code>style/tokens-&lt;name&gt;</Code> on GitHub. No pull request, nothing for front-end yet. Saving takes a minute or two.
            </p>
            <p className="text-sm text-muted-foreground">
              The panel then switches to that branch, so anything else you change adds to the same review. One topic per branch keeps reviews short.
            </p>
          </Step>
          <Step number={2} title="Send it">
            <Shot
              src="review-link.png"
              alt="The bottom bar on a review branch, with Copy review link and Open PR enabled"
              caption="On a review branch, Copy review link and Open PR… switch on."
            />
            <p className="text-sm text-muted-foreground">
              Click <Ui>Copy review link</Ui> and paste it to your colleague in Slack, with a line on what you&apos;re trying to solve.
            </p>
          </Step>
        </Section>

        <Separator />

        <Section id="ts-review" title="Review a colleague's work">
          <Step number={1} title="Open it">
            <p className="text-sm text-muted-foreground">
              Start the tool, then open the link you were sent. Or type the branch name into <Ui>Tokens from</Ui> and press <Ui>Reload</Ui>.
            </p>
          </Step>
          <Step number={2} title="See what changed">
            <Shot
              src="changes-list.png"
              alt="The Changes on style/tokens-button-mapping list showing each component token that was re-pointed, from and to"
            />
            <p className="text-sm text-muted-foreground">
              <Ui>Changes on style/tokens-&lt;name&gt;</Ui> lists every component token they re-pointed and every connection they changed, across all components. Open each component and look at it in the brands and modes that matter.
            </p>
          </Step>
          <Step number={3} title="Reply">
            <p className="text-sm text-muted-foreground">
              Answer in the Slack thread. To try an alternative, make your swaps on top of theirs and save them to the same review branch.
            </p>
          </Step>
        </Section>

        <Separator />

        <Section id="ts-merge" title="When you agree">
          <Step number={1} title="Open a pull request into the rebrand branch">
            <Shot
              src="pr-form.png"
              alt="The Open PR form: a title, Into branch set to style/figma-rebrand, and the Open draft PR button"
            />
            <p className="text-sm text-muted-foreground">
              On the review branch, click <Ui>Open PR…</Ui>, give it a title and press <Ui>Open draft PR</Ui>. It goes into <Code>{REBRAND_BRANCH}</Code> — never <Code>master</Code> — and opens as a draft.
            </p>
          </Step>
          <Step number={2} title="Merge it">
            <p className="text-sm text-muted-foreground">
              On GitHub, mark it ready and merge it. This updates the rebrand branch only — nothing ships.
            </p>
          </Step>
          <Step number={3} title="Everyone pulls in Tokens Studio">
            <p className="text-sm text-muted-foreground">
              In Tokens Studio, click the branch name bottom left, choose <Code>{REBRAND_BRANCH}</Code>, then the <Ui>down arrow</Ui> to pull. The new mapping is now in everyone&apos;s plugin.
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
              <Ui>“The token-swap server isn&apos;t running”</Ui> — ask Claude to stop the tool and start it again.
            </p>
            <p>
              <Ui>“…changed on the branch since you loaded it”</Ui> when saving — someone else changed that token. Press <Ui>Reload</Ui>, look at their change, and redo yours on top.
            </p>
            <p>
              <Ui>“Couldn&apos;t reach GitHub”</Ui> — paste the message to Claude; your GitHub sign-in has usually expired.
            </p>
            <p>
              <Ui>Anything else</Ui> — paste the message to Claude in Code mode. If it can&apos;t fix it, ask in Slack.
            </p>
          </div>
        </Section>
      </div>
    </div>
  )
}
