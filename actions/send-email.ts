"use server"

import type { CalculatorResult } from "@/types/calculator"

interface UserInfo {
  firstName: string
  lastName: string
  email: string
}

export async function sendWebsiteQuoteEmail(userInfo: UserInfo, calculatorResult: CalculatorResult) {
  console.log("--- Sending Website Quote Email ---")
  console.log("User Information:", userInfo)
  console.log("Calculator Results:", calculatorResult)
  console.log("Total Estimated Price:", calculatorResult.totalPrice)
  console.log("--- Email Sent (Simulated) ---")

  // In a real application, you would integrate with an email service here.
  // For example, using Resend:
  // import { Resend } from 'resend';
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'onboarding@resend.dev',
  //   to: userInfo.email,
  //   subject: 'Your Website Design Quote from ShapeWebs',
  //   html: `
  //     <p>Hello ${userInfo.firstName},</p>
  //     <p>Thank you for using our website price calculator. Here's a summary of your estimated quote:</p>
  //     <h3>Estimated Price: $${calculatorResult.totalPrice}</h3>
  //     <ul>
  //       ${Object.entries(calculatorResult.answerLabels)
  //         .map(([questionId, label]) => `<li><strong>${questionId}:</strong> ${label}</li>`)
  //         .join("")}
  //     </ul>
  //     <p>We will be in touch shortly to discuss your project in more detail.</p>
  //     <p>Best regards,</p>
  //     <p>The ShapeWebs Team</p>
  //   `,
  // });

  return { success: true, message: "Your request has been sent! We'll be in touch shortly." }
}
