import { useState } from 'react'
import { usePurchaseFrequency } from './hooks/usePurchaseFrequency'
import { PurchaseFrequencyTable } from './components/PurchaseFrequencyTable'
import { DEFAULT_DATE_RANGE } from './constants'

function App() {
  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE)
  const { data, isLoading, error } = usePurchaseFrequency(dateRange)

  return (
    <div>
      <h1>쇼핑몰 구매 데이터 대시보드</h1>

      <section>
        <h2>가격대별 구매 빈도</h2>
        <PurchaseFrequencyTable data={data || []} isLoading={isLoading} error={error} />
      </section>
    </div>
  )
}

export default App
