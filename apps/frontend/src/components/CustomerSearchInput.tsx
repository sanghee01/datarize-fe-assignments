import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Input } from './common/Input'

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
    <StyledInput
      type="text"
      placeholder="고객 이름 검색..."
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
    />
  )
}

const StyledInput = styled(Input)`
  min-width: 200px;
`
