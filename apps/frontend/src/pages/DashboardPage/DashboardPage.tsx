import styled from '@emotion/styled'
import { AppLayout } from '@/app/layouts'
import { DateRangeSelector } from '@/features/date-filter'
import { PurchaseChart, DataExportButton } from '@/features/purchase-analytics'
import { CustomerListTable, CustomerSearchBar, CustomerSortDropdown } from '@/features/customer-list'
import { CustomerDetailDialog } from '@/features/customer-detail'
import { Pagination } from '@/shared/ui/Pagination'
import { SectionErrorBoundary } from '@/shared/ui/ErrorBoundary'
import { useDashboard } from './useDashboard'

export function DashboardPage() {
  const {
    dateRange,
    setDateRange,
    selectedCustomerId,
    selectedCustomer,
    purchaseAnalytics,
    customerList,
    customerDetail,
    handleCustomerClick,
    handleCloseModal,
  } = useDashboard()

  return (
    <AppLayout
      headerTitle="쇼핑몰 구매 데이터 대시보드"
      headerActions={<DateRangeSelector dateRange={dateRange} onChange={setDateRange} />}
    >
      <Section>
        <SectionErrorBoundary sectionName="가격대별 구매 빈도">
          <SectionHeader>
            <h2>가격대별 구매 빈도</h2>
            <DataExportButton dateRange={dateRange} />
          </SectionHeader>
          <PurchaseChart
            data={purchaseAnalytics.data || []}
            isLoading={purchaseAnalytics.isLoading}
            error={purchaseAnalytics.error}
            onRetry={purchaseAnalytics.refetch}
          />
        </SectionErrorBoundary>
      </Section>

      <Section>
        <SectionErrorBoundary sectionName="고객 목록">
          <SectionHeader>
            <h2>고객 목록</h2>
            <Controls>
              <CustomerSearchBar value={customerList.name} onChange={customerList.setName} />
              <CustomerSortDropdown sortBy={customerList.sortBy} onSort={customerList.setSortBy} />
            </Controls>
          </SectionHeader>
          <CustomerListTable
            customers={customerList.customers}
            isLoading={customerList.isLoading}
            error={customerList.error}
            onCustomerClick={handleCustomerClick}
            onRetry={customerList.refetch}
          />
          {customerList.pagination && (
            <Pagination
              currentPage={customerList.pagination.page}
              totalPages={customerList.pagination.totalPages}
              onPageChange={customerList.setPage}
            />
          )}
        </SectionErrorBoundary>
      </Section>

      {selectedCustomerId && selectedCustomer && (
        <SectionErrorBoundary sectionName="고객 상세 정보">
          <CustomerDetailDialog
            customerName={selectedCustomer.name}
            purchases={customerDetail.data || []}
            isLoading={customerDetail.isLoading}
            error={customerDetail.error}
            onClose={handleCloseModal}
            onRetry={customerDetail.refetch}
          />
        </SectionErrorBoundary>
      )}
    </AppLayout>
  )
}

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
