"use client"

import type React from "react"

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, useMemo } from "react"
import { createPortal } from "react-dom"
import "@/styles/components/search-popup.css"
import { useTheme } from "next-themes"

interface SearchItem {
  id: string
  title: string
  description: string
  iconType: string
  shortcut?: string
  action?: () => void
  path?: string
  type: "recent" | "command" | "page" | "docs" | "theme"
  collaborators?: string[]
  timestamp?: number
  content?: string
}

export interface SearchPageData {
  id: string
  title: string
  description: string
  path: string
  iconType: string
}

/**
 * Only maintain metadata here.
 * Actual searchable content is fetched from /api/search-index
 */
export const searchablePages: SearchPageData[] = [
  { id: "home", title: "Home", description: "Main landing page and overview", path: "/", iconType: "home" },
  { id: "pricing", title: "Pricing", description: "View our pricing plans and features", path: "/pricing", iconType: "pricing" },
  { id: "contact", title: "Contact", description: "Get in touch with our team", path: "/contact", iconType: "message" },
  { id: "docs", title: "Documentation", description: "Technical guides and documentation", path: "/docs", iconType: "docs" },
]

const themeOptions: SearchItem[] = [
  {
    id: "theme1",
    title: "Light Theme",
    description: "Switch to light mode",
    iconType: "light-theme",
    type: "theme",
    action: () => { },
    content: "Light mode bright white theme day mode light appearance light color scheme",
  },
  {
    id: "theme2",
    title: "Dark Theme",
    description: "Switch to dark mode",
    iconType: "dark-theme",
    type: "theme",
    action: () => { },
    content: "Dark mode night theme black dark appearance dark color scheme",
  },
  {
    id: "theme3",
    title: "System Theme",
    description: "Use your system preferences",
    iconType: "system-theme",
    type: "theme",
    action: () => { },
    content: "System theme automatic mode follow device settings system appearance system color scheme",
  },
]

interface SearchPopupProps {
  isOpen: boolean
  onClose: () => void
}

// Function to render icon based on iconType (unchanged)
const renderIcon = (iconType: string) => {
  switch (iconType) {
    case "tag":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 7H7.01M7 3H12L21 12L12 21H3V12V3H7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "assign":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      )
    case "message":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H15L12 19L9 16Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "company":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 21H21M3 7V17M21 7V17M6 7H8M6 11H8M6 15H8M16 7H18M16 11H18M16 15H18M12 7H12.01M12 11H12.01M12 15H12.01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "docs":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "home":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "pricing":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6C14 7.10457 13.1046 8 12 8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18C14 19.1046 13.1046 20 12 20Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12C20 13.1046 19.1046 14 18 14Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12C8 13.1046 7.10457 14 6 14Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M15 6.5L17.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17.5 14.5L15 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 17.5L6.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.5 9.5L9 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "light-theme":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 21V23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M1 12H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M21 12H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case "dark-theme":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "system-theme":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2 9C2 6.79086 3.79086 5 6 5H18C20.2091 5 22 6.79086 22 9V15C22 17.2091 20.2091 19 18 19H6C3.79086 19 2 17.2091 2 15V9Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
  }
}

const highlightMatch = (text: string, query: string) => {
  if (!query.trim()) return text
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const regex = new RegExp(`(${escapedQuery})`, "gi")
  const parts = text.split(regex)

  return parts.map((part, i) => {
    if (part.toLowerCase() === query.toLowerCase()) {
      return (
        <span key={i} className="search-popup__highlight__H7j3s">
          {part}
        </span>
      )
    }
    return part
  })
}

// ✅ Context now operates on a SINGLE ELEMENT BLOCK string
const extractContext = (text: string, query: string, contextLength = 50) => {
  if (!text || !query.trim()) return ""

  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const index = lowerText.indexOf(lowerQuery)
  if (index === -1) return ""

  let start = Math.max(0, index - contextLength)
  let end = Math.min(text.length, index + query.length + contextLength)

  if (start > 0) {
    const spaceBeforeStart = text.lastIndexOf(" ", start)
    if (spaceBeforeStart !== -1) start = spaceBeforeStart + 1
  }

  if (end < text.length) {
    const spaceAfterEnd = text.indexOf(" ", end)
    if (spaceAfterEnd !== -1) end = spaceAfterEnd
  }

  let result = text.substring(start, end)
  if (start > 0) result = "..." + result
  if (end < text.length) result = result + "..."
  return result
}

type ApiSearchIndexResponse = {
  entries: { path: string; blocks: string[] }[]
  cached?: boolean
  error?: string
}

export function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const [mounted, setMounted] = useState(false)
  const [animatingOut, setAnimatingOut] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [recentSearchItems, setRecentSearchItems] = useState<SearchItem[]>([])
  const [keyboardNavActive, setKeyboardNavActive] = useState(false)

  // ✅ page blocks (element-level)
  const [pageBlocksByPath, setPageBlocksByPath] = useState<Record<string, string[]>>({})

  const { setTheme } = useTheme()

  const inputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const selectedItemRef = useRef<HTMLDivElement>(null)

  // Build pages list with content injected (joined blocks for matching)
  const pages: SearchItem[] = useMemo(() => {
    return searchablePages.map((page) => {
      const blocks = pageBlocksByPath[page.path] ?? []
      return {
        id: page.id,
        title: page.title,
        description: page.description,
        iconType: page.iconType,
        path: page.path,
        type: "page" as const,
        content: blocks.join("\n"),
      }
    })
  }, [pageBlocksByPath])

  // Load recent searches from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedSearches = localStorage.getItem("recentSearches")
        if (storedSearches) {
          const parsedSearches = JSON.parse(storedSearches) as SearchItem[]
          const sortedSearches = parsedSearches.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).slice(0, 3)
          setRecentSearchItems(sortedSearches)
        }
      } catch (error) {
        console.error("Error loading recent searches:", error)
      }
    }
  }, [])

  // Fetch blocks when popup opens
  useEffect(() => {
    if (!isOpen) return

    let cancelled = false

      ; (async () => {
        try {
          const res = await fetch("/api/search-index")
          const data = (await res.json()) as ApiSearchIndexResponse

          if (cancelled) return
          if (!res.ok || data.error) {
            console.error("Search index error:", data.error || res.statusText)
            return
          }

          const map: Record<string, string[]> = {}
          for (const entry of data.entries) {
            map[entry.path] = entry.blocks
          }
          setPageBlocksByPath(map)
        } catch (err) {
          if (!cancelled) console.error("Failed to load search index:", err)
        }
      })()

    return () => {
      cancelled = true
    }
  }, [isOpen])

  const addToRecentSearches = (item: SearchItem) => {
    const itemWithTimestamp = { ...item, timestamp: Date.now() }
    const filteredItems = recentSearchItems.filter((search) => search.id !== item.id)
    const newRecentSearches = [itemWithTimestamp, ...filteredItems].slice(0, 3)
    setRecentSearchItems(newRecentSearches)
    try {
      localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches))
    } catch (error) {
      console.error("Error saving recent searches:", error)
    }
  }

  // Search functionality (snippets from same block only)
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      setSelectedItemIndex(0)
      return
    }

    const query = searchQuery.toLowerCase().trim()

    const themeItems = themeOptions.map((item) => ({
      ...item,
      action: () => {
        if (item.title === "Light Theme") setTheme("light")
        else if (item.title === "Dark Theme") setTheme("dark")
        else if (item.title === "System Theme") setTheme("system")
      },
    }))

    const results: SearchItem[] = []

    pages.forEach((item) => {
      const titleHit = item.title.toLowerCase().includes(query)
      const descHit = item.description.toLowerCase().includes(query)

      // ✅ Find the FIRST matching block on that page
      const blocks = item.path ? pageBlocksByPath[item.path] ?? [] : []
      const matchingBlock = blocks.find((b) => b.toLowerCase().includes(query))

      const contentHit = Boolean(matchingBlock)

      if (titleHit || descHit || contentHit) {
        if (matchingBlock) {
          const context = extractContext(matchingBlock, query)
          results.push({
            ...item,
            // ✅ snippet from within SAME element only
            description: context || matchingBlock,
          })
        } else {
          results.push(item)
        }
      }
    })

    const matchingThemeItems = themeItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.content && item.content.toLowerCase().includes(query))
      )
    })

    results.push(...matchingThemeItems)

    setSearchResults(results)
    setSelectedItemIndex(0)
  }, [searchQuery, recentSearchItems, setTheme, pages, pageBlocksByPath])

  const getVisibleItems = () => {
    if (searchQuery.trim() !== "") return searchResults
    return [...recentSearchItems, ...pages]
  }

  const visibleItems = getVisibleItems()

  useEffect(() => {
    setMounted(true)

    if (isOpen && inputRef.current) {
      setAnimatingOut(false)
      setSearchQuery("")
      setSelectedItemIndex(0)

      setTimeout(() => {
        const isMobileDevice = window.innerWidth < 768 && "ontouchstart" in window
        if (!isMobileDevice) inputRef.current?.focus()
      }, 100)
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, recentSearchItems.length])

  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [selectedItemIndex])

  const handleClose = () => {
    if (!animatingOut) {
      setAnimatingOut(true)
      setTimeout(() => {
        onClose()
        setAnimatingOut(false)
      }, 300)
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      e.preventDefault()
      handleClose()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const regularResults = searchResults.filter((item) => item.type !== "theme")
  const themeResults = searchResults.filter((item) => item.type === "theme")

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const recentItemsCount = recentSearchItems.length
    const regularItemsCount = searchQuery.trim() === "" ? pages.length : regularResults.length
    const themeItemsCount = searchQuery.trim() === "" ? 0 : themeResults.length
    const totalItems = recentItemsCount + regularItemsCount + themeItemsCount

    if (e.key === "ArrowDown" || e.key === "ArrowUp") setKeyboardNavActive(true)

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        if (selectedItemIndex < totalItems - 1) setSelectedItemIndex(selectedItemIndex + 1)
        break
      case "ArrowUp":
        e.preventDefault()
        if (selectedItemIndex > 0) setSelectedItemIndex(selectedItemIndex - 1)
        break
      case "Enter":
        e.preventDefault()
        if (visibleItems.length > 0) {
          let selectedItem: SearchItem | undefined

          if (searchQuery.trim() === "") {
            selectedItem =
              selectedItemIndex < recentItemsCount
                ? recentSearchItems[selectedItemIndex]
                : pages[selectedItemIndex - recentItemsCount]
          } else {
            selectedItem =
              selectedItemIndex < regularResults.length
                ? regularResults[selectedItemIndex]
                : themeResults[selectedItemIndex - regularResults.length]
          }

          if (selectedItem) {
            addToRecentSearches(selectedItem)
            setAnimatingOut(true)

            if (selectedItem.type === "theme") {
              if (selectedItem.action) {
                try {
                  selectedItem.action()
                } catch (error) {
                  console.error("Error changing theme:", error)
                }
              }
              setTimeout(() => {
                onClose()
                setAnimatingOut(false)
              }, 300)
            } else {
              if (selectedItem.action) selectedItem.action()
              else if (selectedItem.path) window.location.href = selectedItem.path
              setTimeout(() => {
                onClose()
                setAnimatingOut(false)
              }, 300)
            }
          }
        }
        break
      case "k":
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault()
          handleClose()
        }
        break
    }
  }

  const handleMouseEnter = (index: number) => {
    setSelectedItemIndex(index)
    setKeyboardNavActive(false)
  }

  if (!mounted || (!isOpen && !animatingOut)) return null

  const isMacOS = typeof navigator !== "undefined" ? navigator.platform.toUpperCase().indexOf("MAC") >= 0 : false
  const cmdKey = isMacOS ? "⌘" : "Ctrl+"

  return createPortal(
    <div
      className={`command-palette__overlay__B7k3q ${animatingOut ? "command-palette__animating-out__P8j4s" : ""}`}
      style={{ backdropFilter: "blur(5px)" }}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        className={`command-palette__container__P3j7s ${animatingOut ? "command-palette__container-out__L5k8q" : ""}`}
        onKeyDown={handleKeyDown}
      >
        <div className="command-palette__header__L5k8q">
          <div className="command-palette__icon__Z7j3s">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            className="command-palette__input__Q9j4p"
            placeholder="Type a command or search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <div className="command-palette__shortcut__H5j8q">{cmdKey}K</div>
        </div>

        <div className="command-palette__divider__P5k8q"></div>

        <div className="command-palette__content__Z3k7q" ref={resultsRef}>
          {searchQuery.trim() === "" ? (
            <>
              {recentSearchItems.length > 0 && (
                <>
                  <div className="command-palette__section__P5k8q">
                    <div className="command-palette__section-header__L7j3s">
                      <h3 className="command-palette__section-title__B9j6p">Recent searches</h3>
                    </div>
                    <div className="command-palette__results-list__Q7p3s">
                      {recentSearchItems.map((item, index) => (
                        <div
                          key={item.id}
                          className={`command-palette__result-item__H5k8q ${selectedItemIndex === index ? "command-palette__result-selected__P9k6p" : ""
                            } ${keyboardNavActive ? "keyboard-nav-active" : ""}`}
                          onClick={() => {
                            if (item.action) item.action()
                            else if (item.path) window.location.href = item.path
                            handleClose()
                          }}
                          onMouseEnter={() => handleMouseEnter(index)}
                          ref={selectedItemIndex === index ? selectedItemRef : null}
                        >
                          <div className="command-palette__result-icon__Q9m2p">{renderIcon(item.iconType)}</div>
                          <div className="command-palette__result-content__L3j7q">
                            <div className="command-palette__result-title__Z9k6p">{item.title}</div>
                            <div className="command-palette__result-description__P3j7q">
                              {highlightMatch(item.description, searchQuery)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="command-palette__divider__P5k8q"></div>
                </>
              )}

              <div className="command-palette__section__P5k8q">
                <div className="command-palette__results-list__Q7p3s">
                  {pages.map((item, index) => {
                    const actualIndex = recentSearchItems.length + index
                    return (
                      <div
                        key={item.id}
                        className={`command-palette__result-item__H5k8q ${selectedItemIndex === actualIndex ? "command-palette__result-selected__P9k6p" : ""
                          } ${keyboardNavActive ? "keyboard-nav-active" : ""}`}
                        onClick={() => {
                          if (item.path) window.location.href = item.path
                          handleClose()
                        }}
                        onMouseEnter={() => handleMouseEnter(actualIndex)}
                        ref={selectedItemIndex === actualIndex ? selectedItemRef : null}
                      >
                        <div className="command-palette__result-icon__Q9m2p">{renderIcon(item.iconType)}</div>
                        <div className="command-palette__result-content__L3j7q">
                          <div className="command-palette__result-title__Z9k6p">{item.title}</div>
                          <div className="command-palette__result-description__P3j7q">{item.description}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          ) : searchResults.length > 0 ? (
            <div className="command-palette__section__P5k8q">
              {regularResults.length > 0 && (
                <div className="command-palette__results-list__Q7p3s">
                  {regularResults.map((item, index) => (
                    <div
                      key={item.id}
                      className={`command-palette__result-item__H5k8q ${selectedItemIndex === index ? "command-palette__result-selected__P9k6p" : ""
                        } ${keyboardNavActive ? "keyboard-nav-active" : ""}`}
                      onClick={() => {
                        addToRecentSearches(item)
                        setAnimatingOut(true)

                        setTimeout(() => {
                          if (item.action) item.action()
                          else if (item.path) window.location.href = item.path

                          setTimeout(() => {
                            onClose()
                            setAnimatingOut(false)
                          }, 250)
                        }, 50)
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      ref={selectedItemIndex === index ? selectedItemRef : null}
                    >
                      <div className="command-palette__result-icon__Q9m2p">{renderIcon(item.iconType)}</div>
                      <div className="command-palette__result-content__L3j7q">
                        <div className="command-palette__result-title__Z9k6p">
                          {highlightMatch(item.title, searchQuery)}
                        </div>
                        <div className="command-palette__result-description__P3j7q">
                          {highlightMatch(item.description, searchQuery)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {regularResults.length > 0 && themeResults.length > 0 && (
                <div className="command-palette__divider__P5k8q" style={{ margin: "8px 0" }}></div>
              )}

              {themeResults.length > 0 && (
                <>
                  <div className="command-palette__section-header__L7j3s">
                    <h3 className="command-palette__section-title__B9j6p">Theme</h3>
                  </div>
                  <div className="command-palette__results-list__Q7p3s">
                    {themeResults.map((item, index) => {
                      const actualIndex = regularResults.length + index
                      return (
                        <div
                          key={item.id}
                          className={`command-palette__result-item__H5k8q ${selectedItemIndex === actualIndex ? "command-palette__result-selected__P9k6p" : ""
                            } ${keyboardNavActive ? "keyboard-nav-active" : ""}`}
                          onClick={() => {
                            addToRecentSearches(item)

                            if (item.action) {
                              try {
                                item.action()
                              } catch (error) {
                                console.error("Error changing theme:", error)
                              }
                            }

                            setAnimatingOut(true)
                            setTimeout(() => {
                              onClose()
                              setAnimatingOut(false)
                            }, 300)
                          }}
                          onMouseEnter={() => handleMouseEnter(actualIndex)}
                          ref={selectedItemIndex === actualIndex ? selectedItemRef : null}
                        >
                          <div className="command-palette__result-icon__Q9m2p">{renderIcon(item.iconType)}</div>
                          <div className="command-palette__result-content__L3j7q">
                            <div className="command-palette__result-title__Z9k6p">
                              {highlightMatch(item.title, searchQuery)}
                            </div>
                            <div className="command-palette__result-description__P3j7q">
                              {highlightMatch(item.description, searchQuery)}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="command-palette__no-results__L7j3s">
              <div className="command-palette__no-results-icon-container__B8k4p">
                <div className="command-palette__no-results-pattern__Z7j3s"></div>
                <div className="command-palette__no-results-icon__P5k8q">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 8.2C3 7.07989 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.07989 5 6.2 5H8.4C9.08836 5 9.43254 5 9.72385 5.10899C9.98201 5.20487 10.2131 5.35374 10.4 5.54C10.6155 5.75992 10.7454 6.0736 11.0052 6.70096L11.4 7.64C11.4266 7.70773 11.4399 7.7416 11.4508 7.77203C11.5365 8.04459 11.7526 8.23638 12.0234 8.24949C12.0538 8.25 12.0855 8.25 12.1489 8.25H17.8C18.9201 8.25 19.4802 8.25 19.908 8.46799C20.2843 8.65973 20.5903 8.96569 20.782 9.34202C21 9.76984 21 10.3299 21 11.45V15.8C21 16.9201 21 17.4802 20.782 17.908C20.5903 18.2843 20.2843 18.5903 19.908 18.782C19.4802 19 18.9201 19 17.8 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="command-palette__no-results-title__K9j6p">No results found</h3>
              <p className="command-palette__no-results-message__L7j3s">"{searchQuery}" did not match any content.</p>
              <p className="command-palette__no-results-suggestion__Z7j3s">
                Please try a different search term or browse available commands.
              </p>
              <button
                className="button__root__ZxcvB button__kind-secondary__R5j2s button__size-small__L9d7h header__get-started-button__B9k6p"
                onClick={() => {
                  setSearchQuery("")
                  setTimeout(() => inputRef.current?.focus(), 0)
                }}
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        <div className="command-palette__footer__vka2f"></div>

        <div className="command-palette__footer__H7k3q">
          <div className="command-palette__footer-item-up__L9k6p">
            <div className="command-palette__footer-icon__B7j3s">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 19L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="command-palette__footer-icon__B7j3s">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="command-palette__footer-text__P5k8q">navigate</div>
          </div>
          <div className="command-palette__footer-item-open__Z7j3s">
            <div className="command-palette__footer-badge__Z7j3s">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 10L4 15L9 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M4 15H16C18.7614 15 21 12.7614 21 10C21 7.23858 18.7614 5 16 5H11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="command-palette__footer-text__P5k8q">open</div>
          </div>
          <div className="command-palette__footer-item-escape__H7j3s">
            <div className="command-palette__footer-badge-escape__K5j8q">esc</div>
            <div className="command-palette__footer-text__P5k8q">close</div>
          </div>
          <div className="command-palette__footer-item-toggle__P9k6p">
            <div className="command-palette__footer-badge-cmd__L7j3s">{cmdKey}K</div>
            <div className="command-palette__footer-text__P5k8q">toggle</div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
