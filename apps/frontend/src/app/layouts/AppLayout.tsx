import { ReactNode } from 'react'
import styled from '@emotion/styled'
import { Header } from './Header'

interface Props {
  children: ReactNode
  headerTitle: string
  headerActions?: ReactNode
}

export function AppLayout({ children, headerTitle, headerActions }: Props) {
  return (
    <Container>
      <Header title={headerTitle} actions={headerActions} />
      <Main>{children}</Main>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  background-color: var(--color-gray-50);
`

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
  padding-top: 180px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
`
