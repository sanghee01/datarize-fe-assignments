import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

interface SkeletonProps {
  width?: string
  height?: string
  variant?: 'text' | 'rectangular' | 'circular'
  className?: string
}

export function Skeleton({ width = '100%', height = '1rem', variant = 'text', className }: SkeletonProps) {
  return <StyledSkeleton width={width} height={height} variant={variant} className={className} />
}

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

const StyledSkeleton = styled.div<{ width: string; height: string; variant: string }>`
  display: inline-block;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: linear-gradient(90deg, var(--color-gray-200) 25%, var(--color-gray-100) 50%, var(--color-gray-200) 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: ${(props) => {
    if (props.variant === 'circular') return '50%'
    if (props.variant === 'text') return '4px'
    return '8px'
  }};
`
