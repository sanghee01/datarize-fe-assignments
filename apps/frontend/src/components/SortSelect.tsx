import styled from '@emotion/styled'

type SortOrder = 'asc' | 'desc' | null

interface SortSelectProps {
  sortBy: SortOrder
  onSort: (sortBy: SortOrder) => void
}

export function SortSelect({ sortBy, onSort }: SortSelectProps) {
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

const Select = styled.select`
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: var(--font-size-sm);
  color: var(--color-gray-900);
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`
