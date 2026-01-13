import { useDataExport } from '../hooks/useDataExport'
import type { DateRange } from '@/shared/types'
import { Button } from '@/shared/ui/Button'

interface Props {
  dateRange: DateRange
}

export function DataExportButton({ dateRange }: Props) {
  const { download, isDownloading } = useDataExport(dateRange)

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
