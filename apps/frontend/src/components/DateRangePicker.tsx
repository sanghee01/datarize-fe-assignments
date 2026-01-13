import styled from '@emotion/styled'
import type { DateRange } from '../types'
import { Input } from './common/Input'

interface Props {
  dateRange: DateRange
  onChange: (dateRange: DateRange) => void
}

export function DateRangePicker({ dateRange, onChange }: Props) {
  return (
    <Container>
      <Label>
        <span>시작일</span>
        <Input type="date" value={dateRange.from} onChange={(e) => onChange({ ...dateRange, from: e.target.value })} />
      </Label>

      <Label>
        <span>종료일</span>
        <Input type="date" value={dateRange.to} onChange={(e) => onChange({ ...dateRange, to: e.target.value })} />
      </Label>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);

  span {
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--color-gray-600);
  }
`
