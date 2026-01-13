import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { useState } from 'react'
import { Button } from '../Button'

const meta = {
  title: 'Common/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
    title: '모달 제목',
    children: <div>모달 내용입니다.</div>,
  },
}

export const WithLongContent: Story = {
  args: {
    isOpen: true,
    title: '긴 내용을 가진 모달',
    children: (
      <div>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        ))}
      </div>
    ),
  },
}

export const WithoutTitle: Story = {
  args: {
    isOpen: true,
    children: <div>제목 없는 모달입니다.</div>,
  },
}

export const Interactive = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="인터랙티브 모달">
        <p>모달 오버레이나 닫기 버튼을 클릭하여 모달을 닫을 수 있습니다.</p>
        <Button onClick={() => setIsOpen(false)}>닫기</Button>
      </Modal>
    </div>
  )
}
