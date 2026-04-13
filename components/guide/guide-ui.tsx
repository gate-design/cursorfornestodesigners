"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CopyIcon, CheckIcon } from "@phosphor-icons/react"
import { withBasePath } from "@/lib/base-path"
import { cn } from "@/lib/utils"

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={copyToClipboard}
      className={cn("h-6 w-6", className)}
      title="Copy to clipboard"
    >
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5 text-primary" />
      ) : (
        <CopyIcon className="h-3.5 w-3.5" />
      )}
    </Button>
  )
}

export function CommandBlock({ command, description }: { command: string; description?: string }) {
  return (
    <div className="group relative">
      <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3 font-mono text-sm">
        <code className="flex-1">{command}</code>
        <CopyButton text={command} />
      </div>
      {description && (
        <p className="mt-1.5 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

export function CommentaryBubble({ children, name = "You" }: { children: React.ReactNode; name?: string }) {
  const [imageError, setImageError] = React.useState(false)
  const avatarSrc = withBasePath("/avatar.png")

  return (
    <div className="flex gap-3">
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
        {!imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarSrc}
            alt={name}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </div>
      <div className="flex-1 rounded-lg border bg-muted/30 p-4">
        <div className="mb-1 text-xs font-medium text-muted-foreground">{name}</div>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

export function Section({
  title,
  description,
  children,
  id,
}: {
  title: string
  description?: string
  children: React.ReactNode
  id?: string
}) {
  return (
    <section id={id} className="scroll-mt-8 space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        {description && (
          <p className="mt-1 text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  )
}

export function Step({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {number}
        </div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="ml-11 space-y-3">{children}</div>
    </div>
  )
}

/** Marks placeholder content (links, org names, etc.) until details are provided. */
export function MissingInfoBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="destructive" className="align-middle">
      {children}
    </Badge>
  )
}
