import styled from '@emotion/styled'
import type { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
}

export function Input({ placeholder = '텍스트를 입력하세요', ...props }: InputProps) {
  return <StyledInput placeholder={placeholder} {...props} />
}

const StyledInput = styled.input`
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: var(--font-size-sm);
  color: var(--color-gray-900);

  &::placeholder {
    color: var(--color-gray-600);
  }

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
