"use client"

import * as React from "react"
import { BookOpen, CirclesFour, GitBranch, Palette, Sparkle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CursorGuide } from "@/components/guide/cursor-guide"
import { GitGuide } from "@/components/guide/git-guide"
import { ClaudeComingSoon } from "@/components/guide/claude-coming-soon"
import { DesignSystemComingSoon } from "@/components/guide/design-system-coming-soon"
import { PlaygroundPanel } from "@/components/guide/playground-panel"

type GuideTab = "cursor" | "git" | "playground" | "design-system" | "claude"

const tabs: {
  id: GuideTab
  label: string
  icon: React.ComponentType<{ className?: string }>
  comingSoon?: boolean
}[] = [
  { id: "cursor", label: "Cursor", icon: BookOpen },
  { id: "git", label: "Git", icon: GitBranch },
  { id: "playground", label: "Playground", icon: CirclesFour },
  {
    id: "design-system",
    label: "Design system",
    icon: Palette,
    comingSoon: true,
  },
  { id: "claude", label: "Claude", icon: Sparkle, comingSoon: true },
]

export default function Page() {
  const [tab, setTab] = React.useState<GuideTab>("cursor")

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside
          className={cn(
            "shrink-0 border-border bg-sidebar",
            "border-b md:w-56 md:border-b-0 md:border-r",
            "md:sticky md:top-0 md:h-screen md:self-start"
          )}
        >
          <div className="flex flex-col gap-1 p-3 md:flex-1 md:p-4">
            <div className="mb-2 hidden px-1 md:block">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Guides
              </p>
              <p className="text-sm font-semibold leading-tight">Nesto Designers</p>
            </div>
            <nav
              className="grid grid-cols-2 gap-1 sm:grid-cols-4 md:flex md:flex-col md:gap-1"
              aria-label="Guide sections"
            >
              {tabs.map(({ id, label, icon: Icon, comingSoon }) => {
                const isActive = tab === id
                return (
                  <Button
                    key={id}
                    type="button"
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "justify-center gap-2 md:justify-start",
                      "min-h-10 md:flex-none"
                    )}
                    onClick={() => setTab(id)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    <span className="truncate">{label}</span>
                    {comingSoon && (
                      <span className="max-w-[5.5rem] truncate text-[10px] font-medium leading-tight text-muted-foreground sm:max-w-none md:ml-auto">
                        (soon™)
                      </span>
                    )}
                  </Button>
                )
              })}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {tab === "cursor" && <CursorGuide />}
          {tab === "git" && <GitGuide />}
          {tab === "playground" && <PlaygroundPanel />}
          {tab === "design-system" && <DesignSystemComingSoon />}
          {tab === "claude" && <ClaudeComingSoon />}
        </main>
      </div>
    </div>
  )
}
