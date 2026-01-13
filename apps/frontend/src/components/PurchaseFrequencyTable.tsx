import styled from '@emotion/styled'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { PurchaseFrequency } from '../types'
import { formatPriceRange } from '../utils/priceRange'
import { Skeleton } from './common/Skeleton'
import { getErrorMessage } from '../api/errors'

interface Props {
  data: PurchaseFrequency[]
  isLoading: boolean
  error: Error | null
}

export function PurchaseFrequencyTable({ data, isLoading, error }: Props) {
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
    return <ErrorMessage>{getErrorMessage(error)}</ErrorMessage>
  }

  if (!data || data.length === 0) {
    return <Message>데이터가 없습니다.</Message>
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

const Message = styled.div`
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-gray-600);
`

const ErrorMessage = styled(Message)`
  color: var(--color-error);
`

const SkeletonWrapper = styled.div`
  width: 100%;
  height: 400px;
`
