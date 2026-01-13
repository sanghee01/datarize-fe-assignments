import { useCSVDownload } from '../hooks/useCSVDownload'
import type { DateRange } from '../types'
import { Button } from './common/Button'

interface Props {
  dateRange: DateRange
}

export function CSVDownloadButton({ dateRange }: Props) {
  const { download, isDownloading } = useCSVDownload(dateRange)

  return (
    <Button variant="primary" onClick={download} disabled={isDownloading}>
      {isDownloading ? '다운로드 중...' : 'CSV 다운로드'}
    </Button>
  )
}
