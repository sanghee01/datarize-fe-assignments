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
          {isLoading && <div>로딩 중...</div>}
          {error && <div>에러 발생: {error.message}</div>}
          {!isLoading && !error && purchases.length === 0 && <div>구매 내역이 없습니다.</div>}
          {!isLoading && !error && purchases.length > 0 && (
            <PurchaseList>
              {purchases.map((purchase, index) => (
                <PurchaseItem key={index}>
                  <ProductImage src={purchase.imgSrc} alt={purchase.product} />
                  <Info>
                    <h3>{purchase.product}</h3>
                    <p>가격: {purchase.price.toLocaleString()}원</p>
                    <p>수량: {purchase.quantity}개</p>
                    <p>날짜: {purchase.date}</p>
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
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;

  h2 {
    margin: 0;
    font-size: 1.25rem;
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #000;
  }
`

const Content = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
`

const PurchaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const PurchaseItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`

const Info = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
  }

  p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    color: #666;
  }
`
