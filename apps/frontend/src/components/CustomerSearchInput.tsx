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
    <input
      type="text"
      placeholder="고객 이름 검색..."
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
    />
  )
}
