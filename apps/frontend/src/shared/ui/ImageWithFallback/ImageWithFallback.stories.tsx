import type { Meta, StoryObj } from '@storybook/react'
import { ImageWithFallback } from './ImageWithFallback'

const meta = {
  title: 'Shared/UI/ImageWithFallback',
  component: ImageWithFallback,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: '이미지 URL',
    },
    alt: {
      control: 'text',
      description: '대체 텍스트',
    },
    width: {
      control: 'text',
      description: '이미지 너비',
    },
    height: {
      control: 'text',
      description: '이미지 높이',
    },
  },
} satisfies Meta<typeof ImageWithFallback>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    src: 'http://localhost:4000/imgs/tshirts.jpg',
    alt: '티셔츠',
    width: '100px',
    height: '100px',
  },
}

export const Error: Story = {
  args: {
    src: 'http://localhost:4000/imgs/non-existent-image.jpg',
    alt: '존재하지 않는 이미지',
    width: '100px',
    height: '100px',
  },
}
