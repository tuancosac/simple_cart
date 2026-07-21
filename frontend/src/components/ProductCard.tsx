import React from 'react';
import { Product } from '../types';
import { formatPrice } from '../utils/formatPrice';

interface ProductCardProps {
  product: Product;
  isAdminMode: boolean;
  onAddToCart: (id: string, quantity: number) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAdminMode,
  onAddToCart,
  onEdit,
  onDelete,
}) => {
  const [quantity, setQuantity] = React.useState(1);

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.image} 
          alt={product.name} 
          onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300'; }}
        />
        {isAdminMode && (
          <div className="admin-overlay">
            <button className="btn-blue" onClick={() => onEdit?.(product.id)}>✏️</button>
            <button className="btn-danger" onClick={() => onDelete?.(product.id)}>🗑️</button>
          </div>
        )}
      </div>
      <div className="product-content">
        <div className="product-name">{product.name}</div>
        <div className="product-description">{product.description}</div>
        <div className="product-price">{formatPrice(product.price)}</div>
        <div className="product-actions">
          <div className="quantity-control">
            <button type="button" onClick={() => handleQuantityChange(-1)}>−</button>
            <input type="number" className="quantity-input" value={quantity} min="1" readOnly />
            <button type="button" onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <button 
            className="btn-primary btn-sm" 
            onClick={() => onAddToCart(product.id, quantity)}
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;