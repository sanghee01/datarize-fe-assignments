import styled from '@emotion/styled'
import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  width?: string
  height?: string
  className?: string
}

export function ImageWithFallback({ src, alt, width = '100px', height = '100px', className }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <Placeholder width={width} height={height} className={className}>
        <PlaceholderIcon>📦</PlaceholderIcon>
        <PlaceholderText>이미지 없음</PlaceholderText>
      </Placeholder>
    )
  }

  return (
    <StyledImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setHasError(true)}
    />
  )
}

const StyledImage = styled.img<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
`

const Placeholder = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 6px;
  flex-shrink: 0;
  background-color: var(--color-gray-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  border: 1px dashed var(--color-border);
`

const PlaceholderIcon = styled.div`
  font-size: 2rem;
`

const PlaceholderText = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
`
