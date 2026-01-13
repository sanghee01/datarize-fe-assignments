import styled from '@emotion/styled'
import type { DateRange } from '../types'
import { Input } from './common/Input'
import { useDateRangeValidation } from '../hooks/useDateRangeValidation'
import { MIN_DATE, MAX_DATE } from '../constants'

interface Props {
  dateRange: DateRange
  onChange: (dateRange: DateRange) => void
}

export function DateRangePicker({ dateRange, onChange }: Props) {
  const { error, touched, handleFromChange: validateFrom, handleToChange: validateTo } = useDateRangeValidation()

  const handleFromChange = (value: string) => {
    const newDateRange = { ...dateRange, from: value }
    onChange(newDateRange)
    validateFrom(newDateRange)
  }

  const handleToChange = (value: string) => {
    const newDateRange = { ...dateRange, to: value }
    onChange(newDateRange)
    validateTo(newDateRange)
  }

  return (
    <Container>
      <Label hasError={!!error && touched.from}>
        <span>시작일</span>
        <InputWrapper>
          <Input
            type="date"
            value={dateRange.from}
            min={MIN_DATE}
            max={MAX_DATE}
            onChange={(e) => handleFromChange(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? 'date-range-error' : undefined}
          />
        </InputWrapper>
      </Label>

      <Label hasError={!!error && touched.to}>
        <span>종료일</span>
        <InputWrapper>
          <Input
            type="date"
            value={dateRange.to}
            min={MIN_DATE}
            max={MAX_DATE}
            onChange={(e) => handleToChange(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? 'date-range-error' : undefined}
          />
          {error && (touched.from || touched.to) && (
            <ErrorTooltip id="date-range-error" role="alert">
              {error}
            </ErrorTooltip>
          )}
        </InputWrapper>
      </Label>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  align-items: flex-start;
`

const Label = styled.label<{ hasError?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);

  span {
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: ${(props) => (props.hasError ? 'var(--color-error)' : 'var(--color-gray-600)')};
  }

  input {
    border-color: ${(props) => (props.hasError ? 'var(--color-error)' : 'var(--color-border)')};

    &:focus {
      border-color: ${(props) => (props.hasError ? 'var(--color-error)' : 'var(--color-primary)')};
    }
  }
`

const InputWrapper = styled.div`
  position: relative;
`

const ErrorTooltip = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--color-error);
  color: white;
  font-size: var(--font-size-sm);
  border-radius: 4px;
  white-space: nowrap;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    right: 12px;
    border: 6px solid transparent;
    border-bottom-color: var(--color-error);
  }
`
