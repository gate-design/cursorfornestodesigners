"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type GateCardProps = {
  name?: string
  role?: string
  bio?: string
  initials?: string
  className?: string
}

/**
 * Starter profile card — duplicate this file as `YourNameCard.tsx` and customize.
 * Used in the Playground tab and referenced from the Git guide.
 */
export function GateCard({
  name = "GateGaetano",
  role = "👴🏾 Designer",
  bio = "Likes to build things, and likes turtles",
  initials = "GG",
  className,
}: GateCardProps) {
  return (
    <Card
      size="sm"
      className={cn(
        "max-w-sm border-primary/15 bg-gradient-to-br from-card to-muted/30 ring-primary/10",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start gap-3 border-b border-border/60 pb-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none bg-primary/15 text-sm font-semibold text-primary"
          aria-hidden
        >
          {initials.slice(0, 3)}
        </div>
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="text-base">{name}</CardTitle>
            <Badge variant="secondary" className="font-normal">
              {role}
            </Badge>
          </div>
          <CardDescription className="text-xs">Designer playground · gate-design</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-3">
        <p className="text-sm leading-relaxed text-muted-foreground">{bio}</p>
      </CardContent>
    </Card>
  )
}

