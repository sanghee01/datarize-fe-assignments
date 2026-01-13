import type { DateRange } from '../types'

interface Props {
  dateRange: DateRange
  onChange: (dateRange: DateRange) => void
}

export function DateRangePicker({ dateRange, onChange }: Props) {
  return (
    <div>
      <label>
        시작일:
        <input type="date" value={dateRange.from} onChange={(e) => onChange({ ...dateRange, from: e.target.value })} />
      </label>

      <label>
        종료일:
        <input type="date" value={dateRange.to} onChange={(e) => onChange({ ...dateRange, to: e.target.value })} />
      </label>
    </div>
  )
}
