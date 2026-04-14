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
          <p className="text-sm text-muted-foreground">
            You&apos;ll need a free GitHub account. Invites to this repo are sent by the team — accept the invitation (email or GitHub notification) when it arrives, then continue below.
          </p>

          <Step number={1} title="Sign in to GitHub from Cursor">
            <p className="text-sm text-muted-foreground">
              Cursor talks to GitHub for you when you clone, push, and open PRs. You activate that by signing in once — you don&apos;t need to paste SSH keys by hand.
            </p>
            <ol className="ml-4 list-decimal space-y-3 text-sm text-muted-foreground">
              <li>
                Open the <strong className="text-foreground">Command Palette</strong>:{" "}
                <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">⌘</kbd>{" "}
                + <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">Shift</kbd>{" "}
                + <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">P</kbd> on Mac, or{" "}
                <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">Ctrl</kbd>{" "}
                + <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">Shift</kbd>{" "}
                + <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">P</kbd> on Windows.
              </li>
              <li>
                Type <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">GitHub</code> and pick the command that signs you in — often named something like{" "}
                <strong className="text-foreground">GitHub: Sign in</strong> or <strong className="text-foreground">Sign in to GitHub</strong> (wording can vary slightly by Cursor version).
              </li>
              <li>
                Your browser opens: log into GitHub if asked, then <strong className="text-foreground">Authorize</strong> Cursor. When the browser says you&apos;re done, return to Cursor — it should now be linked to your GitHub account.
              </li>
              <li>
                <strong className="text-foreground">Alternative:</strong> click your <strong className="text-foreground">profile / account</strong> menu (often top-right in Cursor), open <strong className="text-foreground">Settings</strong> or <strong className="text-foreground">Cursor Settings</strong>, and look for GitHub or <strong className="text-foreground">Connect</strong> / <strong className="text-foreground">Sign in</strong> next to accounts — that launches the same kind of browser sign-in.
              </li>
            </ol>
            <p className="text-sm text-muted-foreground">
              After this works, the first time you <strong className="text-foreground">clone</strong> or <strong className="text-foreground">push</strong>, Cursor can use that login automatically instead of asking for cryptic keys.
            </p>
            <CommentaryBubble>
              If the palette doesn&apos;t list GitHub, update Cursor and try again — or ask for a quick screen share. If something asks for &quot;SSH&quot; or &quot;personal access token&quot; before you&apos;ve tried the sign-in flow, pause and get help; the browser sign-in is the path we want first.
            </CommentaryBubble>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Nesto company repos:</strong> when you connect to repositories at work (Nesto&apos;s GitHub org, VPN, or internal auth), the exact sign-in and permission steps can differ from this playground — follow your team&apos;s instructions there; treat this section as the pattern, not a copy-paste for every repo.
            </p>
          </Step>

          <Step number={2} title="Cloning the playground">
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
            <p className="text-sm text-muted-foreground">
              After the clone finishes, open the project folder in Cursor (it will usually be called{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">cursorfornestodesigners</code>
              ). In the terminal, from that folder, install dependencies and start the dev server:
            </p>
            <CommandBlock command="npm install" description="Once — downloads the packages this project needs" />
            <CommandBlock command="npm run dev" description="Starts the local site; watch the terminal for the ready message" />
            <p className="text-sm text-muted-foreground">
              Then open{" "}
              <a
                href="http://localhost:3000/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                http://localhost:3000/
              </a>{" "}
              in your browser — for this repository, local development is set up so the app loads at the <strong className="text-foreground">root</strong> URL (you don&apos;t need to add{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">/cursorfornestodesigners/</code> after{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">localhost:3000</code>
              ). The <strong className="text-foreground">live</strong> site on GitHub Pages still uses the longer path; only your machine&apos;s dev server uses the short link.
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
              You&apos;ll ship a small, visible change so the full loop feels real: sync, branch, code, commit, open a PR — and when it merges, your card shows up in the <strong className="text-foreground">Playground</strong> gallery for everyone.
            </p>
          </div>

          <Step number={1} title="Syncing">
            <p className="text-sm text-muted-foreground">
              Make sure the <strong className="text-foreground">bottom panel</strong> is visible so you can run commands in the <strong className="text-foreground">terminal</strong>. Toggle it with{" "}
              <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">⌘</kbd>{" "}
              + <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">J</kbd> on Mac (or{" "}
              <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">Ctrl</kbd>{" "}
              + <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">J</kbd> on Windows) — that shortcut shows or hides the panel where your Git commands run.
            </p>
            <p className="text-sm text-muted-foreground">
              Then run <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">git pull</code> so you have everyone else&apos;s latest work before you branch.
            </p>
            <CommandBlock command="git pull" />
          </Step>

          <Step number={2} title="Branching">
            <p className="text-sm text-muted-foreground">
              Create a branch named <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">feature/yourname-card</code> (use your actual name).
            </p>
            <CommandBlock command="git checkout -b feature/yourname-card" description="Example — swap yourname for your name" />
            <CommentaryBubble name="Personal note">
              After you&apos;ve run that command, I&apos;d like you to open the{" "}
              <strong className="font-medium text-foreground">Source Control</strong> tab in the sidebar (that&apos;s the version control / Git view). Look for the branching graph or branch list, depending on your Cursor version — you should see the branch you just created. As other designers add their own branches, and each time you run{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">git pull</code> to pick up the latest from the remote, you&apos;ll see more branches show up here too — it&apos;s a simple way to watch everyone working in parallel.
            </CommentaryBubble>
          </Step>

          <Step number={3} title="Build your card and put it on the Playground page">
            <p className="text-sm text-muted-foreground">
              Work in <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">components/playground/</code> in your clone (same paths as this project).
            </p>
            <ol className="ml-4 list-decimal space-y-3 text-sm text-muted-foreground">
              <li className="space-y-2">
                <div>
                  <strong className="text-foreground">Duplicate the template.</strong> Copy{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">TemplateCard.tsx</code> to a new file, e.g.{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">YourNameCard.tsx</code>. In that new file, keep the same overall structure, but rename the main function so it matches your file — for example change{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">TemplateCard</code> to{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">YourNameCard</code> and keep the word{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">export</code> at the start of that line, like{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">export function YourNameCard()</code>
                  .
                </div>
                <p className="rounded-md border border-border/80 bg-muted/30 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">ELI5 — &quot;export&quot; and &quot;component&quot;:</strong> Think of a{" "}
                  <strong className="text-foreground">component</strong> as a named, reusable block of UI (like a component or symbol you might reuse in a design tool).{" "}
                  <strong className="text-foreground">Export</strong> simply means &quot;this block has a name, and other files are allowed to use it.&quot; The little{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.7rem]">export</code> keyword in front of your function is what makes that true — without it, the registry file couldn&apos;t import your card. You don&apos;t have to understand much more than: duplicate the file, rename the function to yours, leave <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.7rem]">export</code> in place, and you&apos;re good.
                </p>
              </li>
              <li>
                <strong className="text-foreground">Customize it.</strong> Use Cursor (
                <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">⌘</kbd>{" "}
                + <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">K</kbd>
                ) to tweak the shadcn <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Badge</code>,{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Card</code>, copy, and layout. Refresh your local dev server to preview — your card isn&apos;t on the shared Playground page until the next step.
              </li>
              <li>
                <strong className="text-foreground">Register it so everyone sees it.</strong> Open{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">components/playground/designer-cards-registry.tsx</code>
                . Import your component at the top, then add one entry to the{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">DESIGNER_CARDS</code> array — for example{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                  {`{ id: "alex", label: "Alex", Component: AlexCard }`}
                </code>
                . That file is the single list the <strong className="text-foreground">Playground</strong> tab reads; without this step, your card file exists in the repo but never appears in the gallery. You can remove or replace the bundled example row when you&apos;re ready.
              </li>
            </ol>
            <CommentaryBubble>
              Treat this like one small Figma frame: duplicate, style, then &quot;publish&quot; by registering — the PR you open should include both your new card file <em>and</em> your line in the registry so reviewers see the full picture.
            </CommentaryBubble>
          </Step>

          <Step number={4} title="Committing">
            <p className="text-sm text-muted-foreground">
              Open the <strong className="text-foreground">Source Control</strong> tab in Cursor. <strong className="text-foreground">Stage</strong> your changes first — include both your new card file <em>and</em>{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">designer-cards-registry.tsx</code> if you edited it (tick files or hit the <strong className="text-foreground">+</strong> next to each — think &quot;put these edits in the box&quot;). Type a clear commit message (e.g. &quot;Added [Name] profile card to Playground gallery&quot;).
            </p>
            <p className="text-sm text-muted-foreground">
              Then press the big <strong className="text-foreground">Commit</strong> button — yes, that one. That&apos;s the right control after staging: it saves a <strong className="text-foreground">commit</strong>, which is a snapshot of your work <strong className="text-foreground">on your computer only</strong>. You are not uploading to GitHub yet.
            </p>
            <CommentaryBubble>
              &quot;Stage&quot; sounds formal; it&apos;s really just choosing what goes into your next snapshot before you hit commit.
            </CommentaryBubble>
          </Step>

          <Step number={5} title="Pushing &amp; opening a PR">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Commit vs push:</strong> a <strong className="text-foreground">commit</strong> is a local save (what you did in the previous step with the <strong className="text-foreground">Commit</strong> button). A <strong className="text-foreground">push</strong> sends those commits up to GitHub so others can see your branch. You need <em>both</em> — don&apos;t skip commit and only type <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">git push</code> until you&apos;ve actually committed.
            </p>
            <p className="text-sm text-muted-foreground">
              To push, you can either run the command below in the <strong className="text-foreground">terminal</strong>, or use <strong className="text-foreground">Publish Branch</strong> / <strong className="text-foreground">Sync</strong> / <strong className="text-foreground">Push</strong> in the Source Control view if Cursor shows it — same job, pick whichever you prefer.
            </p>
            <CommandBlock command="git push -u origin feature/yourname-card" description="Run after your commit — publishes your branch to GitHub and sets upstream (swap branch name if yours differs)" />
            <p className="text-sm text-muted-foreground">
              Then use the GitHub link Cursor or the terminal prints to open your first Pull Request.
            </p>
            <CommentaryBubble name="Personal note">
              After you publish, Cursor sometimes pops up asking whether you&apos;d like to run{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">git fetch</code> periodically. I wanted to flag that here: <strong className="font-medium text-foreground">fetch</strong> only downloads <em>information</em> about <strong className="font-medium text-foreground">new commits and branches on the remote</strong> (what exists on GitHub) and updates your local picture of that — it does <strong className="font-medium text-foreground">not</strong> change the files in your project folder or merge anything into the branch you&apos;re on.{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">git pull</code> is different: it brings those remote changes <strong className="font-medium text-foreground">into your checkout</strong> so your files actually update. Saying yes to periodic fetch just keeps branch lists and history fresher; you can still run{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">git pull</code> whenever you want the latest code in your workspace.
            </CommentaryBubble>
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
              When your PR is approved, merge it with <strong className="text-foreground">Squash and merge</strong>. The project deploys with <strong className="text-foreground">GitHub Pages</strong>. After your work lands on <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">main</code>, the workflow in{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.github/workflows/deploy.yml</code> builds the static site and publishes it; give it a minute, then check that the run is green under the repo&apos;s{" "}
              <strong className="text-foreground">Actions</strong> tab.
            </p>
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
