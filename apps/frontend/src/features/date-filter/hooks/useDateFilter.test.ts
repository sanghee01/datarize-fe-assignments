import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDateFilter } from './useDateFilter'

describe('useDateFilter', () => {
  it('초기 상태가 올바르게 설정된다', () => {
    const { result } = renderHook(() => useDateFilter())

    expect(result.current.error).toBeNull()
    expect(result.current.touched).toEqual({ from: false, to: false })
  })

  describe('날짜 검증', () => {
    it('시작일이 종료일보다 늦으면 에러를 반환한다', () => {
      const { result } = renderHook(() => useDateFilter())

      act(() => {
        result.current.handleFromChange({ from: '2025-12-31', to: '2025-10-01' })
      })

      expect(result.current.error).toBe('시작일은 종료일보다 이전이어야 합니다.')
    })

    it('시작일이 종료일보다 이르면 에러가 없다', () => {
      const { result } = renderHook(() => useDateFilter())

      act(() => {
        result.current.handleFromChange({ from: '2025-10-01', to: '2025-12-31' })
      })

      expect(result.current.error).toBeNull()
    })

    it('시작일과 종료일이 같으면 에러가 없다', () => {
      const { result } = renderHook(() => useDateFilter())

      act(() => {
        result.current.handleFromChange({ from: '2025-10-01', to: '2025-10-01' })
      })

      expect(result.current.error).toBeNull()
    })

    it('날짜가 비어있으면 에러가 없다', () => {
      const { result } = renderHook(() => useDateFilter())

      act(() => {
        result.current.handleFromChange({ from: '', to: '' })
      })

      expect(result.current.error).toBeNull()
    })

    it('시작일만 있고 종료일이 없으면 에러가 없다', () => {
      const { result } = renderHook(() => useDateFilter())

      act(() => {
        result.current.handleFromChange({ from: '2025-10-01', to: '' })
      })

      expect(result.current.error).toBeNull()
    })

    it('종료일만 있고 시작일이 없으면 에러가 없다', () => {
      const { result } = renderHook(() => useDateFilter())

      act(() => {
        result.current.handleFromChange({ from: '', to: '2025-12-31' })
      })

      expect(result.current.error).toBeNull()
    })
  })

  describe('touched 상태 관리', () => {
    it('handleFromChange 호출 시 from이 touched로 변경된다', () => {
      const { result } = renderHook(() => useDateFilter())

      expect(result.current.touched.from).toBe(false)

      act(() => {
        result.current.handleFromChange({ from: '2025-10-01', to: '2025-12-31' })
      })

      expect(result.current.touched.from).toBe(true)
    })

    it('handleToChange 호출 시 to가 touched로 변경된다', () => {
      const { result } = renderHook(() => useDateFilter())

      expect(result.current.touched.to).toBe(false)

      act(() => {
        result.current.handleToChange({ from: '2025-10-01', to: '2025-12-31' })
      })

      expect(result.current.touched.to).toBe(true)
    })

    it('여러 번 변경해도 touched 상태가 유지된다', () => {
      const { result } = renderHook(() => useDateFilter())

      act(() => {
        result.current.handleFromChange({ from: '2025-10-01', to: '2025-12-31' })
      })

      act(() => {
        result.current.handleFromChange({ from: '2025-11-01', to: '2025-12-31' })
      })

      expect(result.current.touched.from).toBe(true)
    })
  })

  describe('에러 상태 업데이트', () => {
    it('유효한 날짜로 변경하면 에러가 사라진다', () => {
      const { result } = renderHook(() => useDateFilter())

      act(() => {
        result.current.handleFromChange({ from: '2025-12-31', to: '2025-10-01' })
      })

      expect(result.current.error).toBe('시작일은 종료일보다 이전이어야 합니다.')

      act(() => {
        result.current.handleFromChange({ from: '2025-10-01', to: '2025-12-31' })
      })

      expect(result.current.error).toBeNull()
    })

    it('handleToChange로 날짜를 변경해도 검증이 작동한다', () => {
      const { result } = renderHook(() => useDateFilter())

      act(() => {
        result.current.handleToChange({ from: '2025-12-31', to: '2025-10-01' })
      })

      expect(result.current.error).toBe('시작일은 종료일보다 이전이어야 합니다.')
    })
  })

  describe('경계값 테스트', () => {
    it('연도 경계를 넘는 날짜 범위를 올바르게 검증한다', () => {
      const { result } = renderHook(() => useDateFilter())

      act(() => {
        result.current.handleFromChange({ from: '2024-12-31', to: '2025-01-01' })
      })

      expect(result.current.error).toBeNull()
    })

    it('같은 날짜의 다른 시간대를 올바르게 처리한다', () => {
      const { result } = renderHook(() => useDateFilter())

      act(() => {
        result.current.handleFromChange({ from: '2025-10-15', to: '2025-10-15' })
      })

      expect(result.current.error).toBeNull()
    })
  })
})
