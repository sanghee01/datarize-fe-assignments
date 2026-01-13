import styled from '@emotion/styled'
import type { CustomerPurchase } from '../types'

interface CustomerDetailModalProps {
  customerName: string
  purchases: CustomerPurchase[]
  isLoading: boolean
  error: Error | null
  onClose: () => void
}

export function CustomerDetailModal({ customerName, purchases, isLoading, error, onClose }: CustomerDetailModalProps) {
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>{customerName}님의 구매 내역</h2>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>

        <Content>
          {isLoading && <Message>로딩 중...</Message>}
          {error && <ErrorMessage>에러 발생: {error.message}</ErrorMessage>}
          {!isLoading && !error && purchases.length === 0 && <Message>구매 내역이 없습니다.</Message>}
          {!isLoading && !error && purchases.length > 0 && (
            <PurchaseList>
              {purchases.map((purchase, index) => (
                <PurchaseItem key={index}>
                  <ProductImage src={purchase.imgSrc} alt={purchase.product} />
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
        </Content>
      </Modal>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const Modal = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);

  h2 {
    margin: 0;
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--color-gray-900);
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-gray-600);
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: var(--color-gray-900);
  }
`

const Content = styled.div`
  padding: var(--spacing-lg);
  overflow-y: auto;
`

const Message = styled.div`
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-gray-600);
`

const ErrorMessage = styled(Message)`
  color: var(--color-error);
`

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

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
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
