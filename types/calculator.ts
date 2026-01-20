export interface CalculatorOption {
  label: string
  value: string
  cost: number
}

export interface CalculatorQuestion {
  id: string
  question: string
  options: CalculatorOption[]
}

export interface CalculatorResult {
  answers: Record<string, string>
  answerLabels: Record<string, string>
  totalPrice: number
}
