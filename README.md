# Datarize Frontend 과제 전형 - 이상희

2025년 10월~12월 기간의 쇼핑몰 구매 데이터를 분석하고 시각화하는 대시보드입니다.

## 시작하기

### 필요 환경

- Node.js `22.17.0`
- Yarn `1.22.22`

### 실행 방법

```bash
cd apps
yarn install

# 백엔드 서버 실행 (http://localhost:4000)
yarn start-server

# 프론트엔드 개발 서버 실행 (http://localhost:3000)
yarn start-client
```

### 테스트 & Storybook

```bash
cd apps/frontend

# 테스트
yarn test          # watch 모드

# Storybook
yarn storybook     # http://localhost:6006
```

## 기술 스택

- **React 19.2.3** + **TypeScript 5.9.3** + **Vite 7.3.1**
- **TanStack Query 5.90.16** - 서버 상태 관리 및 캐싱
- **Emotion 11.14.0** - CSS-in-JS 스타일링
- **Recharts 3.6.0** - 데이터 시각화 차트
- **Vitest 4.0.17** + **Testing Library** - 유닛 테스트
- **Storybook 8.6.14** - 컴포넌트 개발 및 문서화

## 프로젝트 구조

Feature 단위로 폴더를 나눠서 관련된 코드를 한 곳에 모았습니다.

```
apps/frontend/src/
├── app/                    # 앱 전체 설정
│   ├── layouts/            # 헤더, 레이아웃
│   ├── providers/          # QueryClient, Router 설정
│   └── routes/             # 라우팅
│
├── pages/
│   └── DashboardPage/      # 대시보드 페이지
│
├── features/               # 기능별로 분리
│   ├── date-filter/        # 날짜 선택
│   ├── purchase-analytics/ # 차트, CSV 내보내기
│   ├── customer-list/      # 고객 목록, 검색, 정렬
│   └── customer-detail/    # 고객 상세 모달
│
└── shared/                 # 공통으로 사용
    ├── ui/                 # 재사용 가능한 컴포넌트
    ├── api/                # API 클라이언트
    ├── hooks/              # 공통 Hook
    └── lib/                # 유틸 함수
```

각 feature는 `ui/`, `api/`, `hooks/`, `types/` 폴더로 구성했습니다. 예를 들어 `customer-list`는 고객 목록과 관련된 모든 코드를 포함합니다.

## 구현 기능

### 1. 날짜 범위 필터링

- 시작일/종료일 선택 시 전체 데이터 자동 업데이트
- 단일 날짜 조회 지원 (시작일 = 종료일)
- 날짜 검증 (시작일 > 종료일 시 에러 표시)
- TanStack Query의 queryKey 변경으로 자동 리페칭

### 2. 가격대별 구매 빈도 차트

- Recharts 바 차트로 시각화
- 2만원 이하 ~ 10만원 이상 (만원 단위 구분)
- 로딩: Skeleton UI
- 에러: 에러 메시지 + 재시도 버튼
- 빈 데이터: 안내 메시지

### 3. CSV 내보내기

- 선택한 날짜 범위의 구매 데이터 다운로드
- 한글 깨짐 방지 (BOM 추가)
- 파일명: `purchases_YYYYMMDD_YYYYMMDD.csv`
- 다운로드 중 버튼 비활성화

### 4. 고객 목록

- 표시 정보: ID, 이름, 총 구매 횟수, 총 구매 금액
- **검색**: 이름 실시간 검색 (자동 1페이지 이동)
- **정렬**: 구매 금액 오름차순/내림차순 (기본: ID 오름차순)
- **페이지네이션**: 20개/페이지, `keepPreviousData`로 깜빡임 방지

### 5. 고객 상세 구매 내역

- 고객 행 클릭 시 모달 표시
- 표시 정보: 제품명, 가격, 수량, 구매 날짜, 상품 썸네일
- 이미지 로딩 실패 시 기본 이미지 (`ImageWithFallback`)
- 로딩 중: 썸네일 + 정보 영역 Skeleton UI
- 모달 외부 클릭/ESC 키로 닫기
- `useFocusTrap`으로 포커스 관리

### 6. 에러 처리

- **전역**: `ErrorBoundary`로 예상치 못한 에러 캐치
- **섹션별**: `SectionErrorBoundary`로 에러 격리 (한 섹션 에러 시 다른 섹션 정상 동작)
- **API**: 에러 메시지 + 재시도 버튼

### 7. 로딩 & 빈 상태 처리

- **로딩**: Skeleton UI로 레이아웃 유지
  - 차트: 400px 사각형 Skeleton
  - 고객 테이블: 10개 행 Skeleton
  - 상세 모달: 썸네일 + 정보 Skeleton
- **다운로드**: CSV 버튼 "다운로드 중..." 텍스트 + 비활성화
- **빈 데이터**: 아이콘 + 안내 메시지 표시

## 테스트 코드

핵심 로직에 대한 유닛 테스트를 작성했습니다.

**날짜 검증 (`useDateFilter.test.ts`)**

- 시작일이 종료일보다 늦으면 에러 반환
- 시작일 = 종료일이면 정상
- 빈 날짜는 에러 없음

**고객 목록 API (`getCustomers.test.ts`)**

- 파라미터 없이 조회
- 정렬, 검색, 페이지네이션 파라미터 포함 조회
- 날짜 범위 필터링

**CSV 변환 (`csvExport.test.ts`)**

- 데이터를 CSV 형식으로 변환
- 빈 배열 처리
- 특수문자 처리

**가격대 변환 (`priceRange.test.ts`)**

- "0 - 20000" → "2만원 이하"
- "100001 - Infinity" → "10만원 이상"

## Storybook으로 컴포넌트 관리

공통 UI 컴포넌트를 Storybook으로 문서화했습니다.

- **입력 컴포넌트**: Button, Input, Select
- **레이아웃**: Modal, Pagination
- **상태 표시**: Skeleton, ErrorMessage, EmptyState, ErrorBoundary
- **미디어**: ImageWithFallback

## 주요 고민 사항

### 1. 상태 관리 방식

클라이언트 상태를 어떻게 관리할지 고민했습니다. props depth가 깊지 않아서 Context API를 도입할 필요가 없다고 판단했습니다.  
날짜 범위는 `useDashboard` Hook에서 `useState`로 관리하고, 각 feature의 Hook에 파라미터로 전달하는 방식으로 구현했습니다.

### 2. 폴더 구조

처음에는 `components/`, `hooks/`, `utils/` 같은 타입별 구조를 생각했지만, 기능이 추가될수록 파일 찾기가 어려워질 것 같았습니다.

그래서 Feature-based 구조로 변경했습니다. `features/customer-list/` 안에 관련된 모든 코드를 모아두니 응집도가 높아지고 유지보수가 쉬워진 형태가 되었습니다.

### 3. 에러 처리 방식

한 섹션의 에러가 전체 페이지를 망가뜨리면 안 된다고 생각했습니다. 그래서 각 섹션을 `SectionErrorBoundary`로 감싸서 에러를 격리했습니다.

API 에러는 `getErrorMessage` 함수로 사용자 친화적인 메시지로 변환하고, "다시 시도" 버튼으로 `refetch`를 호출할 수 있게 했습니다.

---

## API 명세

| 엔드포인트                         | 설명                     | 쿼리 파라미터 (optional)                        |
| ---------------------------------- | ------------------------ | ----------------------------------------------- |
| `GET /api/purchase-frequency`      | 가격대별 구매 빈도       | `from`, `to`                                    |
| `GET /api/purchases`               | CSV용 구매 데이터        | `from`, `to`                                    |
| `GET /api/customers`               | 고객 목록 (페이지네이션) | `sortBy`, `name`, `page`, `limit`, `from`, `to` |
| `GET /api/customers/:id/purchases` | 고객 상세 구매 내역      | `from`, `to`                                    |
