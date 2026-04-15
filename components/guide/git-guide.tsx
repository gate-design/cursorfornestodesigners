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
import {
  PLAYGROUND_REPO_CLONE_URL,
  PLAYGROUND_REPO_WEB,
} from "@/lib/playground-repo"

function AskCursor({
  prompt,
  children,
}: {
  prompt: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2 rounded-none border border-primary/25 bg-primary/5 p-4">
      <p className="text-[11px] font-semibold tracking-wide text-primary [font-variant:small-caps]">
        Type this in Cursor (chat or Agent)
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

/** Optional: run these yourself to save chat tokens or learn what Cursor is doing. */
function SameInTerminal({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 space-y-2 rounded-none border border-border/80 bg-muted/35 p-3">
      <p className="text-[11px] font-semibold tracking-wide text-muted-foreground [font-variant:small-caps]">
        Same thing in the terminal
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

export function GitGuide() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="font-mono text-4xl font-bold tracking-tight">Git &amp; GitHub for Designers</h1>
        <p className="text-lg text-muted-foreground">
          Ask Cursor in plain English first — each step below also shows the Git commands underneath so you can level up or skip the chat when you want.
        </p>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Table of contents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a href="#git-picture" className="block text-sm text-primary hover:underline">
            Part 1 — The picture in your head
          </a>
          <a href="#git-start" className="block text-sm text-primary hover:underline">
            Part 2 — First-time setup
          </a>
          <a href="#git-loop" className="block text-sm text-primary hover:underline">
            Part 3 — The loop: sync, branch, save, share
          </a>
          <a href="#git-after-merge" className="block text-sm text-primary hover:underline">
            Part 4 — After your PR is merged
          </a>
          <a href="#git-review" className="block text-sm text-primary hover:underline">
            Part 5 — Looking at someone else&apos;s work
          </a>
          <a href="#git-oops" className="block text-sm text-primary hover:underline">
            Part 6 — When Git complains
          </a>
        </CardContent>
      </Card>

      <div className="space-y-12">
        <Section
          id="git-picture"
          title="Part 1: The picture in your head"
          description="Four ideas — that&apos;s all you need before you ask Cursor for anything."
        >
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">The repo</strong> is the one shared project folder that lives on GitHub — like one master Figma file for the team.
            </li>
            <li>
              <strong className="text-foreground">main</strong> is the &quot;official&quot; version everyone agrees is current. You don&apos;t paint directly on it; you copy your work into it through a review (a PR).
            </li>
            <li>
              <strong className="text-foreground">A branch</strong> is your private copy of the project to try ideas — like a Figma branch before you merge into the file.
            </li>
            <li>
              <strong className="text-foreground">A pull request (PR)</strong> is &quot;please look at my changes and add them to main.&quot; Comments happen there, like pinned feedback on a frame.
            </li>
          </ul>
          <CommentaryBubble>
            When Cursor &quot;runs Git,&quot; it&apos;s just moving files and messages between your laptop and GitHub the way the team agreed. The commands in the gray boxes are what it&apos;s usually doing for you.
          </CommentaryBubble>
        </Section>

        <Separator />

        <Section
          id="git-start"
          title="Part 2: First-time setup"
          description="Do this once. After that, you mostly repeat Part 3."
        >
          <p className="text-sm text-muted-foreground">
            You need a free GitHub account and access to the repo (your team sends an invite). Then link GitHub to Cursor so pushes and pulls don&apos;t feel like a password puzzle.
          </p>

          <Step number={1} title="Connect GitHub to Cursor">
            <p className="text-sm text-muted-foreground">
              Open the Command Palette:{" "}
              <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">⌘</kbd>{" "}
              + <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">Shift</kbd>{" "}
              + <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">P</kbd> (Mac) or{" "}
              <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">Ctrl</kbd>{" "}
              + <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">Shift</kbd>{" "}
              + <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">P</kbd> (Windows). Search for GitHub and choose sign-in; your browser will ask you to approve Cursor.
            </p>
            <AskCursor prompt="Help me sign in to GitHub from Cursor so I can push and pull.">
              <p>
                <strong className="text-foreground">What that does:</strong> Connects your GitHub identity to Cursor so Git operations can authenticate — there isn&apos;t one magic <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">git …</code> line that replaces this; it&apos;s account wiring.
              </p>
              <SameInTerminal>
                <p className="text-xs text-muted-foreground">
                  No terminal equivalent — use Cursor / GitHub sign-in. After this, commands like <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.7rem]">git push</code> can run without you pasting tokens each time.
                </p>
              </SameInTerminal>
            </AskCursor>
          </Step>

          <Step number={2} title="Get a copy of the project on your computer">
            <AskCursor prompt={`Clone the Git repository ${PLAYGROUND_REPO_CLONE_URL} into a folder on my machine and open it in Cursor.`}>
              <p>
                <strong className="text-foreground">What that does:</strong> Git copies the whole project from GitHub to your laptop — real files, not a screenshot.
              </p>
              <SameInTerminal>
                <CommandBlock
                  command={`git clone ${PLAYGROUND_REPO_CLONE_URL}`}
                  description="Run where you want the project folder to live (e.g. your home or dev folder)"
                />
                <CommandBlock
                  command="cd cursorfornestodesigners"
                  description="Then open this folder in Cursor (File → Open Folder)"
                />
              </SameInTerminal>
            </AskCursor>
            <p className="text-sm text-muted-foreground">
              Repo link:{" "}
              <a
                href={PLAYGROUND_REPO_WEB}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                {PLAYGROUND_REPO_WEB.replace("https://", "")}
              </a>
            </p>
            <AskCursor prompt="After the project is open, run npm install and then npm run dev so I can preview the site on localhost.">
              <p>
                <strong className="text-foreground">What that does:</strong> Installs JavaScript dependencies and starts the local dev server (not Git — but you need it to preview the app).
              </p>
              <SameInTerminal>
                <CommandBlock command="npm install" description="Once per clone (or after dependencies change)" />
                <CommandBlock
                  command="npm run dev"
                  description="From the project folder; then open http://localhost:3000/"
                />
              </SameInTerminal>
            </AskCursor>
          </Step>
        </Section>

        <Separator />

        <Section
          id="git-loop"
          title="Part 3: The loop — sync, branch, save, share"
          description="This is the rhythm you&apos;ll use over and over: get latest, work on your branch, save, upload, open a PR."
        >
          <div className="rounded-none border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-semibold tracking-wide text-primary [font-variant:small-caps]">
              Goal
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Ship a small change (like your Playground card) so you&apos;ve done the full path: sync → branch → edit → commit → push → PR.
            </p>
          </div>

          <Step number={1} title="Start from the newest team code">
            <AskCursor prompt="Pull the latest changes from GitHub into my current branch so my project matches the remote.">
              <p>
                <strong className="text-foreground">What that does:</strong> Downloads new commits from GitHub and merges them into <em>whatever branch you have checked out</em> — usually the same as <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">git pull</code>.
              </p>
              <SameInTerminal>
                <CommandBlock
                  command="git pull"
                  description="Run in the project folder, at the bottom of Cursor (⌘J / Ctrl+J) or an external terminal"
                />
              </SameInTerminal>
            </AskCursor>
          </Step>

          <Step number={2} title="Give your work its own lane">
            <AskCursor prompt="Create a new branch with the name feature/mycard (replace mycard with something short and unique, like my name).">
              <p>
                <strong className="text-foreground">What that does:</strong> Creates and switches to a new branch so <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">main</code> stays clean until you merge via PR.
              </p>
              <SameInTerminal>
                <CommandBlock
                  command="git checkout -b feature/mycard"
                  description="Swap feature/mycard for your real branch name (e.g. feature/alex-card)"
                />
              </SameInTerminal>
            </AskCursor>
            <CommentaryBubble>
              If you use <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">feature/alex-card</code>, use that same name in <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">git push</code> later.
            </CommentaryBubble>
          </Step>

          <Step number={3} title="Make your Playground card">
            <p className="text-sm text-muted-foreground">
              Work inside <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">components/playground/</code> — short version of the steps:
            </p>
            <ol className="ml-4 list-decimal space-y-2 text-sm text-muted-foreground">
              <li>
                Copy <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">TemplateCard.tsx</code> to a new file named after you, then rename the function inside to match. This is often easiest in the{" "}
                <strong className="text-foreground">project folder on your computer</strong> (Finder on Mac, File Explorer on Windows): open your clone, go to{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">components/playground/</code>, duplicate the file, and rename it — Cursor will pick up the new file right away.
              </li>
              <li>Style it with Cursor&apos;s help; refresh localhost to preview.</li>
              <li>
                Register it in{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">components/playground/designer-cards-registry.tsx</code> so the Playground tab can show it.
              </li>
            </ol>
            <AskCursor prompt="Help me register my new card component in designer-cards-registry.tsx and fix any import errors.">
              <p>
                <strong className="text-foreground">What that does:</strong> Edits files only — Git doesn&apos;t record anything until you commit in the next step.
              </p>
              <SameInTerminal>
                <CommandBlock
                  command="git status"
                  description="Optional — see which files changed before you stage them"
                />
              </SameInTerminal>
            </AskCursor>
          </Step>

          <Step number={4} title="Save a snapshot on your laptop (commit)">
            <p className="text-sm text-muted-foreground">
              A <strong className="text-foreground">commit</strong> is a checkpoint <em>only on your computer</em> until you push. Easiest: <strong className="text-foreground">Source Control</strong> sidebar → stage files → message → <strong className="text-foreground">Commit</strong>.
            </p>
            <AskCursor prompt="Stage all my changes related to my Playground card and commit with the message: Add my profile card to the Playground.">
              <p>
                <strong className="text-foreground">What that does:</strong> Stages chosen files and saves one commit with your message — same as <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">git add</code> + <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">git commit</code>.
              </p>
              <SameInTerminal>
                <CommandBlock
                  command="git add components/playground/YourNameCard.tsx components/playground/designer-cards-registry.tsx"
                  description="List every file you changed; adjust paths to match your card file name"
                />
                <CommandBlock
                  command='git commit -m "Add my profile card to the Playground"'
                  description="Use your own message inside the quotes"
                />
              </SameInTerminal>
            </AskCursor>
          </Step>

          <Step number={5} title="Upload your branch (push) and open a PR">
            <AskCursor prompt="Push my current branch to GitHub and set it to track the remote branch so I can open a pull request.">
              <p>
                <strong className="text-foreground">What that does:</strong> Sends your commits to GitHub. First time on a branch, Git sets &quot;upstream&quot; with <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">-u</code> so later you can type just <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">git push</code>.
              </p>
              <SameInTerminal>
                <CommandBlock
                  command="git push -u origin feature/yourname-card"
                  description="Replace feature/yourname-card with your real branch name"
                />
              </SameInTerminal>
            </AskCursor>
            <p className="text-sm text-muted-foreground">
              After the push, use the <strong className="text-foreground">Open pull request</strong> link. When it&apos;s approved, someone merges (often <strong className="text-foreground">Squash and merge</strong>) and your work joins <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">main</code> on GitHub.
            </p>
            <AskCursor prompt="Explain the difference between fetch and pull in Git in one short paragraph.">
              <p>
                <strong className="text-foreground">Optional sanity check:</strong> <em>Fetch</em> downloads news about remote branches without changing your files; <em>pull</em> fetches and merges into your current branch.
              </p>
              <SameInTerminal>
                <CommandBlock command="git fetch origin" description="Update remote tracking branches; your working files unchanged" />
                <CommandBlock
                  command="git pull"
                  description="Fetch + merge into the branch you have checked out — the usual &quot;get latest&quot;"
                />
              </SameInTerminal>
            </AskCursor>
          </Step>
        </Section>

        <Separator />

        <Section
          id="git-after-merge"
          title="Part 4: After your PR is merged"
          description="Your change is on main on GitHub — not automatically on your laptop. Before the next task, you run the beginning of the loop again."
        >
          <p className="text-sm text-muted-foreground">
            When the PR is approved, someone merges on GitHub. That updates <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">main</code> on the server. You <strong className="text-foreground">go back to the top of Part 3</strong>: checkout <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">main</code>, pull, then a new branch for the next task.
          </p>

          <Step number={1} title="Switch to main on your machine">
            <AskCursor prompt="Check out the main branch in this repo so my project matches the team's main line locally.">
              <p>
                <strong className="text-foreground">What that does:</strong> Moves your working copy to the <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">main</code> branch so the next pull updates the right thing.
              </p>
              <SameInTerminal>
                <CommandBlock command="git checkout main" description="Some repos use master instead of main — match your repo" />
              </SameInTerminal>
            </AskCursor>
          </Step>

          <Step number={2} title="Pull the latest — same as Part 3, step 1">
            <AskCursor prompt="Pull the latest changes from GitHub into my current branch (main) so I have everything that was merged.">
              <p>
                <strong className="text-foreground">What that does:</strong> Same as <strong className="text-foreground">Part 3, step 1</strong> — your local <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">main</code> now matches GitHub, including your merge and others&apos;.
              </p>
              <SameInTerminal>
                <CommandBlock command="git pull" description="While on main, from the project folder" />
              </SameInTerminal>
            </AskCursor>
          </Step>

          <Step number={3} title="Start the next task — same as Part 3, step 2">
            <AskCursor prompt="Create a new branch for my next change — suggest a short name like feature/second-tweak based on what I'm about to do.">
              <p>
                <strong className="text-foreground">What that does:</strong> Same as <strong className="text-foreground">Part 3, step 2</strong> — a fresh branch for new edits, then commit / push / PR again.
              </p>
              <SameInTerminal>
                <CommandBlock
                  command="git checkout -b feature/second-tweak"
                  description="Pick any unused branch name that describes the next change"
                />
              </SameInTerminal>
            </AskCursor>
            <CommentaryBubble>
              After a merge you loop: <strong className="font-medium text-foreground">main</strong> → <strong className="font-medium text-foreground">pull</strong> (Part 3.1) → <strong className="font-medium text-foreground">new branch</strong> (Part 3.2). Old branches can stay on GitHub.
            </CommentaryBubble>
          </Step>
        </Section>

        <Separator />

        <Section
          id="git-review"
          title="Part 5: Looking at someone else&apos;s work"
          description="On GitHub: open the PR list, leave a real comment, try Request changes once."
        >
          <p className="text-sm text-muted-foreground">
            On GitHub, open the{" "}
            <a
              href={`${PLAYGROUND_REPO_WEB}/pulls`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Pull requests
            </a>{" "}
            tab for this repo. Pick someone else&apos;s open PR. Read the diff, leave a helpful note. Use <strong className="text-foreground">Request changes</strong> when something must be fixed before you&apos;d approve.
          </p>
          <AskCursor prompt="In plain language, what should I look for when reviewing a teammate&apos;s pull request as a designer?">
            <p>
              <strong className="text-foreground">What that does:</strong> Practice for you — no Git command required. Approve / merge happens on GitHub.
            </p>
            <SameInTerminal>
              <p className="text-xs text-muted-foreground">
                Optional: <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.7rem]">gh pr checkout 123</code> (GitHub CLI) checks out a PR branch locally — only if your team uses it.
              </p>
            </SameInTerminal>
          </AskCursor>
        </Section>

        <Separator />

        <Section
          id="git-oops"
          title="Part 6: When Git complains"
          description="Two scary words, explained softly."
        >
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Merge conflict</strong> means two people edited the same lines. Resolve in Cursor (keep mine / theirs / edit), then finish the merge.
            </p>
            <AskCursor prompt="I have merge conflicts in a file. Walk me through resolving them in Cursor step by step.">
              <p>
                <strong className="text-foreground">What that does:</strong> After you delete conflict markers and save, you complete the merge with a commit.
              </p>
              <SameInTerminal>
                <CommandBlock command="git add path/to/conflicted-file.tsx" description="Mark the file resolved after you edit it" />
                <CommandBlock
                  command='git commit -m "Resolve merge conflict"'
                  description="Or use git merge --continue if Git put you in a merge state"
                />
              </SameInTerminal>
            </AskCursor>
            <p>
              <strong className="text-foreground">Revert</strong> on a merged PR (GitHub UI) undoes that merge for everyone. From the CLI, teams sometimes run <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">git revert &lt;merge-commit-sha&gt;</code> — ask your team before reverting on shared repos.
            </p>
          </div>
        </Section>
      </div>

      <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
        <p>Questions? Ask your team in Slack — or ask Cursor to explain any Git word you bump into.</p>
      </div>
    </div>
  )
}
