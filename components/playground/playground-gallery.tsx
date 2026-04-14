"use client"

import { DESIGNER_CARDS } from "@/components/playground/designer-cards-registry"

export function PlaygroundGallery() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {DESIGNER_CARDS.map(({ id, label, Component }) => (
        <div key={id} className="flex flex-col gap-2">
          {label && (
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
          )}
          <div className="flex justify-center rounded-none border border-border/80 bg-muted/15 p-6">
            <Component />
          </div>
        </div>
      ))}
    </div>
  )
}
