"use client"

import type { ComponentType } from "react"
import { MockProfileCard } from "@/components/playground/TemplateCard"
import { GateCard } from "./GateCard"
import { VeroCard } from "./VeroCard"

/**
 * Playground gallery — add your card here so it shows on the Playground tab for everyone.
 *
 * 1. Duplicate `TemplateCard.tsx` → `YourNameCard.tsx` and customize it (export your component).
 * 2. Import it below.
 * 3. Append `{ id: "short-id", label: "Your name", Component: YourNameCard }` to DESIGNER_CARDS.
 * 4. Commit, push, merge — the live site will list your card alongside the others.
 */

export type DesignerCardEntry = {
  id: string
  /** Optional caption above the card */
  label?: string
  Component: ComponentType
}

export const DESIGNER_CARDS: DesignerCardEntry[] = [
  {
    id: "example",
    label: "Example — swap this row for your card once yours is ready",
    Component: MockProfileCard,
  },
  {
    id: "gate",
    label: "Example — this is another example",
    Component: GateCard,
  },
  {
    id: "vero",
    label: "Vero Jobin",
    Component: VeroCard,
  },
  // import { YourNameCard } from "./YourNameCard"
  // { id: "your-name", label: "Your name", Component: YourNameCard },
]
