"use client"

import * as React from "react"
import { BookOpen, CirclesFour, GitBranch, ListChecks, Sparkle, Tag } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CursorGuide } from "@/components/guide/cursor-guide"
import { GitGuide } from "@/components/guide/git-guide"
import { ClaudeDesignGuide } from "@/components/guide/claude-design-guide"
import { ComponentsGuide } from "@/components/guide/components-guide"
import { ComponentAcGuide } from "@/components/guide/component-ac-guide"
import { PlaygroundPanel } from "@/components/guide/playground-panel"

type GuideTab = "cursor" | "git" | "playground" | "claude" | "components" | "component-ac"

const tabs: {
  id: GuideTab
  label: string
  icon: React.ComponentType<{ className?: string }>
  comingSoon?: boolean
}[] = [
  { id: "cursor", label: "Cursor", icon: BookOpen },
  { id: "git", label: "Git", icon: GitBranch },
  { id: "playground", label: "Playground", icon: CirclesFour },
  { id: "claude", label: "Claude Design", icon: Sparkle },
  { id: "components", label: "Jira Components", icon: Tag },
  { id: "component-ac", label: "Component ACs", icon: ListChecks },
]

const TAB_IDS = tabs.map((t) => t.id) as string[]

/**
 * The tab named by the URL hash, or null.
 * Returns null for in-page anchors like `#ac-install` so the TOC links inside a
 * guide keep working — an unrecognised hash must leave the current tab alone.
 */
function tabFromHash(): GuideTab | null {
  if (typeof window === "undefined") return null
  const hash = window.location.hash.replace(/^#/, "")
  return TAB_IDS.includes(hash) ? (hash as GuideTab) : null
}

export default function Page() {
  const [tab, setTab] = React.useState<GuideTab>("cursor")

  // Deep links (`…/#component-ac`) and back/forward. The hash isn't readable
  // during a static export, so this runs after mount.
  React.useEffect(() => {
    const applyHash = () => {
      const fromHash = tabFromHash()
      if (fromHash) setTab(fromHash)
    }
    applyHash()
    window.addEventListener("hashchange", applyHash)
    window.addEventListener("popstate", applyHash)
    return () => {
      window.removeEventListener("hashchange", applyHash)
      window.removeEventListener("popstate", applyHash)
    }
  }, [])

  const selectTab = React.useCallback((id: GuideTab) => {
    setTab(id)
    if (window.location.hash.replace(/^#/, "") !== id) {
      // pushState rather than assigning location.hash: no scroll jump, and it
      // doesn't re-fire hashchange for a tab we've already switched to.
      window.history.pushState(null, "", `#${id}`)
    }
  }, [])

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
              <p className="text-sm font-semibold leading-tight">Design guide repo</p>
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
                    onClick={() => selectTab(id)}
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
          {tab === "claude" && <ClaudeDesignGuide />}
          {tab === "components" && <ComponentsGuide />}
          {tab === "component-ac" && <ComponentAcGuide />}
        </main>
      </div>
    </div>
  )
}
