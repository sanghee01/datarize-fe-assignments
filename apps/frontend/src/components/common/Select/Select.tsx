import styled from '@emotion/styled'
import type { SelectHTMLAttributes } from 'react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}

export function Select({ children, ...props }: SelectProps) {
  return <StyledSelect {...props}>{children}</StyledSelect>
}

const StyledSelect = styled.select`
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

  &:disabled {
    background-color: var(--color-gray-50);
    cursor: not-allowed;
    opacity: 0.6;
  }
`
