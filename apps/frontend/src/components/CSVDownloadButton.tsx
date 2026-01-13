import { useCSVDownload } from '../hooks/useCSVDownload'
import type { DateRange } from '../types'
import { Button } from './common/Button'

interface Props {
  dateRange: DateRange
}

export function CSVDownloadButton({ dateRange }: Props) {
  const { download, isDownloading } = useCSVDownload(dateRange)

  return (
    <Button
      variant="primary"
      onClick={download}
      disabled={isDownloading}
      aria-label={isDownloading ? '구매 데이터 CSV 파일 다운로드 중' : '구매 데이터 CSV 파일 다운로드'}
    >
      {isDownloading ? '다운로드 중...' : 'CSV 다운로드'}
    </Button>
  )
}
