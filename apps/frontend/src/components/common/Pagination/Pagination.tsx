import styled from '@emotion/styled'
import { Button } from '../Button'

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
      <Button variant="secondary" onClick={handlePrevious} disabled={currentPage === 1}>
        이전
      </Button>
      <PageInfo>
        {currentPage} / {totalPages}
      </PageInfo>
      <Button variant="secondary" onClick={handleNext} disabled={currentPage === totalPages}>
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

const PageInfo = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  min-width: 80px;
  text-align: center;
`
