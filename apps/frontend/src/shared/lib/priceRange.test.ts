import { describe, it, expect } from 'vitest'
import { formatPriceRange } from './priceRange'

describe('formatPriceRange', () => {
  it('0 - 20000 범위를 "2만원 이하"로 변환한다', () => {
    expect(formatPriceRange('0 - 20000')).toBe('2만원 이하')
  })

  it('100001 - Infinity 범위를 "10만원 이상"으로 변환한다', () => {
    expect(formatPriceRange('100001 - Infinity')).toBe('10만원 이상')
  })

  it('20001 - 30000 범위를 "2~3만원"으로 변환한다', () => {
    expect(formatPriceRange('20001 - 30000')).toBe('2~3만원')
  })

  it('30001 - 40000 범위를 "3~4만원"으로 변환한다', () => {
    expect(formatPriceRange('30001 - 40000')).toBe('3~4만원')
  })

  it('40001 - 50000 범위를 "4~5만원"으로 변환한다', () => {
    expect(formatPriceRange('40001 - 50000')).toBe('4~5만원')
  })

  it('50001 - 60000 범위를 "5~6만원"으로 변환한다', () => {
    expect(formatPriceRange('50001 - 60000')).toBe('5~6만원')
  })

  it('60001 - 70000 범위를 "6~7만원"으로 변환한다', () => {
    expect(formatPriceRange('60001 - 70000')).toBe('6~7만원')
  })

  it('70001 - 80000 범위를 "7~8만원"으로 변환한다', () => {
    expect(formatPriceRange('70001 - 80000')).toBe('7~8만원')
  })

  it('80001 - 90000 범위를 "8~9만원"으로 변환한다', () => {
    expect(formatPriceRange('80001 - 90000')).toBe('8~9만원')
  })

  it('90001 - 100000 범위를 "9~10만원"으로 변환한다', () => {
    expect(formatPriceRange('90001 - 100000')).toBe('9~10만원')
  })

  it('100001 - Infinity 범위를 올바르게 처리한다', () => {
    expect(formatPriceRange('100001 - Infinity')).toBe('10만원 이상')
  })
})
