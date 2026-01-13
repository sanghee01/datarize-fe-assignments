import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from './EmptyState'

const meta = {
  title: 'Shared/UI/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const CustomerList: Story = {
  args: {
    icon: '👥',
    title: '고객 데이터가 없습니다',
    description: '아직 등록된 고객 정보가 없어요. 고객이 구매를 하면 여기에 표시됩니다.',
  },
}

export const PurchaseFrequencyChart: Story = {
  args: {
    icon: '📊',
    title: '구매 빈도 데이터가 없습니다',
    description: '아직 가격대별 구매 통계가 없어요. 고객의 구매가 쌓이면 차트가 표시됩니다.',
  },
}

export const CustomerPurchaseHistory: Story = {
  args: {
    icon: '🛒',
    title: '구매 내역이 없습니다',
    description: '이 고객의 구매 기록이 아직 없어요.',
  },
}
