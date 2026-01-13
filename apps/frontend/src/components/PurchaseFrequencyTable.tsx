import type { PurchaseFrequency } from '../types'

interface Props {
  data: PurchaseFrequency[]
  isLoading: boolean
  error: Error | null
}

export function PurchaseFrequencyTable({ data, isLoading, error }: Props) {
  if (isLoading) {
    return <div>로딩 중...</div>
  }

  if (error) {
    return <div>에러 발생: {error.message}</div>
  }

  if (!data || data.length === 0) {
    return <div>데이터가 없습니다.</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>가격대</th>
          <th>구매 횟수</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.range}>
            <td>{item.range}</td>
            <td>{item.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
