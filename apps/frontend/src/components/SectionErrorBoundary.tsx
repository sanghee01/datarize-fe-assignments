import { Component, ReactNode } from 'react'
import styled from '@emotion/styled'

interface Props {
  children: ReactNode
  sectionName: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[${this.props.sectionName}] Error:`, error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>{this.props.sectionName} 로딩 실패</ErrorTitle>
          <ErrorMessage>데이터를 불러오는 중 문제가 발생했습니다.</ErrorMessage>
          <ResetButton onClick={this.handleReset}>다시 시도</ResetButton>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}

const ErrorContainer = styled.div`
  padding: var(--spacing-xl);
  text-align: center;
  background-color: var(--color-gray-50);
  border-radius: 8px;
  border: 1px solid var(--color-border);
`

const ErrorIcon = styled.div`
  font-size: 2rem;
  margin-bottom: var(--spacing-sm);
`

const ErrorTitle = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-sm);
`

const ErrorMessage = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-md);
`

const ResetButton = styled.button`
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`
