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

// Path Block Component (for UI navigation paths without copy button)
function PathBlock({ path, description }: { path: string; description?: string }) {
  return (
    <div className="space-y-1.5">
      <div className="rounded-lg border bg-muted/50 p-3">
        <code className="text-sm">{path}</code>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

// Chat Bubble Component for Personal Commentary
function CommentaryBubble({ children, name = "You" }: { children: React.ReactNode; name?: string }) {
  const [imageError, setImageError] = React.useState(false)

  return (
    <div className="flex gap-3">
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
        {!imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/avatar.png"
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
        window.UnicornStudio = { isInitialized: false }
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
            Learn how to use Cursor to reproduce app screens with high fidelity using our front-end library
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
            <a href="#github-setup" className="block text-sm text-primary hover:underline">
              1. GitHub Setup
            </a>
            <a href="#project-downloads" className="block text-sm text-primary hover:underline">
              2. Project File Downloads
            </a>
            <a href="#cursor-setup" className="block text-sm text-primary hover:underline">
              3. Cursor IDE Setup
            </a>
            <a href="#workspace-config" className="block text-sm text-primary hover:underline">
              4. Workspace Configuration
            </a>
            <a href="#terminal-operations" className="block text-sm text-primary hover:underline">
              5. Terminal Operations
            </a>
            <a href="#project-init" className="block text-sm text-primary hover:underline">
              6. Project Initialization
            </a>
            <a href="#design-implementation" className="block text-sm text-primary hover:underline">
              7. Design Implementation
            </a>
            <a href="#personal-setup" className="block text-sm text-primary hover:underline">
              8. Personal Setup (Simpler Alternative)
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

                  {/* Yarn */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">2. Yarn</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Version:</strong> Version &gt;= 1.19.1 (recommended: 1.22.18)
                      </p>
                      <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                        <li>Install:</li>
                      </ul>
                      <div className="ml-4 mt-2 mb-2 space-y-3">
                        <CommandBlock command="npm install -g yarn@1.22.18" />
                        <CommentaryBubble>
                          This command installs Yarn on your computer. The &quot;-g&quot; means it installs globally (available everywhere on your computer, not just in one folder). Copy the command, paste it in your terminal, press Enter, and wait for it to finish. You might see some text scrolling by - that&apos;s normal! It&apos;s downloading and setting things up.
                        </CommentaryBubble>
                      </div>
                      <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                        <li>Verify:</li>
                      </ul>
                      <div className="ml-4 mt-2 mb-2 space-y-3">
                        <CommandBlock command="yarn --version" />
                        <CommentaryBubble>
                          After installing, use this to check if Yarn is ready to use. Copy, paste, Enter - just like before! If you see a version number, you&apos;re all set.
                        </CommentaryBubble>
                      </div>
                      <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                        <li>
                          <strong>Note:</strong> The <code className="rounded bg-muted px-1.5 py-0.5 text-xs">fe-shared-master</code> monorepo requires Yarn (not npm)
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Git */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">3. Git (if cloning from GitHub)</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      <CommentaryBubble>
                        Git is a version control system - think of it like a time machine for your code! It lets you download code from GitHub (like our component library), track changes, and work with others. You&apos;ll need it to &quot;clone&quot; (download) the fe-shared repository from GitHub.
                      </CommentaryBubble>
                      <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                        <li>
                          Download from{' '}
                          <a
                            href="https://git-scm.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            git-scm.com
                          </a>
                        </li>
                        <li>Verify:</li>
                      </ul>
                      <div className="ml-4 mt-2 space-y-3">
                        <CommandBlock command="git --version" />
                        <CommentaryBubble>
                          Same routine: copy this command, paste it in your terminal, press Enter. If Git is installed, you&apos;ll see a version number. Easy peasy!
                        </CommentaryBubble>
                      </div>
                    </div>
                  </div>

                  {/* Cursor IDE */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">4. Cursor IDE</span>
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

          {/* Section 1: GitHub Setup */}
          <Section
            id="github-setup"
            title="1. GitHub Setup"
            description="Configure your GitHub token to access private packages"
          >
            <Step number={1} title="Navigate to GitHub Settings">
              <p className="text-sm text-muted-foreground">
                Go to your GitHub profile settings to configure access tokens.
              </p>
              <div className="space-y-2">
                <p className="text-sm font-medium">Path to follow:</p>
                <p className="text-sm text-muted-foreground">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                    Github/Profile (upper right) → Settings → Developer Settings
                  </code>
                </p>
              </div>
              <CommentaryBubble>
                Make sure you have a token authorized for 'nestoca'. This is crucial for accessing our private packages.
              </CommentaryBubble>
            </Step>

            <Step number={2} title="Configure Token Permissions">
              <p className="text-sm text-muted-foreground">
                Click on your existing token and ensure it has the correct permissions.
              </p>
              <div className="space-y-2">
                <p className="text-sm font-medium">Required permission:</p>
                <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    className="h-4 w-4 rounded border-primary text-primary"
                  />
                  <label className="text-sm">read:packages</label>
                </div>
              </div>
              <CommentaryBubble>
                After checking 'read:packages', don't forget to update the token. This ensures the changes take effect immediately.
              </CommentaryBubble>
            </Step>
          </Section>

          <Separator />

          {/* Section 2: Project Downloads */}
          <Section
            id="project-downloads"
            title="2. Project File Downloads"
            description="Download the necessary project files to your computer"
          >
            <Step number={1} title="Download Project Starter">
              <p className="text-sm text-muted-foreground">
                Download the 'Project Starter' folder and place it in your computer's home folder.
              </p>
              <div className="space-y-2">
                <a
                  href="/project-starter.zip"
                  download
                  className="inline-flex items-center gap-2 rounded-lg border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Download Project Starter
                  <span className="text-xs">↓</span>
                </a>
              </div>
              <CommentaryBubble>
                The home folder is typically <code className="rounded bg-muted px-1.5 py-0.5 text-xs">~/</code> on Mac/Linux or <code className="rounded bg-muted px-1.5 py-0.5 text-xs">C:\Users\YourUsername\</code> on Windows. This keeps everything organized and easy to find.
              </CommentaryBubble>
            </Step>

            <Step number={2} title="Download Front-End Shared Library">
              <p className="text-sm text-muted-foreground">
                Download{' '}
                <a
                  href="https://github.com/nestoca/fe-shared"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  'fe-shared-master'
                </a>{' '}
                and also place it in your computer's home folder.
              </p>
              <CommentaryBubble>
                This is our shared component library. Having it in the home folder makes it easy to reference across different projects. You can clone it from the GitHub repository linked above.
              </CommentaryBubble>
            </Step>
          </Section>

          <Separator />

          {/* Section 3: Cursor Setup */}
          <Section
            id="cursor-setup"
            title="3. Cursor IDE Setup"
            description="Configure Cursor IDE for optimal workflow"
          >
            <Step number={1} title="Open Project Starter in Cursor">
              <p className="text-sm text-muted-foreground">
                Open Cursor and navigate to open the 'Project Starter' folder.
              </p>
              <PathBlock path="File → Open Folder → Select 'Project Starter'" />
            </Step>

            <Step number={2} title="Enable Cursor Features">
              <p className="text-sm text-muted-foreground">
                Click the gear icon in the upper-right corner of the app and ensure all features are enabled.
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
                Having all these features enabled gives you the full power of Cursor's AI capabilities. The Agents feature is particularly powerful for complex tasks!
              </CommentaryBubble>
            </Step>
          </Section>

          <Separator />

          {/* Section 4: Workspace Configuration */}
          <Section
            id="workspace-config"
            title="4. Workspace Configuration"
            description="Set up your workspace with multiple folders"
          >
            <Step number={1} title="Add Front-End Library to Workspace">
              <p className="text-sm text-muted-foreground">
                Add the{' '}
                <a
                  href="https://github.com/nestoca/fe-shared"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  'fe-shared-master'
                </a>{' '}
                folder to your workspace.
              </p>
              <PathBlock path="File → Add Folder to Workspace → Select 'fe-shared-master' from root" />
              <CommentaryBubble>
                This allows you to easily navigate between your project and the shared library components. Very handy when you need to check how a component is implemented! Make sure you've cloned the repository from GitHub first.
              </CommentaryBubble>
            </Step>

            <Step number={2} title="Save Workspace (Optional)">
              <p className="text-sm text-muted-foreground">
                Optionally save your workspace configuration for future use.
              </p>
              <PathBlock path="File → Save Workspace as..." />
            </Step>

            <Step number={3} title="Verify Workspace Setup">
              <p className="text-sm text-muted-foreground">
                Confirm that both folders are visible in the Sidebar.
              </p>
              <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">📁</span>
                  <a
                    href="#project-downloads"
                    className="text-primary hover:underline"
                  >
                    Project Starter
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">📁</span>
                  <a
                    href="https://github.com/nestoca/fe-shared"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    fe-shared-master
                  </a>
                </div>
              </div>
            </Step>
          </Section>

          <Separator />

          {/* Section 5: Terminal Operations */}
          <Section
            id="terminal-operations"
            title="5. Terminal Operations"
            description="Install dependencies and build the front-end library"
          >
            <Step number={1} title="Open Terminal">
              <p className="text-sm text-muted-foreground">
                Make the Cursor Terminal visible.
              </p>
              <PathBlock path="View → Terminal" />
            </Step>

            <Step number={2} title="Navigate to Front-End Library">
              <p className="text-sm text-muted-foreground">
                Change directory to the front-end shared library.
              </p>
              <CommandBlock command="cd ../fe-shared-master" description="Moves from Project Starter to fe-shared-master" />
            </Step>

            <Step number={3} title="Install Dependencies">
              <p className="text-sm text-muted-foreground">
                Install all dependencies at the monorepo root.
              </p>
              <CommandBlock command="yarn install" description="Installs all package dependencies" />
              <CommentaryBubble>
                This might take a few minutes depending on your internet connection. Grab a coffee! ☕
              </CommentaryBubble>
            </Step>

            <Step number={4} title="Build UI Package">
              <p className="text-sm text-muted-foreground">
                Build the design system package so it's ready to use.
              </p>
              <CommandBlock command="yarn build:design" description="Builds the UI component library" />
              <CommentaryBubble>
                This compiles all the components and makes them available for import in your projects. You'll need to run this whenever the library is updated.
              </CommentaryBubble>
            </Step>
          </Section>

          <Separator />

          {/* Section 6: Project Initialization */}
          <Section
            id="project-init"
            title="6. Project Initialization"
            description="Set up your React + TypeScript + Vite project"
          >
            <Step number={1} title="Use Cursor Agent Mode">
              <p className="text-sm text-muted-foreground">
                Open Cursor chat in Agent mode and request project setup.
              </p>
              <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                <p className="text-sm font-medium">Ask Cursor:</p>
                <p className="rounded bg-background p-3 font-mono text-sm italic">
                  "Set up a React + TypeScript + Vite project from scratch."
                </p>
              </div>
              <CommentaryBubble>
                Agent mode is powerful! It can create entire project structures for you. Just sit back and watch the magic happen.
              </CommentaryBubble>
            </Step>

            <Step number={2} title="Navigate to Project Directory">
              <p className="text-sm text-muted-foreground">
                Move back to your project directory (adjust path if needed).
              </p>
              <CommandBlock command="cd ../NeueTemplate" description="Or whatever your project folder is named" />
            </Step>

            <Step number={3} title="Install Project Dependencies">
              <p className="text-sm text-muted-foreground">
                Install all remaining dependencies for your project.
              </p>
              <CommandBlock command="npm install" description="Installs project-specific dependencies" />
            </Step>

            <Step number={4} title="Start Development Server">
              <p className="text-sm text-muted-foreground">
                Launch the development server and verify everything works.
              </p>
              <CommandBlock command="npm run dev" description="Starts the Vite development server" />
              <CommentaryBubble>
                You should see "Welcome to React + TypeScript + Vite - Your project is ready to go!" in your browser. If you see this, you're all set! 🎉
              </CommentaryBubble>
            </Step>
          </Section>

          <Separator />

          {/* Section 7: Design Implementation */}
          <Section
            id="design-implementation"
            title="7. Design Implementation"
            description="Reproduce Figma designs with high fidelity"
          >
            <Step number={1} title="Explore Available Components">
              <p className="text-sm text-muted-foreground">
                First, familiarize yourself with what's available in the library.
              </p>
              <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                <p className="text-sm font-medium">Ask Cursor in Ask mode:</p>
                <p className="rounded bg-background p-3 font-mono text-sm italic">
                  "Can you describe which components, styles, fonts and icons can be leveraged or used in this project?"
                </p>
              </div>
              <CommentaryBubble>
                This helps you understand what's already built and what you can use. No need to reinvent the wheel!
              </CommentaryBubble>
            </Step>

            <Step number={2} title="Check Default Styling">
              <p className="text-sm text-muted-foreground">
                Verify the default styling of components.
              </p>
              <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                <p className="text-sm font-medium">Ask Cursor:</p>
                <p className="rounded bg-background p-3 font-mono text-sm italic">
                  "What is the default styling of a primary button?"
                </p>
              </div>
              <CommentaryBubble>
                This confirms your setup is working and introduces you to Ask mode. It's great for quick questions!
              </CommentaryBubble>
            </Step>

            <Step number={3} title="Implement Figma Design">
              <p className="text-sm text-muted-foreground">
                Provide Cursor with a Figma design URL to implement.
              </p>
              <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                <p className="text-sm font-medium">Ask Cursor in Ask mode:</p>
                <p className="rounded bg-background p-3 font-mono text-sm italic break-all">
                  "Implement this design from Figma."<br />
                  <span className="text-muted-foreground">
                    https://www.figma.com/design/RBTP1VHx1D0XRUetkabJXe/PIM---Product-Info-Management?node-id=9758-66352&m=dev
                  </span>
                </p>
              </div>
              <CommentaryBubble>
                Cursor will analyze the Figma design and implement it using only components from your React library. The result should be a close match with no overrides needed!
              </CommentaryBubble>
            </Step>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm font-medium text-primary">💡 Pro Tip</p>
              <p className="mt-2 text-sm text-muted-foreground">
                If you need to provide screenshots to make the experience easier to follow, let me know! I can add image placeholders or instructions for where to add them.
              </p>
            </div>
          </Section>

          <Separator />

          {/* Section 8: Personal Setup (Simpler Alternative) */}
          <Section
            id="personal-setup"
            title="8. Personal Setup (Simpler Alternative)"
            description="A simpler way to get started for personal projects and experimentation"
          >
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mb-6">
              <p className="text-sm font-medium text-primary">🎨 For Your Own Projects</p>
              <p className="mt-2 text-sm text-muted-foreground">
                This section is perfect if you want to experiment on your own or work on personal projects. It's much simpler and uses shadcn/ui, a popular open-source component library.
              </p>
            </div>

            <Step number={1} title="Customize Your Design System">
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

            <Step number={2} title="Create Your Project">
              <p className="text-sm text-muted-foreground">
                Click the 'Create Project' button on the shadcn/ui page.
              </p>
              <CommentaryBubble>
                This will generate a command that sets up a Next.js project with all the components pre-configured. Pretty neat!
              </CommentaryBubble>
            </Step>

            <Step number={3} title="Copy the npm Command">
              <p className="text-sm text-muted-foreground">
                Click on the 'npm' tab and copy the command that appears.
              </p>
              <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                <p className="text-sm font-medium">Example command (yours will be different):</p>
                <CommandBlock command="npx shadcn@latest init -d" />
              </div>
            </Step>

            <Step number={4} title="Run the Command in Cursor Terminal">
              <p className="text-sm text-muted-foreground">
                Open Cursor's terminal and paste the command you copied.
              </p>
              <CommandBlock command="npx shadcn@latest init -d" description="Your actual command will be different based on your customization" />
              <CommentaryBubble>
                This creates a new project with all the shadcn/ui components ready to go. The project will be created in a new folder.
              </CommentaryBubble>
            </Step>

            <Step number={5} title="Ask Cursor to Reproduce a Screenshot">
              <p className="text-sm text-muted-foreground">
                Provide Cursor with a screenshot you want to reproduce.
              </p>
              <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                <p className="text-sm font-medium">Ask Cursor:</p>
                <p className="rounded bg-background p-3 font-mono text-sm italic">
                  "Reproduce this screenshot" [attach your screenshot]
                </p>
              </div>
              <CommentaryBubble>
                You can use any screenshot - a design you like, a UI you saw online, or even something from Dribbble/Mobbin. Cursor will do its best to recreate it!
              </CommentaryBubble>
            </Step>

            <Step number={6} title="Navigate to Project Folder">
              <p className="text-sm text-muted-foreground">
                Move into the folder where the project was created.
              </p>
              <CommandBlock command="cd [project-folder-name]" description="Replace with your actual project folder name" />
              <CommentaryBubble>
                The folder name is usually something like 'my-app' or whatever you named it. You can see it in the terminal output or check your file explorer.
              </CommentaryBubble>
            </Step>

            <Step number={7} title="Install Dependencies">
              <p className="text-sm text-muted-foreground">
                Install all the project dependencies.
              </p>
              <CommandBlock command="npm install" description="Installs all required packages" />
            </Step>

            <Step number={8} title="Start Development Server">
              <p className="text-sm text-muted-foreground">
                Launch the development server and start experimenting!
              </p>
              <CommandBlock command="npm run dev" description="Starts the Next.js development server" />
              <CommentaryBubble>
                Now you can have fun! Experiment, try different things, and see what you can create. The development server will automatically reload when you make changes. Cursor will automatically provide you with a preview in the app. Before doing so, it will also provide you with a link like 'http://localhost:3000' which you can open in your browser.
              </CommentaryBubble>
            </Step>
          </Section>
        </div>

        {/* Footer */}
        <div className="mt-16 border-t pt-8">
          <div className="mb-8 flex justify-center">
            <div
              data-us-project="l71XxmPotfcfVHJfkS76"
              style={{ width: "1440px", height: "900px", maxWidth: "100%" }}
            />
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>Happy designing! 🎨</p>
            <p className="mt-2">Questions? Reach out to the me on Slack!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
