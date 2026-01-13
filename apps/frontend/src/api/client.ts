import { APIError } from './errors'

const BASE_URL = 'http://localhost:4000'

export async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`)

    if (!response.ok) {
      throw new APIError(`API 오류: ${response.status} ${response.statusText}`, response.status)
    }

    return response.json()
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }

    throw new APIError('서버와 연결할 수 없습니다.', undefined, error)
  }
}
