import React, { useState, useEffect } from 'react';
import { Product } from '../types/products';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id'> & { id?: string }) => void;
  editingProduct: Product | null;
}

const initialFormState = {
  productName: '',
  price: 0,
  categoryId: 0,
  quantity: 0,
};

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingProduct,
}) => {
  const [formData, setFormData] = useState(initialFormState);

  // Cập nhật formData khi editingProduct thay đổi hoặc khi đóng/mở Modal
  useEffect(() => {
    if (isOpen) {
      if (editingProduct) {
        setFormData({
          productName: editingProduct.productName || '',
          price: editingProduct.price || 0,
          categoryId: editingProduct.categoryId || 0,
          quantity: editingProduct.quantity || 0,
        });
      } else {
        setFormData(initialFormState); // Reset form khi mở ở chế độ "Thêm mới"
      }
    }
  }, [editingProduct, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: editingProduct?.id, // Nếu là Edit thì kèm id sang cho hàm onSubmit
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <span>{editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</span>
          <button type="button" className="close-modal" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Tên sản phẩm</label>
            <input
              type="text"
              id="productName"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Giá (VND)</label>
            <input
              type="number"
              id="price"
              value={formData.price || ''}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) || 0 })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả</label>

          </div>

          <div className="form-group">
            <label htmlFor="image">URL Hình ảnh</label>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn-primary">
              {editingProduct ? 'Cập nhật' : 'Thêm sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;