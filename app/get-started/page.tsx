"use client"

import { useState } from "react"
import { WebsitePriceCalculator } from "@/components/website-price-calculator"
import { SignupFormDemo } from "@/components/signup-form"
import type { CalculatorResult } from "@/types/calculator"
import "@/styles/pages/get-started/get-started.css"

export default function GetStartedPage() {
  const [calculatorResult, setCalculatorResult] = useState<CalculatorResult | null>(null)

  const handleCalculatorComplete = (result: CalculatorResult) => {
    setCalculatorResult(result)
  }

  return (
    <div className="get-started-page__wrapper">
      <div className="get-started-page__logo-container">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="200.000000pt"
          height="200.000000pt"
          viewBox="0 0 400.000000 400.000000"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: "40px",
            height: "40px",
            color: "rgba(var(--color-primary-inverted), 1)",
          }}
        >
          <g transform="translate(0.000000,400.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
            <path
              d="M1190 3764 c-307 -47 -552 -163 -761 -362 -196 -186 -322 -405 -391
              -681 -22 -85 -22 -93 -25 -1255 -4 -1298 -9 -1202 62 -1232 50 -21 1739 -21
              1788 0 29 11 42 31 94 137 34 68 222 448 418 844 428 863 809 1632 1066 2153
              104 211 187 387 184 392 -6 9 -2376 12 -2435 4z"
            />
            <path
              d="M3255 1510 c-242 -34 -447 -211 -531 -460 -27 -79 -25 -280 3 -367
              66 -201 228 -365 426 -429 116 -38 266 -38 382 -1 341 112 531 456 435 791
              -89 312 -393 510 -715 466z"
            />
          </g>
        </svg>
      </div>

      <div className="get-started-page__content">
        {!calculatorResult ? (
          <WebsitePriceCalculator onComplete={handleCalculatorComplete} />
        ) : (
          <SignupFormDemo calculatorResult={calculatorResult} />
        )}
      </div>
    </div>
  )
}
