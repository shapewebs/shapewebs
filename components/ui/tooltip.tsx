"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"

interface TooltipProps {
  content: string | ReactNode
  position?: "top" | "bottom" | "left" | "right"
  children: ReactNode
  delay?: number
  className?: string
}

export function Tooltip({ content, position = "top", children, delay = 300, className = "" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const targetRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const updateTooltipPosition = () => {
    if (targetRef.current && tooltipRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()

      let top = 0
      let left = 0

      // Calculate position based on the viewport position of the target
      switch (position) {
        case "top":
          top = targetRect.top - tooltipRect.height - 4
          left = targetRect.left + (targetRect.width - tooltipRect.width) / 2
          break
        case "bottom":
          top = targetRect.bottom + 4
          left = targetRect.left + (targetRect.width - tooltipRect.width) / 2
          break
        case "left":
          top = targetRect.top + (targetRect.height - tooltipRect.height) / 2
          left = targetRect.left - tooltipRect.width - 4
          break
        case "right":
          top = targetRect.top + (targetRect.height - tooltipRect.height) / 2
          left = targetRect.right + 4
          break
      }

      // Ensure tooltip stays within viewport
      if (left < 10) left = 10
      if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10
      }

      if (top < 10) top = 10
      if (top + tooltipRect.height > window.innerHeight - 10) {
        top = window.innerHeight - tooltipRect.height - 10
      }

      setCoords({ top, left })
    }
  }

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
      // Update position after setting visible to ensure tooltip has rendered
      setTimeout(updateTooltipPosition, 0)
    }, delay)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsVisible(false)
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Update position when window is resized
  useEffect(() => {
    if (isVisible) {
      window.addEventListener("resize", updateTooltipPosition)
      window.addEventListener("scroll", updateTooltipPosition, true)
    }

    return () => {
      window.removeEventListener("resize", updateTooltipPosition)
      window.removeEventListener("scroll", updateTooltipPosition, true)
    }
  }, [isVisible])

  return (
    <>
      <div
        className="tooltip__wrapper__P7j3s"
        ref={targetRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>

      {mounted &&
        createPortal(
          <div
            className={`tooltip__container__L5k8q tooltip__position-${position}__Z9j4r ${isVisible ? "tooltip__visible__B3m7p" : ""}`}
            ref={tooltipRef}
            role="tooltip"
            aria-hidden={!isVisible}
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
          >
            <div className={`tooltip__content__Q7p3s ${className}`}>{content}</div>
          </div>,
          document.body,
        )}
    </>
  )
}

export const TooltipRoot = Tooltip
export const TooltipTrigger = ({ children }: { children: ReactNode }) => <>{children}</>
export const TooltipContent = ({ children }: { children: ReactNode }) => <>{children}</>
export const TooltipProvider = ({ children }: { children: ReactNode }) => <>{children}</>
