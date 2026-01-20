"use client"

import type React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { sendWebsiteQuoteEmail } from "@/actions/send-email"
import type { CalculatorResult, CalculatorQuestion } from "@/types/calculator"

interface SignupFormDemoProps {
  calculatorResult: CalculatorResult | null
}

// Re-declaring questions here for the client component to have access to them.
// In a larger project, these might be imported from a shared config.
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

export function SignupFormDemo({ calculatorResult }: SignupFormDemoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmissionMessage(null)

    const formData = new FormData(e.currentTarget)
    const firstName = formData.get("firstname") as string
    const lastName = formData.get("lastname") as string
    const email = formData.get("email") as string

    if (!firstName || !lastName || !email) {
      setSubmissionMessage("Please fill in all fields.")
      setIsSuccess(false)
      setIsSubmitting(false)
      return
    }

    if (!calculatorResult) {
      setSubmissionMessage("Calculator data is missing. Please complete the calculator first.")
      setIsSuccess(false)
      setIsSubmitting(false)
      return
    }

    try {
      const result = await sendWebsiteQuoteEmail({ firstName, lastName, email }, calculatorResult)
      setSubmissionMessage(result.message)
      setIsSuccess(result.success)
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmissionMessage("An error occurred while sending your request.")
      setIsSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="signup-form__wrapper">
      <h2
        className="typography__heading3__V1c8r"
        style={{ fontSize: "18px", textAlign: "center", fontWeight: "var(--font-weight-normal)" }}
      >
        Create your account
      </h2>

      <form className="signup-form__form" onSubmit={handleSubmit}>
        <div className="signup-form__input-row">
          <LabelInputContainer className="signup-form__label-input-container">
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" name="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer className="signup-form__label-input-container">
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" name="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="signup-form__label-input-container">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" placeholder="tyler@example.com" type="email" />
        </LabelInputContainer>

        <button
          className="button__root__ZxcvB button__kind-secondary__R5j2s button__size-medium__L9d7h"
          type="submit"
          disabled={isSubmitting}
          style={{ width: "100%", justifyContent: "center" }}
        >
          {isSubmitting ? "Sending..." : "Sign up"}
        </button>
        <p className="signup-form__legal-text">
          By signing up, you agree to our <a href="/terms">Terms of Service</a> and{" "}
          <a href="/dpa">Data Processing Agreement</a>.
        </p>
        {submissionMessage && (
          <p
            className={cn(
              "signup-form__submission-message",
              isSuccess ? "signup-form__submission-message--success" : "signup-form__submission-message--error",
            )}
          >
            {submissionMessage}
          </p>
        )}
      </form>
    </div>
  )
}

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("form__group__K7p2s", className)}>{children}</div>
}
