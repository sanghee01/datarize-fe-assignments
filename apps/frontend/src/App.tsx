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
import { Pagination } from './components/Pagination'
import { CustomerDetailModal } from './components/CustomerDetailModal'
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
    <div>
      <h1>쇼핑몰 구매 데이터 대시보드</h1>

      <DateRangePicker dateRange={dateRange} onChange={setDateRange} />

      <section>
        <h2>가격대별 구매 빈도</h2>
        <CSVDownloadButton dateRange={dateRange} />
        <PurchaseFrequencyTable data={data || []} isLoading={isLoading} error={error} />
      </section>

      <section>
        <h2>고객 목록</h2>
        <div>
          <CustomerSearchInput value={customers.name} onChange={customers.setName} />
          <SortSelect sortBy={customers.sortBy} onSort={customers.setSortBy} />
        </div>
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
      </section>

      {selectedCustomerId && selectedCustomer && (
        <CustomerDetailModal
          customerName={selectedCustomer.name}
          purchases={customerPurchases.data || []}
          isLoading={customerPurchases.isLoading}
          error={customerPurchases.error}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default App
