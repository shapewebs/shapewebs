"use client"

import { cn } from "@/lib/utils"
import type React from "react"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return <div className={cn("bento-grid__container", className)}>{children}</div>
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
}) => {
  return (
    <div className={cn("bento-grid-item__root", className)}>
      {header}
      <div className="bento-grid-item__content">
        {icon}
        <div className="bento-grid-item__title">{title}</div>
        <div className="bento-grid-item__description">{description}</div>
      </div>
    </div>
  )
}
