"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on client-side theme detection
  useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  // Get the icon and tooltip text based on current theme
  const getThemeDetails = () => {
    if (!mounted) return { icon: null, tooltipText: "Change theme" }

    // For system theme, show the resolved theme icon (light/dark) but indicate it's system
    const isSystem = theme === "system"
    const effectiveTheme = isSystem ? resolvedTheme : theme
    const isDark = effectiveTheme === "dark"

    let tooltipText = `Switch to ${isSystem ? "light" : isDark ? "light" : "dark"}${isSystem ? " theme" : " mode"}`
    if (!isSystem && effectiveTheme === "light") tooltipText = "Switch to dark mode"
    if (!isSystem && effectiveTheme === "dark") tooltipText = "Use system theme"
    if (isSystem) tooltipText = "Switch to light mode"

    return {
      icon: isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M12 1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 21V23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M1 12H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M21 12H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      tooltipText,
      isSystem,
    }
  }

  const { icon, tooltipText, isSystem } = getThemeDetails()

  return (
    <TooltipProvider>
      <div className="theme__toggle__root__K8p6t">
        <Tooltip content={tooltipText} position="bottom">
          <button onClick={cycleTheme} className="theme__toggle__button__F9s2q">
            <span className="theme__toggle__icon__Z3m7r">
              {icon}
              {isSystem && (
                <span className="theme__toggle__system-indicator__P4j7s">
                  <span className="theme__toggle__system-dot__L8k3r"></span>
                </span>
              )}
            </span>
            <span className="theme__toggle__text__Q7p4s">Change theme</span>
          </button>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
