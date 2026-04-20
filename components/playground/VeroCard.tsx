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

export type VeroCardProps = {
  name?: string
  role?: string
  bio?: string
  initials?: string
  className?: string
}

/** Vero's playground card — registered in `designer-cards-registry.tsx`. */
export function VeroCard({
  name = "Vero Jobin",
  role = "Designer",
  bio = "And in the end, the love you take is equal to the love you make...",
  initials = "VJ",
  className,
}: VeroCardProps) {
  return (
    <Card
      size="sm"
      className={cn(
        "max-w-sm rounded-sm border-primary/15 bg-primary/4 from-card to-muted/30 ring-primary/10",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start gap-3 border-b border-border/60 pb-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-primary/15 text-sm font-semibold text-primary"
          aria-hidden
        >
          {initials.slice(0, 3)}
        </div>
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="text-base">{name}</CardTitle>
            <Badge variant="default" className="font-normal rounded-[4px]">
              {role}
            </Badge>
          </div>
          <CardDescription className="text-xs">Designer playground</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-3">
        <p className="text-sm leading-relaxed text-muted-foreground">{bio}</p>
      </CardContent>
    </Card>
  )
}

