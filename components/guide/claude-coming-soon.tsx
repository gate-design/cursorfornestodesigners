"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ClaudeComingSoon() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-4xl font-bold">Claude</h1>
        <p className="text-lg text-muted-foreground">
          A dedicated guide for working with Claude in your design workflow
        </p>
      </div>
      <Card className="border-dashed">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>Coming soon</CardTitle>
            <Badge variant="secondary">Planned</Badge>
          </div>
          <CardDescription>
            We&apos;re preparing material that matches the depth of the Cursor and Git guides. Check back here for prompts, workflows, and team conventions.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            In the meantime, everything in the Cursor and Git tabs still applies — most assistant-driven habits transfer across tools.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
