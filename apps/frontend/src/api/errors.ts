export class APIError extends Error {
  constructor(message: string, public statusCode?: number, public originalError?: unknown) {
    super(message)
    this.name = 'APIError'
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof APIError) {
    if (error.statusCode === 404) {
      return '요청하신 데이터를 찾을 수 없습니다.'
    }
    if (error.statusCode === 400) {
      return '잘못된 요청입니다. 입력 정보를 확인해주세요.'
    }
    if (error.statusCode && error.statusCode >= 500) {
      return '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
    }
    return error.message
  }

  if (error instanceof Error) {
    if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
      return '서버와 연결할 수 없습니다. 네트워크 연결을 확인해주세요.'
    }
    return error.message
  }

  return '알 수 없는 오류가 발생했습니다.'
}
