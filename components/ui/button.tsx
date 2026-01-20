"use client"

import type React from "react"

import Link from "next/link"
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react"

type ButtonKind = "primary" | "secondary" | "tertiary" | "ghost"
type ButtonSize = "small" | "medium" | "large"

interface CommonProps {
  kind?: ButtonKind
  size?: ButtonSize
  children: ReactNode
  className?: string
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, CommonProps {}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, CommonProps {
  href: string
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | ButtonLinkProps>(
  ({ kind = "primary", size = "medium", children, className = "", ...props }, ref) => {
    const baseClass = "button__root__ZxcvB"
    const kindClass = `button__kind-${kind}__R5j2s`
    const sizeClass = `button__size-${size}__L9d7h`

    const combinedClassName = `${baseClass} ${kindClass} ${sizeClass} ${className}`.trim()

    if ("href" in props) {
      return (
        <Link
          {...(props as ButtonLinkProps)}
          className={combinedClassName}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        >
          {children}
        </Link>
      )
    }

    return (
      <button
        {...(props as ButtonProps)}
        className={combinedClassName}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"
