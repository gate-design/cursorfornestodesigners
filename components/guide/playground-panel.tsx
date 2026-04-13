"use client"

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
import { MockProfileCard, TemplateCard } from "@/components/playground/TemplateCard"
import {
  PLAYGROUND_REPO_CLONE_URL,
  PLAYGROUND_REPO_WEB,
} from "@/lib/playground-repo"

export function PlaygroundPanel() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl font-bold">Playground</h1>
        <p className="text-lg text-muted-foreground">
          You&apos;ll practice Git on <strong className="font-medium text-foreground">this</strong> site — clone the repo, branch, and ship your own profile card alongside the guides.
        </p>
      </div>

      <Card className="mb-12 border-dashed border-border bg-muted/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Quick decode (ELI5)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div className="space-y-1">
            <p className="font-medium text-foreground">Hot reload</p>
            <p>
              When you save a file, the little local server updates the site in your browser for you — you usually see your change almost right away without closing the tab or restarting everything by hand.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">Dev server</p>
            <p>
              The command (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">npm run dev</code>) that runs the app on your machine so you can preview it at a <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">localhost</code> link while you work.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">Export your card</p>
            <p>
              In a code file, &quot;export&quot; just means &quot;I&apos;m making this component available for other files to use.&quot; Your new card file will <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">export</code> a React component so the app can import it by name.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">Wire it into the Playground tab</p>
            <p>
              Informal dev speak for &quot;connect the dots&quot;: you add an <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">import</code> and drop your component into the Playground screen&apos;s code so this tab actually renders your card (optional until you want it on the shared page).
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">Stage your changes</p>
            <p>
              In Git, staging means &quot;I&apos;m choosing which edited files go into the next snapshot.&quot; In Cursor&apos;s Source Control panel, you tick or <strong className="font-medium text-foreground">+</strong> the files you want before you commit — like putting only the pieces you mean to ship into one box.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-12 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base">Repository</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Everything you see here lives in the open playground repo — same code you run locally after you clone:
          </p>
          <p>
            <a
              href={PLAYGROUND_REPO_WEB}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              {PLAYGROUND_REPO_WEB.replace("https://", "")}
            </a>
          </p>
          <CommandBlock command={`git clone ${PLAYGROUND_REPO_CLONE_URL}`} />
        </CardContent>
      </Card>

      <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Your card (preview)</h2>
          <p className="text-sm text-muted-foreground">
            Below is a <strong className="text-foreground">mock</strong> profile card — an example of what you&apos;ll build from the template. When you work in the repo, duplicate{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">TemplateCard.tsx</code>, save it as <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">YourNameCard.tsx</code>, and replace this content with yours.
          </p>
          <div className="rounded-xl border border-dashed border-primary/30 bg-muted/20 p-6">
            <MockProfileCard />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Template (starter)</h2>
          <p className="text-sm text-muted-foreground">
            This is the default <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">TemplateCard</code> component — what you start from before you customize copy, initials, and badges.
          </p>
          <div className="rounded-xl border border-border bg-card p-6">
            <TemplateCard />
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      <Section
        title="How you&apos;ll use this tab"
        description="Keep the guides open in other tabs; treat this one as your live preview while you work in Cursor."
      >
        <div className="space-y-6">
          <Step number={1} title="Clone and run locally">
            <p className="text-sm text-muted-foreground">
              Follow the <strong className="text-foreground">Git</strong> tab through account setup, then clone the repo and start the <strong className="text-foreground">dev server</strong> (see Quick decode above). That gives you <strong className="text-foreground">hot reload</strong> — when you save a file, the running app usually updates in the browser so you can iterate without restarting everything by hand.
            </p>
            <CommandBlock command="npm install && npm run dev" description="Run this from the project folder — then open the localhost URL your terminal prints" />
          </Step>

          <Step number={2} title="Add your card in code">
            <p className="text-sm text-muted-foreground">
              In{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">components/playground/</code>, duplicate{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">TemplateCard.tsx</code> into a new file such as{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">YourNameCard.tsx</code>. At the bottom of that file, make sure you <strong className="text-foreground">export</strong> your card component (Quick decode: &quot;export your card&quot;). Optionally, <strong className="text-foreground">wire it into</strong> the Playground screen — import it where this tab is built and place it in the layout — so your card shows up here; if that feels like a lot at first, you can still practice everything else in the Git tab. Customize with Cursor (
              <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">⌘</kbd>
              {" "}
              <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">K</kbd>
              ).
            </p>
          </Step>

          <Step number={3} title="Commit, push, open a PR">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Stage</strong> the files you mean to include (Quick decode: &quot;stage your changes&quot;), then commit with a clear message, push your branch, and open a PR on GitHub — that&apos;s the loop the Git tab walks through end to end.
            </p>
            <CommentaryBubble>
              When this site is deployed, your merged card can show up here for everyone — until then, your local dev preview is your source of truth.
            </CommentaryBubble>
          </Step>
        </div>
      </Section>
    </div>
  )
}
