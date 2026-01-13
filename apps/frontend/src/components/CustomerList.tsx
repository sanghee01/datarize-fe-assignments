import styled from '@emotion/styled'
import type { Customer } from '../types'
import { Skeleton } from './common/Skeleton'
import { ErrorMessage } from './common/ErrorMessage'
import { getErrorMessage } from '../api/errors'

interface Props {
  customers: Customer[]
  isLoading: boolean
  error: Error | null
  onCustomerClick: (customerId: number) => void
  onRetry?: () => void
}

export function CustomerList({ customers, isLoading, error, onCustomerClick, onRetry }: Props) {
  if (isLoading) {
    return (
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>이름</Th>
            <Th align="right">구매 횟수</Th>
            <Th align="right">구매 금액</Th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index}>
              <Td>
                <Skeleton width="30px" height="20px" />
              </Td>
              <Td>
                <Skeleton width="80px" height="20px" />
              </Td>
              <Td align="right">
                <Skeleton width="50px" height="20px" />
              </Td>
              <Td align="right">
                <Skeleton width="100px" height="20px" />
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  if (error) {
    return <ErrorMessage message={getErrorMessage(error)} onRetry={onRetry} />
  }

  if (customers.length === 0) {
    return <Message>고객 데이터가 없습니다.</Message>
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>이름</Th>
          <Th align="right">구매 횟수</Th>
          <Th align="right">구매 금액</Th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <ClickableRow key={customer.id} onClick={() => onCustomerClick(customer.id)}>
            <Td>{customer.id}</Td>
            <Td>{customer.name}</Td>
            <Td align="right">{customer.count}회</Td>
            <Td align="right">{customer.totalAmount.toLocaleString()}원</Td>
          </ClickableRow>
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

const ClickableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: var(--color-gray-50);
  }
`

const Message = styled.div`
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-gray-600);
`
