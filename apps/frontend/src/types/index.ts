export interface DateRange {
  from: string
  to: string
}

export interface PurchaseFrequency {
  range: string
  count: number
}

export interface Purchase {
  date: string
  customerName: string
  productName: string
  price: number
  quantity: number
}
