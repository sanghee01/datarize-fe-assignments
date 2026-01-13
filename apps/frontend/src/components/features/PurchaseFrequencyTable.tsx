import styled from '@emotion/styled'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { PurchaseFrequency } from '../../types'
import { formatPriceRange } from '../../utils/priceRange'
import { Skeleton } from '../common/Skeleton'
import { ErrorMessage } from '../common/ErrorMessage'
import { EmptyState } from '../common/EmptyState'
import { getErrorMessage } from '../../api/errors'

interface Props {
  data: PurchaseFrequency[]
  isLoading: boolean
  error: Error | null
  onRetry?: () => void
}

export function PurchaseFrequencyTable({ data, isLoading, error, onRetry }: Props) {
  if (isLoading) {
    return (
      <ChartContainer>
        <SkeletonWrapper>
          <Skeleton height="400px" variant="rectangular" />
        </SkeletonWrapper>
      </ChartContainer>
    )
  }

  if (error) {
    return <ErrorMessage message={getErrorMessage(error)} onRetry={onRetry} />
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon="📊"
        title="구매 빈도 데이터가 없습니다"
        description="아직 가격대별 구매 통계가 없어요. 고객의 구매가 쌓이면 차트가 표시됩니다."
      />
    )
  }

  const chartData = data.map((item) => ({
    name: formatPriceRange(item.range),
    value: item.count,
  }))

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis dataKey="name" label={{ value: '가격대', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: '인원수', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            formatter={(value: number | undefined) => {
              if (value === undefined) return ['0명', '인원수']
              return [`${value}명`, '인원수']
            }}
            labelFormatter={(label) => `가격대: ${label}`}
            labelStyle={{ color: 'var(--color-gray-900)' }}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
            }}
          />
          <Bar dataKey="value" fill="var(--color-primary)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

const ChartContainer = styled.div`
  width: 100%;
  padding: var(--spacing-md);
`

const SkeletonWrapper = styled.div`
  width: 100%;
  height: 400px;
`
