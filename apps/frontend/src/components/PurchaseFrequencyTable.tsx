import styled from '@emotion/styled'
import type { PurchaseFrequency } from '../types'

interface Props {
  data: PurchaseFrequency[]
  isLoading: boolean
  error: Error | null
}

export function PurchaseFrequencyTable({ data, isLoading, error }: Props) {
  if (isLoading) {
    return <Message>로딩 중...</Message>
  }

  if (error) {
    return <ErrorMessage>에러 발생: {error.message}</ErrorMessage>
  }

  if (!data || data.length === 0) {
    return <Message>데이터가 없습니다.</Message>
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>가격대</Th>
          <Th align="right">구매 횟수</Th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.range}>
            <Td>{item.range}</Td>
            <Td align="right">{item.count.toLocaleString()}회</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th<{ align?: string }>`
  text-align: ${(props) => props.align || 'left'};
  padding: var(--spacing-md);
  background-color: var(--color-gray-50);
  border-bottom: 2px solid var(--color-border);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-gray-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const Td = styled.td<{ align?: string }>`
  text-align: ${(props) => props.align || 'left'};
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--font-size-base);
  color: var(--color-gray-900);
`

const Message = styled.div`
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-gray-600);
`

const ErrorMessage = styled(Message)`
  color: var(--color-error);
`
