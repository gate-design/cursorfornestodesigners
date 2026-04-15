"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ClaudeComingSoon() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="font-mono text-4xl font-bold tracking-tight">Claude</h1>
        <p className="text-lg text-muted-foreground">
          A dedicated guide for working with Claude in your design workflow
        </p>
      </div>
      <Card className="border-dashed">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>Coming soon</CardTitle>
            <Badge variant="secondary">Planned</Badge>
            <span className="text-lg leading-none" aria-hidden="true">
              💬 🤖 ✨ 📝 🎭 💡 🌟 🔮 📎 🪄
            </span>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
