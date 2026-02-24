"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CopyIcon, CheckIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

// Type declaration for UnicornStudio
declare global {
  interface Window {
    UnicornStudio?: {
      init?: () => void
      isInitialized?: boolean
    }
  }
}

// Copy Button Component
function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={copyToClipboard}
      className={cn("h-6 w-6", className)}
      title="Copy to clipboard"
    >
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5 text-primary" />
      ) : (
        <CopyIcon className="h-3.5 w-3.5" />
      )}
    </Button>
  )
}

// Command Block Component (for terminal commands with copy button)
function CommandBlock({ command, description }: { command: string; description?: string }) {
  return (
    <div className="group relative">
      <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3 font-mono text-sm">
        <code className="flex-1">{command}</code>
        <CopyButton text={command} />
      </div>
      {description && (
        <p className="mt-1.5 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

// Chat Bubble Component for Personal Commentary
function CommentaryBubble({ children, name = "You" }: { children: React.ReactNode; name?: string }) {
  const [imageError, setImageError] = React.useState(false)
  // With Next.js basePath, public assets are served from the basePath
  // The basePath is '/cursorfornestodesigners' as configured in next.config.ts
  const avatarSrc = '/cursorfornestodesigners/avatar.png'

  return (
    <div className="flex gap-3">
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
        {!imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarSrc}
            alt={name}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </div>
      <div className="flex-1 rounded-lg border bg-muted/30 p-4">
        <div className="mb-1 text-xs font-medium text-muted-foreground">{name}</div>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

// Section Component
function Section({
  title,
  description,
  children,
  id,
}: {
  title: string
  description?: string
  children: React.ReactNode
  id?: string
}) {
  return (
    <section id={id} className="scroll-mt-8 space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        {description && (
          <p className="mt-1 text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  )
}

// Step Component
function Step({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {number}
        </div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="ml-11 space-y-3">{children}</div>
    </div>
  )
}

export default function Page() {
  React.useEffect(() => {
    // Unicorn Studio script injection
    const initUnicornStudio = () => {
      const u = window.UnicornStudio
      if (u && u.init) {
        const initFn = u.init
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", () => {
            if (initFn) initFn()
          })
        } else {
          if (initFn) initFn()
        }
      } else {
        window.UnicornStudio = { isInitialized: false, init: () => {} }
        const script = document.createElement("script")
        script.src =
          "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
        script.onload = () => {
          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => {
              if (window.UnicornStudio && window.UnicornStudio.init) {
                window.UnicornStudio.init()
              }
            })
          } else {
            if (window.UnicornStudio && window.UnicornStudio.init) {
              window.UnicornStudio.init()
            }
          }
        }
        ;(document.head || document.body).appendChild(script)
      }
    }

    initUnicornStudio()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 space-y-4 text-center">
          <h1 className="text-4xl font-bold">Cursor Guide for Designers</h1>
          <p className="text-lg text-muted-foreground">
            Create a custom design system and use it as the base for your projects
          </p>
        </div>

        {/* Table of Contents */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Table of Contents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="#prerequisites" className="block text-sm text-primary hover:underline">
              Prerequisites
            </a>
            <a href="#design-system" className="block text-sm text-primary hover:underline">
              1. Create Your Design System &amp; Project
            </a>
            <a href="#whats-next" className="block text-sm text-primary hover:underline">
              What&apos;s next
            </a>
          </CardContent>
        </Card>

        <div className="space-y-12">
          {/* Prerequisites Section */}
          <Section
            id="prerequisites"
            title="Prerequisites"
            description="Required software and tools before getting started"
          >
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Required Software:</h3>
                <div className="space-y-6">
                  {/* Node.js */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">1. Node.js</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Version:</strong> Version 22.16.0 (recommended) or &gt;= 14.0.0 (minimum)
                      </p>
                      <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                        <li>
                          Download from{' '}
                          <a
                            href="https://nodejs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            nodejs.org
                          </a>
                        </li>
                        <li>npm comes bundled with Node.js</li>
                        <li>Verify installation:</li>
                      </ul>
                      <div className="ml-4 mt-2 space-y-3">
                        <CommandBlock command="node --version" />
                        <CommentaryBubble>
                          Don&apos;t worry if you haven&apos;t used a terminal before! Think of it like a text-based way to talk to your computer. To use this command: 1) Open your computer&apos;s Terminal app (on Mac) or Command Prompt (on Windows), 2) Click the copy button above to copy the command, 3) Paste it into the terminal and press Enter. It will show you the version number if Node.js is installed correctly.
                        </CommentaryBubble>
                        <CommandBlock command="npm --version" />
                        <CommentaryBubble>
                          Same process here! Copy, paste into terminal, press Enter. This checks if npm (Node Package Manager) is working. You&apos;ll see a version number if everything is good.
                        </CommentaryBubble>
                      </div>
                    </div>
                  </div>

                  {/* Cursor IDE */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">2. Cursor IDE</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                        <li>
                          Download from{' '}
                          <a
                            href="https://cursor.sh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            cursor.sh
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Separator />

          {/* Section 1: Create Your Design System & Project */}
          <Section
            id="design-system"
            title="1. Create Your Design System &amp; Project"
            description="Customize your design system with shadcn/ui and use it as the base for your projects (it&apos;s how I built this site!)"
          >
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mb-6">
              <p className="text-sm font-medium text-primary">🎨 Your Design System, Your Projects</p>
              <p className="mt-2 text-sm text-muted-foreground">
                You&apos;ll use shadcn/ui to define your own colors, fonts, and components. Then you create a project from that design system and use it as the base for everything you build.
              </p>
            </div>

            <Step number={1} title="Create a folder for your new project">
              <p className="text-sm text-muted-foreground">
                On your computer, create a new folder where you want your project to live (e.g. on your Desktop or in a dedicated projects folder). You&apos;ll open this folder in Cursor in the next step.
              </p>
              <CommentaryBubble>
                Giving your folder a clear name (e.g. &quot;my-design-app&quot;) keeps things organized. You can use Finder (Mac) or File Explorer (Windows) to create it.
              </CommentaryBubble>
            </Step>

            <Step number={2} title="Open Cursor and Enable Cursor Features">
              <p className="text-sm text-muted-foreground">
                Open Cursor and open the folder you created (File → Open Folder). Then click the gear icon in the upper-right corner and ensure all features are enabled.
              </p>
              <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="h-4 w-4 rounded border-primary text-primary" />
                  <label className="text-sm">Agents</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="h-4 w-4 rounded border-primary text-primary" />
                  <label className="text-sm">Chat</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="h-4 w-4 rounded border-primary text-primary" />
                  <label className="text-sm">Editors</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="h-4 w-4 rounded border-primary text-primary" />
                  <label className="text-sm">Panel</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="h-4 w-4 rounded border-primary text-primary" />
                  <label className="text-sm">Sidebar</label>
                </div>
              </div>
              <CommentaryBubble>
                Having all these features enabled gives you the full power of Cursor&apos;s AI capabilities. The Agents feature is particularly powerful for complex tasks!
              </CommentaryBubble>
            </Step>

            <Step number={3} title="Customize Your Design System">
              <p className="text-sm text-muted-foreground">
                Visit the shadcn/ui project creator and customize your design system.
              </p>
              <div className="space-y-2">
                <a
                  href="https://ui.shadcn.com/create"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Open shadcn/ui Create
                  <span className="text-xs">↗</span>
                </a>
              </div>
              <CommentaryBubble>
                This is a fun way to experiment! You can customize colors, fonts, radius, and more. Play around with it until you find something you like.
              </CommentaryBubble>
            </Step>

            <Step number={4} title="Create Your Project">
              <p className="text-sm text-muted-foreground">
                Click the &apos;Create Project&apos; button on the shadcn/ui page.
              </p>
              <CommentaryBubble>
                This will generate a command that sets up a Next.js project with all the components pre-configured. Pretty neat!
              </CommentaryBubble>
            </Step>

            <Step number={5} title="Copy the npm Command">
              <p className="text-sm text-muted-foreground">
                Click on the &apos;npm&apos; tab and copy the command that appears.
              </p>
              <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                <p className="text-sm font-medium">Example command (yours will be different):</p>
                <CommandBlock command="npx shadcn@latest init -d" />
              </div>
            </Step>

            <Step number={6} title="Run the Command in Cursor Terminal">
              <p className="text-sm text-muted-foreground">
                Open Cursor&apos;s terminal and paste the command you copied.
              </p>
              <CommandBlock command="npx shadcn@latest init -d" description="Your actual command will be different based on your customization" />
              <CommentaryBubble>
                This creates a new project with all the shadcn/ui components ready to go. The project will be created in a new folder.
              </CommentaryBubble>
            </Step>

            <Step number={7} title="Ask Cursor to Build from a Screenshot or PRD">
              <p className="text-sm text-muted-foreground">
                Provide Cursor with a screenshot you want to reproduce, or paste a PRD (product requirements document) of any length. You can finish your prompt with &quot;run dev&quot; so Cursor knows to run the app locally for you.
              </p>
              <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                <p className="text-sm font-medium">Ask Cursor (examples):</p>
                <p className="rounded bg-background p-3 font-mono text-sm italic">
                  &quot;Reproduce this screenshot. Run dev.&quot; [attach your screenshot]
                </p>
                <p className="rounded bg-background p-3 font-mono text-sm italic mt-2">
                  &quot;Build this: [paste your PRD]. Run dev.&quot;
                </p>
              </div>
              <CommentaryBubble>
                You can use any screenshot - a design you like, a UI you saw online, or even something from Dribbble/Mobbin. Or describe what you want in a PRD of any length. Adding &quot;run dev&quot; tells Cursor to start the app so you can preview it right away.
              </CommentaryBubble>
            </Step>

            <Step number={8} title="Navigate to Project Folder (optional)">
              <p className="text-sm text-muted-foreground">
                Only needed if you&apos;re doing Step 9: move into the folder where the project was created so you can run the dev server from the terminal.
              </p>
              <CommandBlock command="cd [project-folder-name]" description="Replace with your actual project folder name" />
              <CommentaryBubble>
                The folder name is usually something like &apos;my-app&apos; or whatever you named it. You can see it in the terminal output or check your file explorer.
              </CommentaryBubble>
            </Step>

            <Step number={9} title="Start Development Server (if needed)">
              <p className="text-sm text-muted-foreground">
                If you didn&apos;t include &quot;run dev&quot; in your prompt at Step 7, open the terminal, go to your project folder, and start the development server yourself.
              </p>
              <CommandBlock command="cd [project-folder-name] && npm run dev" description="Navigate to your project folder, then start the dev server" />
              <CommentaryBubble>
                Now you can have fun! Experiment, try different things, and see what you can create. The development server will automatically reload when you make changes. Cursor will automatically provide you with a preview in the app. Before doing so, it will also provide you with a link like &apos;http://localhost:3000&apos; which you can open in your browser.
              </CommentaryBubble>
            </Step>
          </Section>

          {/* What's next */}
          <Section
            id="whats-next"
            title="What&apos;s next"
            description="Where we&apos;re headed"
          >
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                We&apos;re still exploring ways to share these prototypes outbound in a safe way. For now, think of them as your own little private sandboxes to play, test, and experiment.
              </p>
              <p>
                Another thing I&apos;m trying to figure out is how to best incorporate our design system. As shared in the following LLM podcast —{' '}
                <a
                  href="https://nestomortgage.slack.com/files/U08CEVC2LLE/F0AFUF1Q7LP/why_ai_hates_your_custom_design_system.m4a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  why AI hates your custom design system
                </a>
                {' '} — it&apos;s proving harder than expected to leverage our Storybook design system. I&apos;ll be on the lookout for options to smoothen this part of the process. 🚀
              </p>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div className="mt-16 border-t pt-8">
          <div className="mb-8 text-center text-sm text-muted-foreground">
            <p>Happy designing! 🎨</p>
            <p className="mt-2">Questions? Reach out to the me on Slack!</p>
          </div>
          <div className="mb-8 flex justify-center">
            <div
              data-us-project="l71XxmPotfcfVHJfkS76"
              style={{ width: "1440px", height: "900px", maxWidth: "100%" }}
            />
          </div>
          <div className="mt-6">
            <CommentaryBubble>
              You can try going on unicorn.studio, find any animation you like, click &apos;export &gt; embed&apos; and paste the code in Cursor to let it figure out the implementation!
            </CommentaryBubble>
          </div>
        </div>
      </div>
    </div>
  )
}
