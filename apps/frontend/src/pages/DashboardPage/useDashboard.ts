import { useState, useCallback, useMemo } from 'react'
import { usePurchaseAnalytics } from '@/features/purchase-analytics'
import { useCustomerList, type Customer } from '@/features/customer-list'
import { useCustomerDetail } from '@/features/customer-detail'
import { DEFAULT_DATE_RANGE } from '@/shared/config'
import type { DateRange } from '@/shared/types'

export function useDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>(DEFAULT_DATE_RANGE)
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)

  const purchaseAnalytics = usePurchaseAnalytics(dateRange)
  const customerList = useCustomerList(dateRange)
  const customerDetail = useCustomerDetail(selectedCustomerId, dateRange)

  const handleCustomerClick = useCallback((customerId: number) => {
    setSelectedCustomerId(customerId)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedCustomerId(null)
  }, [])

  const selectedCustomer = useMemo(
    () => customerList.customers.find((customer: Customer) => customer.id === selectedCustomerId),
    [customerList.customers, selectedCustomerId],
  )

  return {
    dateRange,
    setDateRange,
    selectedCustomerId,
    selectedCustomer,

    purchaseAnalytics,
    customerList,
    customerDetail,

    handleCustomerClick,
    handleCloseModal,
  }
}
