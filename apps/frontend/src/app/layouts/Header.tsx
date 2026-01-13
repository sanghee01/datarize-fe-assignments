import styled from '@emotion/styled'
import { ReactNode } from 'react'

interface Props {
  title: string
  actions?: ReactNode
}

export function Header({ title, actions }: Props) {
  return (
    <StyledHeader>
      <h1>{title}</h1>
      {actions}
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-xl) var(--spacing-lg);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  min-height: 100px;

  h1 {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    margin-bottom: var(--spacing-lg);
    color: var(--color-gray-900);
    margin: 0;
  }
`
