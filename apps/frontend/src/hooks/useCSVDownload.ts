import { useState } from 'react'
import { fetchPurchases } from '../api/purchases'
import { convertToCSV, downloadCSV } from '../utils/csv'
import type { DateRange } from '../types'

export function useCSVDownload(dateRange: DateRange) {
  const [isDownloading, setIsDownloading] = useState(false)

  const download = async () => {
    try {
      setIsDownloading(true)

      const purchases = await fetchPurchases(dateRange.from, dateRange.to)
      const csvString = convertToCSV(purchases)

      const filename = `구매데이터_${dateRange.from}_${dateRange.to}.csv`
      downloadCSV(csvString, filename)
    } catch (error) {
      alert('CSV 다운로드 중 오류가 발생했습니다.')
      console.error(error)
    } finally {
      setIsDownloading(false)
    }
  }

  return { download, isDownloading }
}
