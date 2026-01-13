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
    <div>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        이전
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        다음
      </button>
    </div>
  )
}
