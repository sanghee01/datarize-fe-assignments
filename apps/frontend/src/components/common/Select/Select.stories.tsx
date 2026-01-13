import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const meta = {
  title: 'Common/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <option value="">선택하세요</option>
        <option value="1">옵션 1</option>
        <option value="2">옵션 2</option>
        <option value="3">옵션 3</option>
      </>
    ),
  },
}

export const SortOrder: Story = {
  args: {
    children: (
      <>
        <option value="">ID 순</option>
        <option value="desc">구매 금액 높은 순</option>
        <option value="asc">구매 금액 낮은 순</option>
      </>
    ),
  },
}

export const WithSelected: Story = {
  args: {
    value: '2',
    children: (
      <>
        <option value="1">옵션 1</option>
        <option value="2">옵션 2</option>
        <option value="3">옵션 3</option>
      </>
    ),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <option value="">선택하세요</option>
        <option value="1">옵션 1</option>
        <option value="2">옵션 2</option>
      </>
    ),
  },
}

