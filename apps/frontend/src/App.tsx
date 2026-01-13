import styled from '@emotion/styled'
import { useState } from 'react'
import { usePurchaseFrequency } from './hooks/usePurchaseFrequency'
import { useCustomers } from './hooks/useCustomers'
import { useCustomerPurchases } from './hooks/useCustomerPurchases'
import { PurchaseFrequencyTable } from './components/PurchaseFrequencyTable'
import { DateRangePicker } from './components/DateRangePicker'
import { CSVDownloadButton } from './components/CSVDownloadButton'
import { CustomerList } from './components/CustomerList'
import { SortSelect } from './components/SortSelect'
import { CustomerSearchInput } from './components/CustomerSearchInput'
import { Pagination } from './components/common/Pagination'
import { CustomerDetailModal } from './components/CustomerDetailModal'
import { SectionErrorBoundary } from './components/SectionErrorBoundary'
import { DEFAULT_DATE_RANGE } from './constants'

function App() {
  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE)
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)

  const { data, isLoading, error } = usePurchaseFrequency(dateRange)
  const customers = useCustomers(dateRange)
  const customerPurchases = useCustomerPurchases(selectedCustomerId, dateRange)

  const handleCustomerClick = (customerId: number) => {
    setSelectedCustomerId(customerId)
  }

  const handleCloseModal = () => {
    setSelectedCustomerId(null)
  }

  const selectedCustomer = customers.customers.find((customer) => customer.id === selectedCustomerId)

  return (
    <Container>
      <Header>
        <h1>쇼핑몰 구매 데이터 대시보드</h1>
        <DateRangePicker dateRange={dateRange} onChange={setDateRange} />
      </Header>

      <Main>
        <Section>
          <SectionErrorBoundary sectionName="가격대별 구매 빈도">
            <SectionHeader>
              <h2>가격대별 구매 빈도</h2>
              <CSVDownloadButton dateRange={dateRange} />
            </SectionHeader>
            <PurchaseFrequencyTable data={data || []} isLoading={isLoading} error={error} />
          </SectionErrorBoundary>
        </Section>

        <Section>
          <SectionErrorBoundary sectionName="고객 목록">
            <SectionHeader>
              <h2>고객 목록</h2>
              <Controls>
                <CustomerSearchInput value={customers.name} onChange={customers.setName} />
                <SortSelect sortBy={customers.sortBy} onSort={customers.setSortBy} />
              </Controls>
            </SectionHeader>
            <CustomerList
              customers={customers.customers}
              isLoading={customers.isLoading}
              error={customers.error}
              onCustomerClick={handleCustomerClick}
            />
            {customers.pagination && (
              <Pagination
                currentPage={customers.pagination.page}
                totalPages={customers.pagination.totalPages}
                onPageChange={customers.setPage}
              />
            )}
          </SectionErrorBoundary>
        </Section>
      </Main>

      {selectedCustomerId && selectedCustomer && (
        <SectionErrorBoundary sectionName="고객 상세 정보">
          <CustomerDetailModal
            customerName={selectedCustomer.name}
            purchases={customerPurchases.data || []}
            isLoading={customerPurchases.isLoading}
            error={customerPurchases.error}
            onClose={handleCloseModal}
          />
        </SectionErrorBoundary>
      )}
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  background-color: var(--color-gray-50);
`

const Header = styled.header`
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

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
  padding-top: 180px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
`

const Section = styled.section`
  background: white;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  padding: var(--spacing-xl);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  gap: var(--spacing-md);

  h2 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--color-gray-900);
  }
`

const Controls = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
`

export default App
