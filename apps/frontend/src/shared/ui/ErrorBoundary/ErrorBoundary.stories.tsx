import type { Meta, StoryObj } from '@storybook/react'
import { ErrorBoundary } from './ErrorBoundary'
import { useState } from 'react'
import { Button } from '../Button'

const ErrorTrigger = ({ shouldError }: { shouldError: boolean }) => {
  if (shouldError) {
    throw new Error('테스트 에러: 컴포넌트에서 의도적으로 발생시킨 에러입니다.')
  }
  return <div>정상적으로 렌더링된 컴포넌트입니다.</div>
}

const meta = {
  title: 'Shared/UI/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorBoundary>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    children: (
      <div style={{ padding: '2rem' }}>
        <h2>정상 작동 중</h2>
        <p>에러가 발생하지 않으면 자식 컴포넌트가 정상적으로 렌더링됩니다.</p>
      </div>
    ),
  },
}

export const WithError: Story = {
  args: {
    children: <ErrorTrigger shouldError={true} />,
  },
}

export const CustomErrorMessage: Story = {
  args: {
    fallbackMessage: '데이터를 불러오는 중 문제가 발생했습니다. 관리자에게 문의해주세요.',
    children: <ErrorTrigger shouldError={true} />,
  },
}

export const WithReloadButton: Story = {
  args: {
    fallbackMessage: '페이지 로드 중 오류가 발생했습니다.',
    showReload: true,
    children: <ErrorTrigger shouldError={true} />,
  },
}

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
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <Button onClick={triggerError}>에러 발생시키기</Button>
        <Button onClick={reset} variant="secondary">
          리셋
        </Button>
      </div>

      <ErrorBoundary key={key} fallbackMessage="컴포넌트에서 에러가 발생했습니다.">
        <div
          style={{
            padding: '2rem',
            border: '2px dashed #e5e7eb',
            borderRadius: '8px',
            minHeight: '200px',
          }}
        >
          {hasError ? (
            <ErrorTrigger shouldError={true} />
          ) : (
            <div>
              <h3>정상 작동 중</h3>
              <p>위의 "에러 발생시키기" 버튼을 클릭하여 ErrorBoundary의 동작을 확인하세요.</p>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </div>
  )
}
