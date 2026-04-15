"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function DesignSystemComingSoon() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="font-mono text-4xl font-bold tracking-tight">Design system</h1>
        <p className="text-lg text-muted-foreground">
          Tokens, components, and how we keep product UI consistent
        </p>
      </div>
      <Card className="border-dashed">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>Coming soon</CardTitle>
            <Badge variant="secondary">Planned</Badge>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
