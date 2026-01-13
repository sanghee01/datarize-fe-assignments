import styled from '@emotion/styled'
import { useState, useEffect } from 'react'

interface CustomerSearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function CustomerSearchInput({ value, onChange }: CustomerSearchInputProps) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue)
    }, 300)

    return () => clearTimeout(timer)
  }, [localValue, onChange])

  return (
    <Input
      type="text"
      placeholder="고객 이름 검색..."
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
    />
  )
}

const Input = styled.input`
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: var(--font-size-sm);
  color: var(--color-gray-900);
  min-width: 200px;

  &::placeholder {
    color: var(--color-gray-600);
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`
