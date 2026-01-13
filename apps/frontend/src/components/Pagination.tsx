import styled from '@emotion/styled'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <Container>
      <Button onClick={handlePrevious} disabled={currentPage === 1}>
        이전
      </Button>
      <PageInfo>
        {currentPage} / {totalPages}
      </PageInfo>
      <Button onClick={handleNext} disabled={currentPage === totalPages}>
        다음
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
`

const Button = styled.button`
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-gray-900);
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: var(--color-gray-50);
    border-color: var(--color-primary);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const PageInfo = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  min-width: 80px;
  text-align: center;
`
