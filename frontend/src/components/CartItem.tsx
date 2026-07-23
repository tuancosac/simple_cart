import React from 'react';
import { CartItem as CartItemType } from '../types/products';
import { formatPrice } from '../utils/formatPrice';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, change: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <div className="cart-item-name">{item.productName}</div>
        <div className="cart-item-price">{formatPrice(item.price)}</div>
        <div className="cart-item-total">Thành tiền: {formatPrice(item.price * item.CartQuantity)}</div>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-control">
          <button onClick={() => onUpdateQuantity(item.id, -1)}>−</button>
          <input type="number" value={item.CartQuantity} readOnly />
          <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
        </div>
        <button className="btn-danger btn-sm" onClick={() => onRemove(item.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default CartItem;