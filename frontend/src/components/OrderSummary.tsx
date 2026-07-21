import React from 'react';
import { CartItem } from '../types';
import { formatPrice } from '../utils/formatPrice';

interface OrderSummaryProps {
  cart: CartItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="order-summary">
      <h3>Tóm tắt đơn hàng</h3>
      <div className="summary-row"><span>Tổng cộng:</span><span>{formatPrice(subtotal)}</span></div>
      <div className="summary-row tax"><span>Thuế (10%):</span><span>{formatPrice(tax)}</span></div>
      <div className="summary-row"><span>Phí giao hàng:</span><span>Miễn phí</span></div>
      <div className="summary-row total"><span>Tổng cộng:</span><span>{formatPrice(total)}</span></div>
      <button className="btn-primary checkout-btn">Tiến hành thanh toán</button>
      <div className="tip-section">💡 <strong>Mẹo:</strong> Mua trên 500.000₫ được miễn phí giao hàng</div>
    </div>
  );
};

export default OrderSummary;