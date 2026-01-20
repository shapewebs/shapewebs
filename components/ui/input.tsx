"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useMotionTemplate, useMotionValue, motion } from "framer-motion"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const radius = 100 // change this to increase the radius of the hover effect
  const [visible, setVisible] = React.useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }
  return (
    <motion.div
      style={{
        background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          #3b82f6,
          transparent 80%
        )
      `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="input__wrapper__Z3n7q" // Custom class
    >
      <input
        type={type}
        className={cn("form__input__Z3n7q", className)} // Custom class
        ref={ref}
        {...props}
      />
    </motion.div>
  )
})
Input.displayName = "Input"

export { Input }
