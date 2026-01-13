import styled from '@emotion/styled'
import { Button } from '../Button'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <Container>
      <Text>{message}</Text>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          다시 시도
        </Button>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: var(--spacing-xl);
  text-align: center;
`

const Text = styled.div`
  color: var(--color-error);
  margin-bottom: var(--spacing-md);
`
