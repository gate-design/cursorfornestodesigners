"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PlaygroundGallery } from "@/components/playground/playground-gallery"
import {
  PLAYGROUND_REPO_CLONE_URL,
  PLAYGROUND_REPO_WEB,
} from "@/lib/playground-repo"

export function PlaygroundPanel() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-4 text-center">
        <h1 className="text-4xl font-bold">Playground</h1>
        <p className="text-lg text-muted-foreground">
          A shared <strong className="font-medium text-foreground">canvas</strong> — nothing to memorize here. Use the{" "}
          <strong className="font-medium text-foreground">Git</strong> tab to learn clone, branch, commit, push, and PR; use this tab to see everyone&apos;s cards once they land in the repo. Pull and push there, watch this view update after merges and deploys.
        </p>
      </div>

      <Card className="mb-10 border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Repo</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            <a
              href={PLAYGROUND_REPO_WEB}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              {PLAYGROUND_REPO_WEB.replace("https://", "")}
            </a>
            {" · "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              git clone {PLAYGROUND_REPO_CLONE_URL}
            </code>
          </p>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Gallery</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cards listed here come from{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">components/playground/designer-cards-registry.tsx</code>
          . The Git guide explains how to add yours so it appears for the whole team.
        </p>
      </div>

      <PlaygroundGallery />
    </div>
  )
}
