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
import { withBasePath } from "@/lib/base-path"

export function ClaudeDesignGuide() {
  const widgetSrc = withBasePath("/ClaudeCodeWidget.png")

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="font-mono text-4xl font-bold tracking-tight">Claude Design</h1>
        <p className="text-lg text-muted-foreground">
          Prototypes with higher fidelity to our design system — with very little setup
        </p>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Table of contents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a href="#claude-design-intro" className="block text-sm text-primary hover:underline">
            Intro
          </a>
          <a href="#claude-design-from-figma" className="block text-sm text-primary hover:underline">
            Start from a Figma file
          </a>
          <a href="#claude-design-back-to-figma" className="block text-sm text-primary hover:underline">
            Bring your prototype back to Figma
          </a>
        </CardContent>
      </Card>

      <div className="space-y-12">
        <Section
          id="claude-design-intro"
          title="Intro"
          description="What Claude Design is for"
        >
          <p className="text-sm text-muted-foreground">
            Claude Design is a new tool that enables anybody in the org to create prototypes with a higher degree of fidelity to our design system than what Figma Make and Cursor can — with very little setup required. I (Gate) am still working on improving the component library in Claude Design (which depends on improving the one in Figma 😅), but you may find that the solutions it provides are much closer to pixel perfect.
          </p>
        </Section>

        <Separator />

        <Section
          id="claude-design-from-figma"
          title="Start from a Figma file"
          description="Feed Claude Design a local file and describe what to build"
        >
          <p className="text-sm text-muted-foreground">
            You can feed it a Figma file (<strong className="text-foreground">File → Save Local Copy…</strong>) and describe a feature you would like to add — it&apos;ll create a prototype with the feature fully contextualized to the best of its ability.
          </p>
        </Section>

        <Separator />

        <Section
          id="claude-design-back-to-figma"
          title="Bring your prototype back to Figma"
          description="From export to Claude Code, then into Figma"
        >
          <p className="text-sm text-muted-foreground">
            You may find that once you&apos;re pleased with the prototype, you&apos;d like to bring the work back into Figma. This is now trivial in Figma Make (Copy Design CTA), but getting a mockup in Figma from Claude Design requires a bit more work.
          </p>
          <CommentaryBubble>
            If you&apos;ve gone through the previous guides, all of it should start to make sense.
          </CommentaryBubble>

          <Step number={1} title="Export from Claude Design">
            <p className="text-sm text-muted-foreground">
              Export your Claude Design project to a Claude Code project as a <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.zip</code> file and put the unzipped folder in your home folder (or any folder you choose). You&apos;ll be given a prompt to copy to your clipboard.
            </p>
          </Step>

          <Step number={2} title="Create a project folder">
            <p className="text-sm text-muted-foreground">
              Create a folder in your home folder to house your project.
            </p>
          </Step>

          <Step number={3} title="Open the terminal and move into that folder">
            <p className="text-sm text-muted-foreground">
              From the terminal, move to that folder.
            </p>
            <CommandBlock command="cd <folder-name>" description="Replace with your project folder name" />
            <CommentaryBubble>
              Hint: <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">cd</code> followed by the folder name moves you into your project&apos;s folder.
            </CommentaryBubble>
          </Step>

          <Step number={4} title="Start Claude in the terminal">
            <p className="text-sm text-muted-foreground">
              Activate Claude in the terminal by typing <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">claude</code> and pressing Enter.
            </p>
            <CommandBlock command="claude" description="Launch Claude in this terminal session" />
          </Step>

          <Step number={5} title="Paste the command from Claude Design">
            <p className="text-sm text-muted-foreground">
              Paste the command you got from Claude Design in the terminal. It&apos;ll start creating your prototype (you could keep working on it via Claude or Cursor if you wanted — but without the shared library components, the results might be poorer than if you kept iterating in Claude Design).
            </p>
          </Step>

          <Step number={6} title="Run the build locally">
            <p className="text-sm text-muted-foreground">
              Once it&apos;s done building the prototype, ask Claude to run the build locally.{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">npm install</code> and{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">npm run dev</code> should also work.
            </p>
            <CommandBlock command="npm install" description="Install dependencies (if needed)" />
            <CommandBlock command="npm run dev" description="Start the dev server" />
          </Step>

          <Step number={7} title="Open your target Figma file">
            <p className="text-sm text-muted-foreground">
              After it&apos;s done booting, open a Figma file where you&apos;d like the designs ported to and copy its Share link.
            </p>
          </Step>

          <Step number={8} title="Send the prototype to Figma">
            <p className="text-sm text-muted-foreground">
              Paste the Figma file&apos;s link in the terminal (where Claude is active) and tell it to copy your prototype (running on localhost) to Figma.
            </p>
          </Step>

          <Step number={9} title="Clean up in Figma">
            <p className="text-sm text-muted-foreground">
              A bit of cleanup will be necessary at this point — e.g. setting the proper styles, variables, adding auto-layouts, etc. (Not unlike copying designs from Figma Make.)
            </p>
          </Step>

          <Step number={10} title="Use the localhost widget">
            <p className="text-sm text-muted-foreground">
              At this point a neat little widget shows up on your localhost view. It lets you select different elements and port those over to Figma; you can also navigate your prototype and use <strong className="text-foreground">Send to Figma</strong> again to send that new screen over.
            </p>
            <div className="overflow-hidden rounded-none border bg-muted/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={widgetSrc}
                alt="Claude Code widget on localhost: Send to Figma, Entire screen, Select element, Open file"
                className="h-auto w-full max-w-3xl"
              />
            </div>
            <CommentaryBubble>
              That&apos;s it — have fun!
            </CommentaryBubble>
          </Step>
        </Section>
      </div>
    </div>
  )
}
