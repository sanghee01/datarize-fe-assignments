import { ErrorBoundary } from '@/shared/ui/ErrorBoundary'
import { QueryProvider, RouterProvider } from './providers'
import './styles/global.css'

function App() {
  return (
    <ErrorBoundary fallbackMessage="애플리케이션에 문제가 발생했습니다." showReload={true}>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </ErrorBoundary>
  )
}

export default App
