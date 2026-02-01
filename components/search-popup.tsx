"use client"

import type React from "react"

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react"
import { createPortal } from "react-dom"
import "@/styles/components/search-popup.css"
import { useTheme } from "next-themes"
import { searchablePages } from "@/lib/search-data"

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
  content?: string // Add content field for full-text search
}

// Convert searchable pages to SearchItem format
const pages: SearchItem[] = searchablePages.map((page) => ({
  id: page.id,
  title: page.title,
  description: page.description,
  iconType: page.iconType,
  path: page.path,
  type: "page" as const,
  content: page.content,
}))

// Theme options with enhanced content for better matching
const themeOptions: SearchItem[] = [
  {
    id: "theme1",
    title: "Light Theme",
    description: "Switch to light mode",
    iconType: "light-theme",
    type: "theme",
    action: () => {}, // Will be set in the component
    content: "Light mode bright white theme day mode light appearance light color scheme",
  },
  {
    id: "theme2",
    title: "Dark Theme",
    description: "Switch to dark mode",
    iconType: "dark-theme",
    type: "theme",
    action: () => {}, // Will be set in the component
    content: "Dark mode night theme black dark appearance dark color scheme",
  },
  {
    id: "theme3",
    title: "System Theme",
    description: "Use your system preferences",
    iconType: "system-theme",
    type: "theme",
    action: () => {}, // Will be set in the component
    content: "System theme automatic mode follow device settings system appearance system color scheme",
  },
]

interface SearchPopupProps {
  isOpen: boolean
  onClose: () => void
}

// Function to render icon based on iconType
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
    case "about":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
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
          <path
            d="M15 6.5L17.5 9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 14.5L15 17.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 17.5L6.5 14.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 9.5L9 6.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "project":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 21V9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    case "light-theme":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

// Helper function to highlight matched text
const highlightMatch = (text: string, query: string) => {
  if (!query.trim()) return text

  // Escape special regex characters in the query
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

  // Create a regex that's case insensitive
  const regex = new RegExp(`(${escapedQuery})`, "gi")

  // Split the text by the regex
  const parts = text.split(regex)

  // Return the text with highlighted parts
  return parts.map((part, i) => {
    // Check if this part matches the query (case insensitive)
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

// Function to extract context around a match
const extractContext = (text: string, query: string, contextLength = 50) => {
  if (!text || !query.trim()) return ""

  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const index = lowerText.indexOf(lowerQuery)

  if (index === -1) return ""

  // Calculate start and end positions for context
  let start = Math.max(0, index - contextLength)
  let end = Math.min(text.length, index + query.length + contextLength)

  // Adjust to not cut words
  if (start > 0) {
    // Find the first space before the start
    const spaceBeforeStart = text.lastIndexOf(" ", start)
    if (spaceBeforeStart !== -1) {
      start = spaceBeforeStart + 1
    }
  }

  if (end < text.length) {
    // Find the first space after the end
    const spaceAfterEnd = text.indexOf(" ", end)
    if (spaceAfterEnd !== -1) {
      end = spaceAfterEnd
    }
  }

  // Add ellipsis if needed
  let result = text.substring(start, end)
  if (start > 0) result = "..." + result
  if (end < text.length) result = result + "..."

  return result
}

export function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const [mounted, setMounted] = useState(false)
  const [animatingOut, setAnimatingOut] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [recentSearchItems, setRecentSearchItems] = useState<SearchItem[]>([])
  // Add a new state variable to track keyboard navigation mode
  const [keyboardNavActive, setKeyboardNavActive] = useState(false)

  // Get theme functions
  const { theme, setTheme } = useTheme()

  const inputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const selectedItemRef = useRef<HTMLDivElement>(null)

  // Load recent searches from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedSearches = localStorage.getItem("recentSearches")
        if (storedSearches) {
          const parsedSearches = JSON.parse(storedSearches) as SearchItem[]
          // Sort by timestamp (newest first) and limit to 3
          const sortedSearches = parsedSearches.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).slice(0, 3)
          setRecentSearchItems(sortedSearches)
        }
      } catch (error) {
        console.error("Error loading recent searches:", error)
      }
    }
  }, [])

  // Add a new function to save a search item to recent searches
  const addToRecentSearches = (item: SearchItem) => {
    // Create a copy with current timestamp
    const itemWithTimestamp = {
      ...item,
      timestamp: Date.now(),
    }

    // Filter out any existing item with the same id
    const filteredItems = recentSearchItems.filter((search) => search.id !== item.id)

    // Add new item to the beginning, limit to 3 items
    const newRecentSearches = [itemWithTimestamp, ...filteredItems].slice(0, 3)

    setRecentSearchItems(newRecentSearches)

    // Save to localStorage
    try {
      localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches))
    } catch (error) {
      console.error("Error saving recent searches:", error)
    }
  }

  // Enhanced search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      setSelectedItemIndex(0)
      return
    }

    // Simple search implementation
    const query = searchQuery.toLowerCase().trim()

    // Create theme options with current theme functions
    const themeItems = themeOptions.map((item) => ({
      ...item,
      action: () => {
        if (item.title === "Light Theme") setTheme("light")
        else if (item.title === "Dark Theme") setTheme("dark")
        else if (item.title === "System Theme") setTheme("system")
      },
    }))

    // Search in all content
    const results: SearchItem[] = []

    // First check regular pages
    pages.forEach((item) => {
      // Check title, description, and content
      if (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.content && item.content.toLowerCase().includes(query))
      ) {
        // For pages, add context to the description if match is in content
        if (item.content && item.content.toLowerCase().includes(query)) {
          const context = extractContext(item.content, query)
          if (context) {
            // Create a copy with the context as description
            results.push({
              ...item,
              description: context,
            })
            return
          }
        }
        // If no content match or no context, add the original item
        results.push(item)
      }
    })

    // Then check theme options and add them at the end
    const matchingThemeItems = themeItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.content && item.content.toLowerCase().includes(query))
      )
    })

    // Add matching theme items
    results.push(...matchingThemeItems)

    setSearchResults(results)
    setSelectedItemIndex(0)
  }, [searchQuery, recentSearchItems, setTheme])

  // Get all visible items based on the current state
  const getVisibleItems = () => {
    if (searchQuery.trim() !== "") {
      return searchResults
    } else {
      // When no search query, we show both recent searches and regular items
      return [...recentSearchItems, ...pages]
    }
  }

  const visibleItems = getVisibleItems()

  // Update the useEffect to handle animation timing and reset selection
  useEffect(() => {
    setMounted(true)

    // When the popup is opened, focus the input and reset animation state
    if (isOpen && inputRef.current) {
      setAnimatingOut(false)
      setSearchQuery("")
      setSelectedItemIndex(0)

      // Small delay to ensure the animation completes before focusing
      // This helps prevent issues with mobile keyboards appearing during animations
      setTimeout(() => {
        // Only focus on desktop or larger tablets
        // This prevents the mobile keyboard from automatically appearing on phones
        const isMobileDevice = window.innerWidth < 768 && "ontouchstart" in window
        if (!isMobileDevice) {
          inputRef.current?.focus()
        }
      }, 100)
    }

    // Add escape key listener
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, recentSearchItems.length])

  // Scroll selected item into view when it changes
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }, [selectedItemIndex])

  // Create a handleClose function to manage the animation out
  const handleClose = () => {
    if (!animatingOut) {
      setAnimatingOut(true)
      // Wait for animation to complete before actually closing
      setTimeout(() => {
        onClose()
        setAnimatingOut(false)
      }, 300) // Match this to the animation duration
    }
  }

  // Handle overlay click (to close)
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Make sure we're actually clicking the overlay and not a child element
    if (e.target === overlayRef.current) {
      e.preventDefault() // Prevent any default behavior
      handleClose()
    }
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Fixed keyboard navigation
  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const recentItemsCount = recentSearchItems.length
    const regularItemsCount = searchQuery.trim() === "" ? pages.length : regularResults.length
    const themeItemsCount = searchQuery.trim() === "" ? 0 : themeResults.length
    const totalItems = recentItemsCount + regularItemsCount + themeItemsCount

    // Set keyboard navigation active when arrow keys are used
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      setKeyboardNavActive(true)
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        if (selectedItemIndex < totalItems - 1) {
          setSelectedItemIndex(selectedItemIndex + 1)
        }
        // No else clause here - this prevents wrapping back to the top
        break

      case "ArrowUp":
        e.preventDefault()
        if (selectedItemIndex > 0) {
          setSelectedItemIndex(selectedItemIndex - 1)
        }
        // No else clause here - this prevents wrapping to the bottom
        break

      case "Enter":
        e.preventDefault()
        if (visibleItems.length > 0) {
          // Find the correct item based on the selected index
          let selectedItem

          if (searchQuery.trim() === "") {
            // When showing recent searches + regular items
            if (selectedItemIndex < recentItemsCount) {
              selectedItem = recentSearchItems[selectedItemIndex]
            } else {
              selectedItem = pages[selectedItemIndex - recentItemsCount]
            }
          } else {
            // When showing search results
            if (selectedItemIndex < regularResults.length) {
              selectedItem = regularResults[selectedItemIndex]
            } else {
              selectedItem = themeResults[selectedItemIndex - regularResults.length]
            }
          }

          if (selectedItem) {
            // Add to recent searches
            addToRecentSearches(selectedItem)

            // Start closing animation first
            setAnimatingOut(true)

            // For theme changes, ensure the action happens immediately
            if (selectedItem.type === "theme") {
              // Execute theme change immediately
              if (selectedItem.action) {
                try {
                  selectedItem.action()
                } catch (error) {
                  console.error("Error changing theme:", error)
                }
              }

              // Then handle closing
              setTimeout(() => {
                onClose()
                setAnimatingOut(false)
              }, 300)
            } else {
              // For non-theme actions, handle normally
              if (selectedItem.action) {
                selectedItem.action()
              } else if (selectedItem.path) {
                window.location.href = selectedItem.path
              }
              // Complete the closing process
              setTimeout(() => {
                onClose()
                setAnimatingOut(false)
              }, 300)
            }
          }
        }
        break

      // Handle cmd+k for closing
      case "k":
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault()
          handleClose()
        }
        break
    }
  }

  // Add a function to handle mouse enter that disables keyboard navigation mode
  const handleMouseEnter = (index: number) => {
    setSelectedItemIndex(index)
    setKeyboardNavActive(false)
  }

  // Update the early return condition to check for animatingOut
  if (!mounted || (!isOpen && !animatingOut)) return null

  // Determine if we're showing Mac or Windows keyboard shortcuts
  const isMacOS = typeof navigator !== "undefined" ? navigator.platform.toUpperCase().indexOf("MAC") >= 0 : false
  const cmdKey = isMacOS ? "⌘" : "Ctrl+"

  // Split items into regular results and theme results
  const regularResults = searchResults.filter((item) => item.type !== "theme")
  const themeResults = searchResults.filter((item) => item.type === "theme")

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

        {/* Command palette content */}
        <div className="command-palette__content__Z3k7q" ref={resultsRef}>
          {searchQuery.trim() === "" ? (
            <>
              {/* Only show recent searches section if there are items */}
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
                          className={`command-palette__result-item__H5k8q ${
                            selectedItemIndex === index ? "command-palette__result-selected__P9k6p" : ""
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
                        className={`command-palette__result-item__H5k8q ${
                          selectedItemIndex === actualIndex ? "command-palette__result-selected__P9k6p" : ""
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
              {/* Show regular results first without a header */}
              {regularResults.length > 0 && (
                <div className="command-palette__results-list__Q7p3s">
                  {regularResults.map((item, index) => (
                    <div
                      key={item.id}
                      className={`command-palette__result-item__H5k8q ${
                        selectedItemIndex === index ? "command-palette__result-selected__P9k6p" : ""
                      } ${keyboardNavActive ? "keyboard-nav-active" : ""}`}
                      onClick={() => {
                        addToRecentSearches(item)
                        // Start closing animation first
                        setAnimatingOut(true)

                        setTimeout(() => {
                          if (item.action) {
                            item.action()
                          } else if (item.path) {
                            window.location.href = item.path
                          }
                          // Complete the closing process
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

              {/* Add divider if we have both regular results and theme results */}
              {regularResults.length > 0 && themeResults.length > 0 && (
                <div className="command-palette__divider__P5k8q" style={{ margin: "8px 0" }}></div>
              )}

              {/* Show theme results below with a header */}
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
                          className={`command-palette__result-item__H5k8q ${
                            selectedItemIndex === actualIndex ? "command-palette__result-selected__P9k6p" : ""
                          } ${keyboardNavActive ? "keyboard-nav-active" : ""}`}
                          onClick={() => {
                            // First add to recent searches
                            addToRecentSearches(item)

                            // Execute the theme change immediately to ensure it happens
                            if (item.action) {
                              try {
                                item.action()
                              } catch (error) {
                                console.error("Error changing theme:", error)
                              }
                            }

                            // Then start the animation out
                            setAnimatingOut(true)

                            // Complete the closing process after animation
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
                <path
                  d="M12 19L12 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 12L12 5L19 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="command-palette__footer-icon__B7j3s">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 5L12 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 12L12 19L5 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="command-palette__footer-text__P5k8q">navigate</div>
          </div>
          <div className="command-palette__footer-item-open__Z7j3s">
            <div className="command-palette__footer-badge__Z7j3s">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 10L4 15L9 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
