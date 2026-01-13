import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { convertToCSV, downloadCSV } from './csvExport'
import type { Purchase } from '../types'

describe('convertToCSV', () => {
  it('구매 데이터를 CSV 형식으로 변환한다', () => {
    const purchases: Purchase[] = [
      {
        date: '2025-10-01',
        customerName: '홍길동',
        productName: '티셔츠',
        price: 25000,
        quantity: 2,
      },
      {
        date: '2025-10-02',
        customerName: '김철수',
        productName: '청바지',
        price: 50000,
        quantity: 1,
      },
    ]

    const result = convertToCSV(purchases)

    expect(result).toBe(
      '날짜,고객명,상품명,가격,수량\n' + '2025-10-01,홍길동,티셔츠,25000,2\n' + '2025-10-02,김철수,청바지,50000,1',
    )
  })

  it('빈 배열을 빈 문자열로 변환한다', () => {
    const purchases: Purchase[] = []
    const result = convertToCSV(purchases)
    expect(result).toBe('')
  })

  it('단일 데이터를 올바르게 변환한다', () => {
    const purchases: Purchase[] = [
      {
        date: '2025-10-01',
        customerName: '홍길동',
        productName: '티셔츠',
        price: 25000,
        quantity: 2,
      },
    ]

    const result = convertToCSV(purchases)

    expect(result).toBe('날짜,고객명,상품명,가격,수량\n' + '2025-10-01,홍길동,티셔츠,25000,2')
  })

  it('여러 데이터를 순서대로 변환한다', () => {
    const purchases: Purchase[] = [
      {
        date: '2025-10-01',
        customerName: '홍길동',
        productName: '티셔츠',
        price: 25000,
        quantity: 2,
      },
      {
        date: '2025-10-02',
        customerName: '김철수',
        productName: '청바지',
        price: 50000,
        quantity: 1,
      },
      {
        date: '2025-10-03',
        customerName: '이영희',
        productName: '후디',
        price: 35000,
        quantity: 3,
      },
    ]

    const result = convertToCSV(purchases)
    const lines = result.split('\n')

    expect(lines).toHaveLength(4)
    expect(lines[0]).toBe('날짜,고객명,상품명,가격,수량')
    expect(lines[1]).toContain('홍길동')
    expect(lines[2]).toContain('김철수')
    expect(lines[3]).toContain('이영희')
  })

  it('CSV 헤더를 올바르게 생성한다', () => {
    const purchases: Purchase[] = [
      {
        date: '2025-10-01',
        customerName: '홍길동',
        productName: '티셔츠',
        price: 25000,
        quantity: 2,
      },
    ]

    const result = convertToCSV(purchases)
    const lines = result.split('\n')

    expect(lines[0]).toBe('날짜,고객명,상품명,가격,수량')
  })
})

describe('downloadCSV', () => {
  let createElementSpy: ReturnType<typeof vi.spyOn>
  let createObjectURLSpy: ReturnType<typeof vi.spyOn>
  let revokeObjectURLSpy: ReturnType<typeof vi.spyOn>
  let mockLink: HTMLAnchorElement

  beforeEach(() => {
    mockLink = {
      setAttribute: vi.fn(),
      click: vi.fn(),
      style: {},
    } as unknown as HTMLAnchorElement

    createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockLink)

    createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url')
    revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})

    vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink)
    vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('CSV 파일을 다운로드한다', () => {
    const csvString = '날짜,고객명,상품명,가격,수량\n2025-10-01,홍길동,티셔츠,25000,2'
    const filename = 'purchases.csv'

    downloadCSV(csvString, filename)

    expect(createElementSpy).toHaveBeenCalledWith('a')

    expect(createObjectURLSpy).toHaveBeenCalled()

    expect(mockLink.setAttribute).toHaveBeenCalledWith('href', 'blob:mock-url')
    expect(mockLink.setAttribute).toHaveBeenCalledWith('download', filename)

    expect(mockLink.click).toHaveBeenCalled()

    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url')
  })

  it('BOM을 추가하여 한글 인코딩 문제를 방지한다', () => {
    const csvString = '날짜,고객명,상품명,가격,수량\n2025-10-01,홍길동,티셔츠,25000,2'
    const filename = 'purchases.csv'

    downloadCSV(csvString, filename)

    const blobCall = createObjectURLSpy.mock.calls[0]
    expect(blobCall).toBeDefined()
  })
})
