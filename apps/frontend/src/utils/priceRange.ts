/**
 * 가격대 범위 문자열을 사용자 친화적인 레이블로 변환합니다.
 * @param range - 가격대 범위 문자열 (예: "0 - 20000", "100001 - Infinity")
 * @returns 사용자 친화적인 가격대 레이블 (예: "2만원 이하", "2~3만원", "10만원 이상")
 */
export function formatPriceRange(range: string): string {
  const parts = range.split(' - ')
  const min = parseInt(parts[0], 10)
  const max = parts[1] === 'Infinity' ? Infinity : parseInt(parts[1], 10)

  if (min === 0 && max === 20000) {
    return '2만원 이하'
  }

  if (min === 100001 && max === Infinity) {
    return '10만원 이상'
  }

  const minManwon = Math.floor(min / 10000)
  const maxManwon = Math.floor(max / 10000)
  return `${minManwon}~${maxManwon}만원`
}
