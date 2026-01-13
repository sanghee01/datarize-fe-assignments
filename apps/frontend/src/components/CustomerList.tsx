import type { Customer } from '../types'

interface Props {
  customers: Customer[]
  isLoading: boolean
  error: Error | null
  onCustomerClick: (customerId: number) => void
}

export function CustomerList({ customers, isLoading, error, onCustomerClick }: Props) {
  if (isLoading) {
    return <div>로딩 중...</div>
  }

  if (error) {
    return <div>에러 발생: {error.message}</div>
  }

  if (customers.length === 0) {
    return <div>고객 데이터가 없습니다.</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>이름</th>
          <th>구매 횟수</th>
          <th>구매 금액</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id} onClick={() => onCustomerClick(customer.id)} style={{ cursor: 'pointer' }}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.count}</td>
            <td>{customer.totalAmount.toLocaleString()}원</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
