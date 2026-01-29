"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { motion, useAnimation, type Variants } from "framer-motion"
import "@/styles/pages/home/hero-section.css"

export function HeroSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const controls = useAnimation()
  const heroImageRefs = useRef<{
    overviewNav: HTMLDivElement | null
    firstNavItem: HTMLDivElement | null
    navItems: (HTMLDivElement | null)[]
    page: HTMLDivElement | null
  }>({ 
    overviewNav: null,
    firstNavItem: null,
    navItems: [],
    page: null,
  })

  // Define the image URLs
  const darkThemeUrl = "https://i.ibb.co/8gnVqXb3/hero-image-sw-dark.png"
  const lightThemeUrl = "https://i.ibb.co/5X8mW9nS/hero-image-sw-light.png"

  // Set mounted state and preload images
  useEffect(() => {
    setMounted(true)
    
    const darkImage = new Image()
    darkImage.src = darkThemeUrl
    darkImage.crossOrigin = "anonymous"

    const lightImage = new Image()
    lightImage.src = lightThemeUrl
    lightImage.crossOrigin = "anonymous"

    // Start the animation sequence
    controls.start("visible")
  }, [controls])
  
  // Determine which theme to show - default to light if not mounted yet
  const currentTheme = mounted ? resolvedTheme : "light"

  // Animation variants
  const titleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: "20%",
      filter: "blur(10px)",
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.26, 0.49, 0.42, 0.95], // var(--ease-out-quad)
        delay: 0.6 + i * 0.08, // Added 0.5 to the original 0.1
      },
    }),
  }

  const subtitleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: "20%",
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.26, 0.49, 0.42, 0.95],
        delay: 1.2, // Added 0.5 to the original 0.8
      },
    },
  }

  const buttonVariants: Variants = {
    hidden: {
      opacity: 0,
      y: "20%",
      filter: "blur(8px)",
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.26, 0.49, 0.42, 0.95],
        delay: 1.3 + i * 0.12, // Added 0.5 to the original 1.0
      },
    }),
  }

  const browserElementVariants: Variants = {
    hidden: {
      opacity: 0,
      z: 300,
      filter: "blur(10px)",
    },
    visible: (i) => ({
      opacity: 1,
      z: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.26, 0.49, 0.42, 0.95],
        delay: 1.6 + i * 0.1, // Added 0.5 to the original 1.2
      },
    }),
  }

  const pageVariants: Variants = {
    hidden: {
      opacity: 0,
      z: 300,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      z: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.26, 0.49, 0.42, 0.95],
        delay: 2.1, // Added 0.5 to the original 1.6
      },
    },
  }

  const spotlightVariants: Variants = {
    hidden: {
      opacity: 0,
      transform: "translate(-72%, -62%) scale(0.5)",
    },
    visible: {
      opacity: 0.5,
      transform: "translate(-50%, -40%) scale(1)",
      transition: {
        duration: 2,
        ease: "easeOut",
        delay: 1.25, // Added 0.5 to the original 0.75
      },
    },
  }

  return (
      <div className="hero__content__L7j3s">
        <div className="Flex-module__P5k8q">
          <h1 
            className="typography__heading1__T3m8s" 
            style={{margin: 0}}>
            <span className="hero__titleWrapper__Q7p3s">
              {["Shapewebs", "introduce", "the", "magic", "back", "into", "software"].map((word, i) => (
                <motion.span
                  key={i}
                  className="hero__titleSpan__H5k8q"
                  custom={i}
                  initial="hidden"
                  animate={controls}
                  variants={titleVariants}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>
          <div className="Spacer-module__root__NM019"></div>
          <motion.p 
            className="hero__subtitle__K3n7p"
            initial="hidden"
            animate={controls}
            variants={subtitleVariants}
           >
            <span className="typography__subtitle__R6m2x">
              Beautiful, fast websites built with intention. Designed to feel alive, intuitive, and human.
            </span>
          </motion.p>
          <div className="hero__actions__Q6j9s">
            <motion.a
              href="/sign-up/"
              className="button__root__ZxcvB button__kind-primary__R5j2s button__size-medium__L9d7h"
              custom={0}
              initial="hidden"
              animate={controls}
              variants={buttonVariants}
            >
              <span>Calculate website price</span>
            </motion.a>
            <motion.a
              href="/contact/support/"
              className="button__root__ZxcvB button__kind-ghost__R5j2s button__size-medium__L9d7h hero__gradientButton__H5j8q"
              custom={1}
              initial="hidden"
              animate={controls}
              variants={buttonVariants}
            >
              <span>Arrange a meeting now</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </motion.a>
          </div>
        </div>

        <motion.svg
          className="hero__spotlight__B9j6p"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 3787 2842"
          fill="none"
          initial="hidden"
          animate={controls}
          variants={spotlightVariants}
        >
          <g filter="url(#filter)">
            <ellipse
              cx="1924.71"
              cy="273.501"
              rx="1624.71"
              ry="473.501"
              transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
            ></ellipse>
          </g>
          <defs>
            <filter
              id="filter"
              x="0.860352"
              y="0.838989"
              width="3785.16"
              height="2840.26"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8"></feGaussianBlur>
            </filter>
          </defs>
        </motion.svg>

        <div className="hero__image__L5k8q">
          <div className="hero__imageContainer__P7j3s">
              <div className="hero__wrapper__B3m7p">
                <div className="hero__browser__K8j4p">
                  <div className="hero__sidebar__Q7p3s">
                    <div className="hero__sidebarTop__H5k8q">
                      <motion.div
                        className="hero__overviewNav__L7j3s"
                        custom={6}
                        initial="hidden"
                        animate={controls}
                        variants={browserElementVariants}
                      >
                        <div className="hero__overviewNavLeft__P5k8q">
                          <div className="hero__resize__Z7j3s">
                            <div className="hero__resizeButton__B9j6p"></div>
                            <div className="hero__resizeButton__B9j6p"></div>
                            <div className="hero__resizeButton__B9j6p"></div>
                          </div>
                        </div>
                        <div className="hero__overviewNavRight__Q7p3s">
                          <div className="hero__navButtons__H5k8q">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.1147 12.8667C10.0281 12.9533 9.92031 13 9.79142 13C9.66253 13 9.55476 12.9567 9.46809 12.87L5.13476 8.53667C5.04809 8.45 5.00476 8.34222 5.00476 8.21333C5.00476 8.08444 5.04809 7.97667 5.13476 7.89L9.46809 3.55667C9.55476 3.47 9.66253 3.42667 9.79142 3.42667C9.92031 3.42667 10.0281 3.47 10.1147 3.55667C10.2014 3.64333 10.2447 3.75111 10.2447 3.88C10.2447 4.00889 10.2014 4.11667 10.1147 4.20333L6.31476 8L10.1147 11.8C10.2014 11.8867 10.2447 11.9944 10.2447 12.1233C10.2447 12.2522 10.2014 12.36 10.1147 12.8667Z"
                                fill="currentColor"
                              />
                            </svg>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.88525 12.8667C5.97192 12.9533 6.07969 13 6.20858 13C6.33747 13 6.44525 12.9567 6.53192 12.87L10.8652 8.53667C10.9519 8.45 10.9952 8.34222 10.9952 8.21333C10.9952 8.08444 10.9519 7.97667 10.8652 7.89L6.53192 3.55667C6.44525 3.47 6.33747 3.42667 6.20858 3.42667C6.07969 3.42667 5.97192 3.47 5.88525 3.55667C5.79858 3.64333 5.75525 3.75111 5.75525 3.88C5.75525 4.00889 5.79858 4.11667 5.88525 4.20333L9.68525 8L5.88525 11.8C5.79858 11.8867 5.75525 11.9944 5.75525 12.1233C5.75525 12.2522 5.79858 12.36 5.88525 12.8667Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="hero__navItem__L7j3s hero__firstNavItem__P5k8q"
                        custom={5}
                        initial="hidden"
                        animate={controls}
                        variants={browserElementVariants}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect
                            x="2.5"
                            y="2.5"
                            width="4"
                            height="4"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="none"
                          />
                          <rect
                            x="2.5"
                            y="9.5"
                            width="4"
                            height="4"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="none"
                          />
                          <rect
                            x="9.5"
                            y="2.5"
                            width="4"
                            height="4"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="none"
                          />
                          <rect
                            x="9.5"
                            y="9.5"
                            width="4"
                            height="4"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="none"
                          />
                        </svg>
                        <div className="hero__navItemIcons__Z7j3s">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.25 12.5C10.1495 12.5 12.5 10.1495 12.5 7.25C12.5 4.35051 10.1495 2 7.25 2C4.35051 2 2 4.35051 2 7.25C2 10.1495 4.35051 12.5 7.25 12.5Z"
                              stroke="currentColor"
                              strokeWidth="1"
                              fill="none"
                            />
                            <path
                              d="M10.9624 10.9625L13.9999 14.0001"
                              stroke="currentColor"
                              strokeWidth="1"
                              fill="none"
                            />
                          </svg>
                        </div>
                      </motion.div>

                      <motion.div
                        className="hero__navItem__L7j4s"
                        custom={4}
                        initial="hidden"
                        animate={controls}
                        variants={browserElementVariants}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="4" cy="4" r="1.5" stroke="currentColor" strokeWidth="1" fill="none" />
                          <circle cx="12" cy="12" r="1.5" stroke="currentColor" strokeWidth="1" fill="none" />
                          <circle cx="12" cy="4" r="1.5" stroke="currentColor" strokeWidth="1" fill="none" />
                          <path d="M5.5 4H10.5" stroke="currentColor" strokeWidth="1" />
                          <path d="M12 5.5V10.5" stroke="currentColor" strokeWidth="1" />
                          <path d="M10.5 12L5.5 12" stroke="currentColor" strokeWidth="1" />
                        </svg>
                        <span>CodePilot</span>
                      </motion.div>

                      <motion.div
                        className="hero__navItem__L7j4s"
                        custom={3}
                        initial="hidden"
                        animate={controls}
                        variants={browserElementVariants}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8 2.5L13.5 5.5V10.5L8 13.5L2.5 10.5V5.5L8 2.5Z"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="none"
                          />
                          <path d="M8 13.5V8" stroke="currentColor" strokeWidth="1" />
                          <path d="M13.5 5.5L8 8L2.5 5.5" stroke="currentColor" strokeWidth="1" />
                        </svg>
                        <span>Discover</span>
                      </motion.div>

                      <motion.div
                        className="hero__historySection__H5k8q"
                        custom={2}
                        initial="hidden"
                        animate={controls}
                        variants={browserElementVariants}
                      >
                        <span>Today</span>
                        <span>Errors and double-checking</span>
                        <span>CSS delay transition script</span>
                        <span className="hero__activeItem__K9j6p">Async Programming Overview</span>
                        <span>Overflow Hidden in JS</span>
                        <span>CSS animation delay setup</span>
                      </motion.div>

                      <motion.div
                        className="hero__historySection__H5k8q"
                        custom={1}
                        initial="hidden"
                        animate={controls}
                        variants={browserElementVariants}
                      >
                        <span>Yesterday</span>
                        <span>Text Wrap Balancing Tips</span>
                        <span>Google cookies information</span>
                        <span>-webkit-tap-highlight-color usage</span>
                        <span>Code Fix Suggestions</span>
                        <span>DOM Error Fix</span>
                      </motion.div>

                      <motion.div
                        className="hero__historySection__H5k8q"
                        custom={0}
                        initial="hidden"
                        animate={controls}
                        variants={browserElementVariants}
                      >
                        <span>Last 7 days</span>
                        <span>Responsive Menu Behavior</span>
                        <span>Fix product media gallery</span>
                        <span>Image Border Radius Slider</span>
                        <span>Edit Mode Checkbox Integration</span>
                        <span>Popup Edit Mode Setup</span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="hero__browserContent__L7j3s">
                    <motion.div
                      className="hero__page__P5k8q"
                      initial="hidden"
                      animate={controls}
                      variants={pageVariants}
                    >
                      <img
                        src={lightThemeUrl || "/placeholder.svg"}
                        alt="Code editor showing async programming"
                        className="hero__pageImage__Z7j3s"
                        style={{ opacity: currentTheme === "light" ? 1 : 0 }}
                      />
                      <img
                        src={darkThemeUrl || "/placeholder.svg"}
                        alt="Code editor showing async programming"
                        className="hero__pageImage__Z7j3s"
                        style={{ opacity: currentTheme === "dark" ? 1 : 0 }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
  )
}
