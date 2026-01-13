import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getCustomers } from './getCustomers'
import * as apiClient from '@/shared/api/client'
import type { GetCustomersResponse } from '../types'

describe('getCustomers', () => {
  let fetchAPISpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    fetchAPISpy = vi.spyOn(apiClient, 'fetchAPI')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('파라미터 없이 고객 목록을 조회한다', async () => {
    const mockResponse: GetCustomersResponse = {
      data: [
        { id: 1, name: '홍길동', count: 5, totalAmount: 500000 },
        { id: 2, name: '김철수', count: 3, totalAmount: 300000 },
      ],
      pagination: {
        page: 1,
        limit: 20,
        total: 2,
        totalPages: 1,
      },
    }

    fetchAPISpy.mockResolvedValue(mockResponse)

    const result = await getCustomers()

    expect(fetchAPISpy).toHaveBeenCalledWith('/api/customers')
    expect(result).toEqual(mockResponse)
  })

  it('정렬 파라미터를 포함하여 조회한다', async () => {
    const mockResponse: GetCustomersResponse = {
      data: [{ id: 1, name: '홍길동', count: 5, totalAmount: 500000 }],
      pagination: {
        page: 1,
        limit: 20,
        total: 1,
        totalPages: 1,
      },
    }

    fetchAPISpy.mockResolvedValue(mockResponse)

    await getCustomers({ sortBy: 'desc' })

    expect(fetchAPISpy).toHaveBeenCalledWith('/api/customers?sortBy=desc')
  })

  it('이름 검색 파라미터를 포함하여 조회한다', async () => {
    const mockResponse: GetCustomersResponse = {
      data: [{ id: 1, name: '홍길동', count: 5, totalAmount: 500000 }],
      pagination: {
        page: 1,
        limit: 20,
        total: 1,
        totalPages: 1,
      },
    }

    fetchAPISpy.mockResolvedValue(mockResponse)

    await getCustomers({ name: '홍길동' })

    expect(fetchAPISpy).toHaveBeenCalledWith('/api/customers?name=%ED%99%8D%EA%B8%B8%EB%8F%99')
  })

  it('페이지네이션 파라미터를 포함하여 조회한다', async () => {
    const mockResponse: GetCustomersResponse = {
      data: [],
      pagination: {
        page: 2,
        limit: 10,
        total: 50,
        totalPages: 5,
      },
    }

    fetchAPISpy.mockResolvedValue(mockResponse)

    await getCustomers({ page: 2, limit: 10 })

    expect(fetchAPISpy).toHaveBeenCalledWith('/api/customers?page=2&limit=10')
  })

  it('날짜 범위 파라미터를 포함하여 조회한다', async () => {
    const mockResponse: GetCustomersResponse = {
      data: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
      },
    }

    fetchAPISpy.mockResolvedValue(mockResponse)

    await getCustomers({ from: '2025-10-01', to: '2025-12-31' })

    expect(fetchAPISpy).toHaveBeenCalledWith('/api/customers?from=2025-10-01&to=2025-12-31')
  })

  it('여러 파라미터를 동시에 사용하여 조회한다', async () => {
    const mockResponse: GetCustomersResponse = {
      data: [{ id: 1, name: '홍길동', count: 5, totalAmount: 500000 }],
      pagination: {
        page: 2,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
    }

    fetchAPISpy.mockResolvedValue(mockResponse)

    await getCustomers({
      sortBy: 'asc',
      name: '홍길동',
      page: 2,
      limit: 10,
      from: '2025-10-01',
      to: '2025-12-31',
    })

    const expectedUrl =
      '/api/customers?sortBy=asc&name=%ED%99%8D%EA%B8%B8%EB%8F%99&page=2&limit=10&from=2025-10-01&to=2025-12-31'
    expect(fetchAPISpy).toHaveBeenCalledWith(expectedUrl)
  })

  it('빈 응답을 올바르게 처리한다', async () => {
    const mockResponse: GetCustomersResponse = {
      data: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
      },
    }

    fetchAPISpy.mockResolvedValue(mockResponse)

    const result = await getCustomers()

    expect(result.data).toHaveLength(0)
    expect(result.pagination.total).toBe(0)
  })

  it('API 에러를 올바르게 전파한다', async () => {
    const error = new Error('Network error')
    fetchAPISpy.mockRejectedValue(error)

    await expect(getCustomers()).rejects.toThrow('Network error')
  })

  describe('쿼리 파라미터 빌더', () => {
    it('undefined 값은 쿼리 파라미터에 포함하지 않는다', async () => {
      const mockResponse: GetCustomersResponse = {
        data: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
        },
      }

      fetchAPISpy.mockResolvedValue(mockResponse)

      await getCustomers({ sortBy: 'asc', name: undefined, page: undefined })

      expect(fetchAPISpy).toHaveBeenCalledWith('/api/customers?sortBy=asc')
    })

    it('빈 문자열은 쿼리 파라미터에 포함하지 않는다', async () => {
      const mockResponse: GetCustomersResponse = {
        data: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
        },
      }

      fetchAPISpy.mockResolvedValue(mockResponse)

      await getCustomers({ name: '', from: '', to: '' })

      expect(fetchAPISpy).toHaveBeenCalledWith('/api/customers')
    })
  })

  describe('응답 데이터 구조 검증', () => {
    it('고객 데이터 구조가 올바른지 확인한다', async () => {
      const mockResponse: GetCustomersResponse = {
        data: [
          {
            id: 1,
            name: '홍길동',
            count: 5,
            totalAmount: 500000,
          },
        ],
        pagination: {
          page: 1,
          limit: 20,
          total: 1,
          totalPages: 1,
        },
      }

      fetchAPISpy.mockResolvedValue(mockResponse)

      const result = await getCustomers()

      expect(result.data[0]).toHaveProperty('id')
      expect(result.data[0]).toHaveProperty('name')
      expect(result.data[0]).toHaveProperty('count')
      expect(result.data[0]).toHaveProperty('totalAmount')
    })

    it('페이지네이션 구조가 올바른지 확인한다', async () => {
      const mockResponse: GetCustomersResponse = {
        data: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 100,
          totalPages: 5,
        },
      }

      fetchAPISpy.mockResolvedValue(mockResponse)

      const result = await getCustomers()

      expect(result.pagination).toHaveProperty('page')
      expect(result.pagination).toHaveProperty('limit')
      expect(result.pagination).toHaveProperty('total')
      expect(result.pagination).toHaveProperty('totalPages')
    })
  })
})
