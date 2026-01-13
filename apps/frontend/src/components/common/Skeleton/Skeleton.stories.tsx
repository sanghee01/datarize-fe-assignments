import type { Meta, StoryObj } from '@storybook/react'
import styled from '@emotion/styled'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Common/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
      description: '스켈레톤의 너비',
    },
    height: {
      control: 'text',
      description: '스켈레톤의 높이',
    },
    variant: {
      control: 'select',
      options: ['text', 'rectangular', 'circular'],
      description: '스켈레톤의 형태',
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    width: '200px',
    height: '1rem',
    variant: 'text',
  },
}

export const Rectangular: Story = {
  args: {
    width: '300px',
    height: '200px',
    variant: 'rectangular',
  },
}

export const TableRow: Story = {
  render: () => (
    <Table>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>이름</Th>
          <Th>금액</Th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <tr key={index}>
            <Td>
              <Skeleton width="30px" height="20px" />
            </Td>
            <Td>
              <Skeleton width="80px" height="20px" />
            </Td>
            <Td>
              <Skeleton width="100px" height="20px" />
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  text-align: left;
  padding: var(--spacing-md);
  background-color: var(--color-gray-50);
  border-bottom: 2px solid var(--color-border);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-gray-600);
`

const Td = styled.td`
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
`
