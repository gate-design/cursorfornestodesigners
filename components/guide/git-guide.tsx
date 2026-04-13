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
import {
  PLAYGROUND_LIVE_SITE,
  PLAYGROUND_REPO_CLONE_URL,
  PLAYGROUND_REPO_WEB,
} from "@/lib/playground-repo"

export function GitGuide() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="text-4xl font-bold">Git &amp; GitHub for Designers</h1>
        <p className="text-lg text-muted-foreground">
          You already think in frames and feedback — here you&apos;ll map that to branches, PRs, and calm collaboration with engineering
        </p>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Table of Contents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a href="#git-mental-model" className="block text-sm text-primary hover:underline">
            Part 1 — The mental model (Git vs. Figma)
          </a>
          <a href="#git-setup" className="block text-sm text-primary hover:underline">
            Part 2 — Setting the stage (one-time setup)
          </a>
          <a href="#git-mission-1" className="block text-sm text-primary hover:underline">
            Part 3 — Mission 1: The profile card
          </a>
          <a href="#git-mission-2" className="block text-sm text-primary hover:underline">
            Part 4 — Mission 2: The peer review
          </a>
          <a href="#git-mission-3" className="block text-sm text-primary hover:underline">
            Part 5 — Mission 3: The chaos room
          </a>
        </CardContent>
      </Card>

      <div className="space-y-12">
        <Section
          id="git-mental-model"
          title="Part 1: The mental model (Git vs. Figma)"
          description="Before you touch the terminal, translate the concepts into language you already know."
        >
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-medium text-primary">Same habits, different surface</p>
            <p className="mt-2 text-sm text-muted-foreground">
              You already think in versions, reviews, and shared files. Git names those ideas so engineers can work in parallel without stepping on each other.
            </p>
          </div>

          <ul className="space-y-4 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">The repository (the project).</strong> Think of it as <em>your</em> master Figma file — one canonical place where the project lives.
            </li>
            <li>
              <strong className="text-foreground">Main (the source of truth).</strong> Treat this as the &quot;production&quot; version: what shipped and what you and the team agree is current.
            </li>
            <li>
              <strong className="text-foreground">Branches (the sandbox).</strong> Same idea as Figma branches, but for code — you explore and iterate here without breaking Main.
            </li>
            <li>
              <strong className="text-foreground">The PR (the design review).</strong> This is where you show your work, collect feedback, and merge your changes into that master file when you&apos;re ready.
            </li>
          </ul>

          <CommentaryBubble>
            If Figma branches already clicked for you, you&apos;re most of the way there — Git is the same collaboration contract, with text and automation around it.
          </CommentaryBubble>
        </Section>

        <Separator />

        <Section
          id="git-setup"
          title="Part 2: Setting the stage (one-time setup)"
          description="You only do these steps once — keep the friction low for yourself."
        >
          <Step number={1} title="GitHub account &amp; permissions">
            <p className="text-sm text-muted-foreground">
              Make sure <em>you</em> have a GitHub account and that your lead has added you to the{" "}
              <a
                href="https://github.com/gate-design"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                gate-design
              </a>{" "}
              organization with access to the playground repo{" "}
              <a
                href={PLAYGROUND_REPO_WEB}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                cursorfornestodesigners
              </a>
              .
            </p>
          </Step>

          <Step number={2} title="Authentication in Cursor">
            <p className="text-sm text-muted-foreground">
              Use Cursor&apos;s built-in <strong className="text-foreground">Sign in to GitHub</strong> flow. It&apos;s much easier for designers than managing SSH keys manually.
            </p>
            <CommentaryBubble>
              If you&apos;re ever asked for keys and tokens, ask for help — the built-in sign-in path is the one we want you on first.
            </CommentaryBubble>
          </Step>

          <Step number={3} title="Cloning the playground">
            <p className="text-sm text-muted-foreground">
              These guides and the <strong className="text-foreground">Playground</strong> tab in this app all ship from the same repository — once you clone it, you&apos;re editing the code you&apos;ve been reading.
            </p>
            <ol className="ml-4 list-decimal space-y-2 text-sm text-muted-foreground">
              <li>Open Cursor.</li>
              <li>
                Press <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">⌘</kbd>{" "}
                + <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">Shift</kbd>{" "}
                + <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">P</kbd> → run{" "}
                <span className="font-medium text-foreground">&quot;Git: Clone&quot;</span>.
              </li>
              <li>
                Paste this URL when prompted:
              </li>
            </ol>
            <CommandBlock command={`git clone ${PLAYGROUND_REPO_CLONE_URL}`} />
            <p className="text-sm text-muted-foreground">
              Repo on GitHub:{" "}
              <a
                href={PLAYGROUND_REPO_WEB}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                {PLAYGROUND_REPO_WEB.replace("https://", "")}
              </a>
            </p>
          </Step>
        </Section>

        <Separator />

        <Section
          id="git-mission-1"
          title="Part 3: Mission 1 — &quot;The profile card&quot;"
          description="You&apos;ll run through pull → branch → edit → push → PR until it feels routine."
        >
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-medium text-primary">Goal</p>
            <p className="mt-2 text-sm text-muted-foreground">
              You&apos;ll ship a small, visible change so the full loop feels real: sync, branch, code, commit, open a PR.
            </p>
          </div>

          <Step number={1} title="Syncing">
            <p className="text-sm text-muted-foreground">
              Run <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">git pull</code> so you have everyone else&apos;s latest work before you branch.
            </p>
            <CommandBlock command="git pull" />
          </Step>

          <Step number={2} title="Branching">
            <p className="text-sm text-muted-foreground">
              Create a branch named <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">feature/yourname-card</code> (use your actual name).
            </p>
            <CommandBlock command="git checkout -b feature/yourname-card" description="Example — swap yourname for your name" />
          </Step>

          <Step number={3} title="The task">
            <p className="text-sm text-muted-foreground">
              Go to <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">components/playground/</code> in your clone (same paths as this project).
            </p>
            <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
              <li>Duplicate <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">TemplateCard.tsx</code> and rename it to <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">YourNameCard.tsx</code>.</li>
              <li>
                Use Cursor (<kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">⌘</kbd>{" "}
                + <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">K</kbd>) to customize the shadcn <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Badge</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Card</code>, and layout — and make the card feel like you. Use the <strong className="text-foreground">Playground</strong> tab in the running app as your preview.
              </li>
            </ul>
            <CommentaryBubble>
              Treat this like one playground frame: small scope, fast feedback, lots of room for you to experiment.
            </CommentaryBubble>
          </Step>

          <Step number={4} title="Committing">
            <p className="text-sm text-muted-foreground">
              Open the <strong className="text-foreground">Source Control</strong> tab in Cursor. <strong className="text-foreground">Stage</strong> your changes first — that means you tell Git which edited files belong in this save: tick them or hit the <strong className="text-foreground">+</strong> next to each file (think &quot;put these edits in the box&quot;). Then write a clear message (e.g. &quot;Added [Name] profile card&quot;) and commit.
            </p>
            <CommentaryBubble>
              &quot;Stage&quot; sounds formal; it&apos;s really just choosing what goes into your next snapshot before you hit commit.
            </CommentaryBubble>
          </Step>

          <Step number={5} title="Pushing &amp; opening a PR">
            <p className="text-sm text-muted-foreground">
              Push your branch, then use the GitHub link Cursor or the terminal prints to open your first Pull Request.
            </p>
            <CommandBlock command="git push -u origin feature/yourname-card" description="Run this after you commit — it publishes your branch and sets the upstream" />
          </Step>
        </Section>

        <Separator />

        <Section
          id="git-mission-2"
          title="Part 4: Mission 2 — &quot;The peer review&quot;"
          description="You&apos;ll see how review protects Main — and how to find PRs when you&apos;re new to the repo."
        >
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-medium text-primary">Goal</p>
            <p className="mt-2 text-sm text-muted-foreground">
              You&apos;ll practice review as a craft: comment, request changes, approve — not just &quot;LGTM&quot; by default.
            </p>
          </div>

          <Step number={1} title="Finding open PRs and branches">
            <p className="text-sm text-muted-foreground">
              You need a PR that isn&apos;t yours before you can review it. On GitHub, open the playground repo (
              <a
                href={PLAYGROUND_REPO_WEB}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                gate-design/cursorfornestodesigners
              </a>
              — the same one you cloned), then use the tabs and filters so you&apos;re not hunting blindly.
            </p>
            <ul className="ml-4 list-disc space-y-2 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Pull requests.</strong> Click the{" "}
                <strong className="text-foreground">Pull requests</strong> tab. The list usually defaults to{" "}
                <strong className="text-foreground">Open</strong> — if not, use the filters or the search bar with{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">is:open</code> to hide merged or closed work.
              </li>
              <li>
                <strong className="text-foreground">Pick someone else&apos;s work.</strong> Scan the author column or the branch name (e.g.{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">feature/…</code>
                ) and open a PR that isn&apos;t yours. Sorting by <strong className="text-foreground">Recently updated</strong> helps when the list is long.
              </li>
              <li>
                <strong className="text-foreground">Branches without a PR yet.</strong> On the repo home, open the{" "}
                <strong className="text-foreground">branch dropdown</strong> (next to the file tree) and choose{" "}
                <strong className="text-foreground">View all branches</strong> to see what exists on GitHub — useful if you&apos;re pairing with someone who hasn&apos;t opened a PR.
              </li>
            </ul>
            <CommentaryBubble>
              If your team uses a Slack link or pinned bookmark to the repo, save it — you&apos;ll open this page a lot. The PR list is the main &quot;inbox&quot; for design review.
            </CommentaryBubble>
          </Step>

          <Step number={2} title="Reviewing someone else">
            <p className="text-sm text-muted-foreground">
              Open a PR from that list (not yours) and leave a thoughtful comment — a question, a suggestion, or kudos on a detail.
            </p>
          </Step>

          <Step number={3} title="Request changes">
            <p className="text-sm text-muted-foreground">
              Try the <strong className="text-foreground">Request changes</strong> flow yourself: ask for a color tweak or a spacing fix directly in the PR UI, tied to a line or region.
            </p>
            <CommentaryBubble>
              You already know this from Figma — pin-style comments that are specific, actionable, and kind.
            </CommentaryBubble>
          </Step>

          <Step number={4} title="Merging &amp; seeing it live">
            <p className="text-sm text-muted-foreground">
              When your PR is approved, merge it with <strong className="text-foreground">Squash and merge</strong> (unless your team asks you to use a different strategy). You don&apos;t need Vercel or Netlify for this project — it deploys with <strong className="text-foreground">GitHub Pages</strong>. After your work lands on <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">main</code>, the workflow in{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.github/workflows/deploy.yml</code> builds the static site and publishes it; give it a minute, then check that the run is green under the repo&apos;s{" "}
              <strong className="text-foreground">Actions</strong> tab.
            </p>
            <p className="text-sm text-muted-foreground">
              Live site (same guides + Playground, hosted on GitHub Pages):{" "}
              <a
                href={PLAYGROUND_LIVE_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                {PLAYGROUND_LIVE_SITE.replace(/^https:\/\//, "")}
              </a>
            </p>
            <CommentaryBubble>
              That URL looks long because this Next.js app uses a <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">basePath</code> — the path repeats the repo name. If your team ever points a custom domain at Pages, swap the link in{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">lib/playground-repo.ts</code> so designers aren&apos;t confused.
            </CommentaryBubble>
          </Step>
        </Section>

        <Separator />

        <Section
          id="git-mission-3"
          title="Part 5: Mission 3 — &quot;The chaos room&quot;"
          description="You&apos;ll demystify breaking the build, merge conflicts, and how you undo mistakes as a team."
        >
          <div className="mb-6 space-y-4">
            <h3 className="text-lg font-semibold">5a. The merge conflict</h3>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">The setup.</strong> You and another designer both edit the same line in a shared file — for example the title string in <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">PlaygroundPage.tsx</code>.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">The conflict.</strong> When the second person tries to merge, GitHub stops you until you decide how to combine the edits.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">The fix.</strong> Walk through Cursor&apos;s merge UI yourself: choose <strong className="text-foreground">Accept Incoming</strong>, <strong className="text-foreground">Accept Current</strong>, or <strong className="text-foreground">Keep Both</strong> — pick what matches the product truth, not &quot;who clicked last.&quot;
            </p>
            <CommentaryBubble>
              Conflicts look scary because they&apos;re verbose — really, Git is just asking you to pick which ideas survive in the same sentence.
            </CommentaryBubble>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">5b. The destructive change (the revert lesson)</h3>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">The setup.</strong> You (or a teammate) open a PR that deletes a core component or breaks the layout on purpose — only in the training sandbox.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">The rejection.</strong> You and your teammates reject or close that PR — Main stays safe because the bad change never landed.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">What if it merged?</strong> Locate the <strong className="text-foreground">Revert</strong> action on GitHub on a merged PR. That&apos;s your team-scale undo — you can roll back a bad merge on purpose and see that nothing has to be permanent.
            </p>
          </div>
        </Section>
      </div>

      <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
        <p>Questions? Ask in Slack — Git gets easier every time you run the loop.</p>
      </div>
    </div>
  )
}
