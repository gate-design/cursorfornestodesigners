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

export type TemplateCardProps = {
  name?: string
  role?: string
  bio?: string
  initials?: string
  className?: string
}

/**
 * Starter profile card — duplicate this file as `YourNameCard.tsx`, customize it,
 * then register it in `designer-cards-registry.tsx` so it appears in the Playground gallery.
 */
export function TemplateCard({
  name = "Your name",
  role = "Your role",
  bio = "A short line about how you collaborate with engineering — swap this for your voice.",
  initials = "YN",
  className,
}: TemplateCardProps) {
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
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary"
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

/** Example filled-in card — what yours might look like after you customize the template. */
export function MockProfileCard() {
  return (
    <TemplateCard
      name="Alex Morgan"
      role="Product design"
      initials="AM"
      bio="I pair with eng on Tailwind polish and use this repo to practice branches and PRs before touching production code."
    />
  )
}
