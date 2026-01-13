export interface ValidationState {
  error: string | null
  touched: {
    from: boolean
    to: boolean
  }
}
