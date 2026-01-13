import type { Meta, StoryObj } from '@storybook/react'
import { ErrorMessage } from './ErrorMessage'

const meta = {
  title: 'Shared/UI/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: '에러 메시지',
    },
    onRetry: {
      description: '재시도 콜백 함수 (선택)',
    },
  },
} satisfies Meta<typeof ErrorMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message: '데이터를 불러오는 중 문제가 발생했습니다.',
    onRetry: () => alert('재시도!'),
  },
}

export const WithoutRetry: Story = {
  args: {
    message: '데이터를 불러오는 중 문제가 발생했습니다.',
  },
}

export const NetworkError: Story = {
  args: {
    message: '서버와 연결할 수 없습니다. 네트워크 연결을 확인해주세요.',
    onRetry: () => alert('재시도!'),
  },
}

export const NotFoundError: Story = {
  args: {
    message: '요청하신 데이터를 찾을 수 없습니다.',
    onRetry: () => alert('재시도!'),
  },
}

export const ServerError: Story = {
  args: {
    message: '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    onRetry: () => alert('재시도!'),
  },
}
