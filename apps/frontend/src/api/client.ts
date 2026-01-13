const BASE_URL = 'http://localhost:4000'

export async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error(`API 오류: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
