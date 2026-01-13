import styled from '@emotion/styled'
import { useCSVDownload } from '../hooks/useCSVDownload'
import type { DateRange } from '../types'

interface Props {
  dateRange: DateRange
}

export function CSVDownloadButton({ dateRange }: Props) {
  const { download, isDownloading } = useCSVDownload(dateRange)

  return (
    <Button onClick={download} disabled={isDownloading}>
      {isDownloading ? '다운로드 중...' : 'CSV 다운로드'}
    </Button>
  )
}

const Button = styled.button`
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
