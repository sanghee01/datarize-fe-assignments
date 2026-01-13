import type { Purchase } from '../types'

export function convertToCSV(purchases: Purchase[]): string {
  if (purchases.length === 0) {
    return ''
  }

  const headers = ['날짜', '고객명', '상품명', '가격', '수량']
  const headerRow = headers.join(',')

  const rows = purchases.map((purchase) => {
    return [purchase.date, purchase.customerName, purchase.productName, purchase.price, purchase.quantity].join(',')
  })

  return [headerRow, ...rows].join('\n')
}

export function downloadCSV(csvString: string, filename: string): void {
  // 엑셀에서 한글 깨짐 방지
  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csvString], { type: 'text/csv;charset=utf-8;' })

  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
