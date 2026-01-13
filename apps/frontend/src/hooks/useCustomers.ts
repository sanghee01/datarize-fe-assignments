import { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchCustomers } from '../api/customers'
import type { DateRange } from '../types'

export function useCustomers(dateRange: DateRange) {
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | null>(null)
  const [name, setName] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['customers', dateRange, page, sortBy, name],
    queryFn: () =>
      fetchCustomers({
        page,
        sortBy: sortBy || undefined,
        name: name || undefined,
        from: dateRange.from,
        to: dateRange.to,
      }),
    placeholderData: keepPreviousData,
  })

  return {
    customers: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    page,
    setPage,
    sortBy,
    setSortBy,
    name,
    setName,
  }
}
