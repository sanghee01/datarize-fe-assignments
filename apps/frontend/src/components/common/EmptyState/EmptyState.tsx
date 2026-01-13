import styled from '@emotion/styled'
import { Button } from '../Button'

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ icon = '📭', title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Container role="status" aria-live="polite">
      <Icon aria-hidden="true">{icon}</Icon>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl) var(--spacing-xl);
  min-height: 300px;
  text-align: center;
`

const Icon = styled.div`
  font-size: 64px;
  margin-bottom: var(--spacing-md);
  line-height: 1;
`

const Title = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0 0 var(--spacing-sm) 0;
`

const Description = styled.p`
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  margin: 0 0 var(--spacing-lg) 0;
  max-width: 400px;
  line-height: 1.5;
`
