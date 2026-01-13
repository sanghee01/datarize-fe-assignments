import { Select } from '@/shared/ui/Select'

type SortOrder = 'asc' | 'desc' | null

interface CustomerSortDropdownProps {
  sortBy: SortOrder
  onSort: (sortBy: SortOrder) => void
}

export function CustomerSortDropdown({ sortBy, onSort }: CustomerSortDropdownProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === 'asc' || value === 'desc') {
      onSort(value)
    } else {
      onSort(null)
    }
  }

  return (
    <Select value={sortBy || ''} onChange={handleChange}>
      <option value="">ID 순</option>
      <option value="desc">구매 금액 높은 순</option>
      <option value="asc">구매 금액 낮은 순</option>
    </Select>
  )
}
