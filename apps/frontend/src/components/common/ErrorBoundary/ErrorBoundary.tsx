import { Component, ReactNode } from 'react'
import styled from '@emotion/styled'

interface Props {
  children: ReactNode
  fallbackMessage?: string
  showReload?: boolean
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorContent>
            <ErrorIcon>⚠️</ErrorIcon>
            <ErrorTitle>문제가 발생했습니다</ErrorTitle>
            <ErrorMessage>
              {this.props.fallbackMessage || '일시적인 오류가 발생했습니다.'}
              <br />
              {this.props.showReload && '페이지를 새로고침하거나 '}
              잠시 후 다시 시도해주세요.
            </ErrorMessage>
            {this.state.error && (
              <ErrorDetails>
                <summary>오류 상세 정보</summary>
                <pre>{this.state.error.message}</pre>
              </ErrorDetails>
            )}
            <ButtonGroup>
              <ResetButton onClick={this.handleReset}>다시 시도</ResetButton>
              {this.props.showReload && (
                <ReloadButton onClick={() => window.location.reload()}>페이지 새로고침</ReloadButton>
              )}
            </ButtonGroup>
          </ErrorContent>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-gray-50);
  padding: var(--spacing-xl);
`

const ErrorContent = styled.div`
  max-width: 500px;
  width: 100%;
  background: white;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  padding: var(--spacing-xl);
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
`

const ErrorTitle = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-md);
`

const ErrorMessage = styled.p`
  font-size: var(--font-size-base);
  color: var(--color-gray-600);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
`

const ErrorDetails = styled.details`
  text-align: left;
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background-color: var(--color-gray-50);
  border-radius: 4px;
  cursor: pointer;

  summary {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-gray-700);
    margin-bottom: var(--spacing-sm);
  }

  pre {
    font-size: var(--font-size-sm);
    color: var(--color-error);
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
`

const BaseButton = styled.button`
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: 6px;
  font-size: var(--font-size-base);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

const ResetButton = styled(BaseButton)`
  background-color: var(--color-primary);
  color: white;

  &:hover {
    background-color: var(--color-primary-hover);
  }
`

const ReloadButton = styled(BaseButton)`
  background-color: white;
  color: var(--color-gray-900);
  border: 1px solid var(--color-border);

  &:hover {
    background-color: var(--color-gray-50);
  }
`
