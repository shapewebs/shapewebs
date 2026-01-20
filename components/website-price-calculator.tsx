"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import "@/styles/components/website-calculator.css"
import type { CalculatorQuestion, CalculatorResult } from "@/types/calculator"

interface WebsitePriceCalculatorProps {
  onComplete: (result: CalculatorResult) => void
}

const questions: CalculatorQuestion[] = [
  {
    id: "websiteType",
    question: "What type of website do you need?",
    options: [
      { label: "Basic (Brochure/Portfolio)", value: "basic", cost: 1500 },
      { label: "E-commerce (Online Store)", value: "ecommerce", cost: 4000 },
      { label: "Custom Web Application", value: "webapp", cost: 8000 },
    ],
  },
  {
    id: "numberOfPages",
    question: "Approximately how many unique pages will your website have?",
    options: [
      { label: "1-5 pages", value: "1-5", cost: 500 },
      { label: "6-10 pages", value: "6-10", cost: 1000 },
      { label: "11-20 pages", value: "11-20", cost: 2000 },
      { label: "20+ pages (Custom Quote)", value: "20+", cost: 3500 },
    ],
  },
  {
    id: "designComplexity",
    question: "What level of design complexity are you looking for?",
    options: [
      { label: "Template-based (Minimal Customization)", value: "template", cost: 0 },
      { label: "Custom UI/UX Design", value: "custom-ui", cost: 2000 },
      { label: "Highly Custom & Interactive", value: "highly-custom", cost: 5000 },
    ],
  },
  {
    id: "integrations",
    question: "Do you need any third-party integrations (e.g., payment, CRM, analytics)?",
    options: [
      { label: "No integrations", value: "none", cost: 0 },
      { label: "1-2 integrations", value: "1-2", cost: 750 },
      { label: "3-5 integrations", value: "3-5", cost: 1500 },
      { label: "More than 5 (Custom Quote)", value: "5+", cost: 2500 },
    ],
  },
  {
    id: "contentCreation",
    question: "Who will provide the website content (text, images)?",
    options: [
      { label: "I will provide all content", value: "client-provided", cost: 0 },
      { label: "Basic copywriting & image sourcing", value: "basic-content", cost: 1000 },
      { label: "Professional copywriting & custom visuals", value: "pro-content", cost: 3000 },
    ],
  },
  {
    id: "maintenanceSupport",
    question: "Do you require ongoing maintenance and support?",
    options: [
      { label: "No ongoing support", value: "none", cost: 0 },
      { label: "Basic (monthly updates & security)", value: "basic-support", cost: 1200 }, // Annual cost
      { label: "Premium (24/7 monitoring & priority support)", value: "premium-support", cost: 3600 }, // Annual cost
    ],
  },
]

export function WebsitePriceCalculator({ onComplete }: WebsitePriceCalculatorProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [answerLabels, setAnswerLabels] = useState<Record<string, string>>({})

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const isFirstQuestion = currentQuestionIndex === 0

  const handleOptionSelect = (optionValue: string, optionLabel: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionValue }))
    setAnswerLabels((prev) => ({ ...prev, [currentQuestion.id]: optionLabel }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else if (isLastQuestion) {
      const totalPrice = questions.reduce((sum, q) => {
        const selectedOptionValue = answers[q.id]
        const selectedOption = q.options.find((opt) => opt.value === selectedOptionValue)
        return sum + (selectedOption?.cost || 0)
      }, 0)
      onComplete({ answers, answerLabels, totalPrice })
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const selectedOptionForCurrentQuestion = answers[currentQuestion.id]

  return (
    <div className="website-calculator__container">
      <div className="website-calculator__question-section">
        <h3 className="website-calculator__question">{currentQuestion.question}</h3>
        <div className="website-calculator__options">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              className={cn(
                "button__root__ZxcvB",
                "button__size-medium__L9d7h",
                selectedOptionForCurrentQuestion === option.value
                  ? "button__kind-primary__R5j2s"
                  : "button__kind-secondary__R5j2s",
                "website-calculator__option-button",
              )}
              onClick={() => handleOptionSelect(option.value, option.label)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="website-calculator__navigation">
        <Button
          className="button__root__ZxcvB button__kind-secondary__R5j2s button__size-medium__L9d7h"
          onClick={handleBack}
          disabled={isFirstQuestion}
        >
          Back
        </Button>
        <Button
          className="button__root__ZxcvB button__kind-primary__R5j2s button__size-medium__L9d7h"
          onClick={handleNext}
          disabled={!selectedOptionForCurrentQuestion}
        >
          {isLastQuestion ? "Calculate Price" : "Continue"}
        </Button>
      </div>

      <div className="website-calculator__progress-indicator">
        {questions.map((_, index) => (
          <span
            key={index}
            className={cn(
              "website-calculator__progress-dot",
              index === currentQuestionIndex && "website-calculator__progress-dot--active",
            )}
          />
        ))}
      </div>
    </div>
  )
}
