import styled from '@emotion/styled'
import type { CustomerPurchase } from '../../types'
import { Modal } from '../common/Modal'
import { Skeleton } from '../common/Skeleton'
import { ImageWithFallback } from '../common/ImageWithFallback'
import { ErrorMessage } from '../common/ErrorMessage'
import { EmptyState } from '../common/EmptyState'
import { getErrorMessage } from '../../api/errors'

interface CustomerDetailModalProps {
  customerName: string
  purchases: CustomerPurchase[]
  isLoading: boolean
  error: Error | null
  onClose: () => void
  onRetry?: () => void
}

export function CustomerDetailModal({
  customerName,
  purchases,
  isLoading,
  error,
  onClose,
  onRetry,
}: CustomerDetailModalProps) {
  return (
    <Modal isOpen={true} onClose={onClose} title={`${customerName}님의 구매 내역`}>
      {isLoading && (
        <PurchaseList>
          {Array.from({ length: 3 }).map((_, index) => (
            <PurchaseItem key={index}>
              <Skeleton width="100px" height="100px" variant="rectangular" />
              <Info>
                <Skeleton width="150px" height="20px" />
                <Skeleton width="100px" height="16px" />
                <Skeleton width="80px" height="16px" />
                <Skeleton width="120px" height="16px" />
              </Info>
            </PurchaseItem>
          ))}
        </PurchaseList>
      )}
      {error && <ErrorMessage message={getErrorMessage(error)} onRetry={onRetry} />}
      {!isLoading && !error && purchases.length === 0 && (
        <EmptyState
          icon="🛒"
          title="구매 내역이 없습니다"
          description={`${customerName}님의 구매 기록이 아직 없어요.`}
        />
      )}
      {!isLoading && !error && purchases.length > 0 && (
        <PurchaseList>
          {purchases.map((purchase, index) => (
            <PurchaseItem key={index}>
              <ImageWithFallback src={purchase.imgSrc} alt={purchase.product} width="100px" height="100px" />
              <Info>
                <ProductName>{purchase.product}</ProductName>
                <InfoRow>
                  <Label>가격</Label>
                  <Value>{purchase.price.toLocaleString()}원</Value>
                </InfoRow>
                <InfoRow>
                  <Label>수량</Label>
                  <Value>{purchase.quantity}개</Value>
                </InfoRow>
                <InfoRow>
                  <Label>날짜</Label>
                  <Value>{purchase.date}</Value>
                </InfoRow>
              </Info>
            </PurchaseItem>
          ))}
        </PurchaseList>
      )}
    </Modal>
  )
}

const PurchaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`

const PurchaseItem = styled.div`
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`

const ProductName = styled.h3`
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-gray-900);
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
`

const Label = styled.span`
  color: var(--color-gray-600);
`

const Value = styled.span`
  color: var(--color-gray-900);
  font-weight: 500;
`
