import { useEffect, useRef } from 'react'

interface UseFocusTrapOptions {
  isActive: boolean
  onEscape?: () => void
}

export function useFocusTrap({ isActive, onEscape }: UseFocusTrapOptions) {
  const elementRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive) return

    previousActiveElement.current = document.activeElement as HTMLElement

    const trapElement = elementRef.current
    if (trapElement) {
      const focusableElements = trapElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      const firstFocusable = focusableElements[0] as HTMLElement

      if (firstFocusable) {
        firstFocusable.focus()
      } else {
        trapElement.focus()
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape()
      }
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !trapElement) return

      const focusableElements = trapElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleTabKey)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleTabKey)

      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [isActive, onEscape])

  return elementRef
}
