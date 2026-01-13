import type { Meta, StoryObj } from '@storybook/react'
import { SectionErrorBoundary } from './SectionErrorBoundary'
import { useState } from 'react'
import { Button } from '../Button'

// 의도적으로 에러를 발생시키는 컴포넌트
const ErrorTrigger = ({ shouldError }: { shouldError: boolean }) => {
  if (shouldError) {
    throw new Error('섹션 로딩 에러')
  }
  return (
    <div style={{ padding: '1rem' }}>
      <p>섹션이 정상적으로 로드되었습니다.</p>
    </div>
  )
}

const meta = {
  title: 'Shared/UI/SectionErrorBoundary',
  component: SectionErrorBoundary,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    sectionName: {
      control: 'text',
      description: '섹션 이름',
    },
  },
} satisfies Meta<typeof SectionErrorBoundary>

export default meta
type Story = StoryObj<typeof meta>

// 정상 상태
export const Normal: Story = {
  args: {
    sectionName: '고객 목록',
    children: (
      <div style={{ padding: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>ID</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>이름</th>
              <th style={{ textAlign: 'right', padding: '0.5rem' }}>구매 금액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem' }}>1</td>
              <td style={{ padding: '0.5rem' }}>홍길동</td>
              <td style={{ textAlign: 'right', padding: '0.5rem' }}>50,000원</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
}

// 에러 상태 - 고객 목록
export const CustomerListError: Story = {
  args: {
    sectionName: '고객 목록',
    children: <ErrorTrigger shouldError={true} />,
  },
}

// 에러 상태 - 구매 빈도
export const PurchaseFrequencyError: Story = {
  args: {
    sectionName: '가격대별 구매 빈도',
    children: <ErrorTrigger shouldError={true} />,
  },
}

// 에러 상태 - 고객 상세
export const CustomerDetailError: Story = {
  args: {
    sectionName: '고객 상세 정보',
    children: <ErrorTrigger shouldError={true} />,
  },
}

// 인터랙티브 데모
export const Interactive = () => {
  const [hasError, setHasError] = useState(false)
  const [key, setKey] = useState(0)

  const triggerError = () => {
    setHasError(true)
    setKey((k) => k + 1)
  }

  const reset = () => {
    setHasError(false)
    setKey((k) => k + 1)
  }

  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <Button onClick={triggerError}>에러 발생시키기</Button>
        <Button onClick={reset} variant="secondary">
          리셋
        </Button>
      </div>

      <SectionErrorBoundary key={key} sectionName="테스트 섹션">
        <div
          style={{
            padding: '2rem',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: 'white',
          }}
        >
          {hasError ? (
            <ErrorTrigger shouldError={true} />
          ) : (
            <div>
              <h3>섹션 정상 작동 중</h3>
              <p>위의 "에러 발생시키기" 버튼을 클릭하여 에러 UI를 확인하세요.</p>
            </div>
          )}
        </div>
      </SectionErrorBoundary>
    </div>
  )
}

