import React from 'react';
import { Product } from '../types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id'> & { id?: string }) => void;
  editingProduct: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSubmit, editingProduct }) => {
  const [formData, setFormData] = React.useState({
    name: '', price: 0, description: '', image: ''
  });

  React.useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData({ name: '', price: 0, description: '', image: '' });
    }
  }, [editingProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, id: editingProduct?.id });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className="modal-header">
          <span>{editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</span>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Tên sản phẩm</label>
            <input type="text" id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Giá (VND)</label>
            <input type="number" id="price" value={formData.price} onChange={e => setFormData({...formData, price: parseInt(e.target.value)||0})} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <textarea id="description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          <div className="form-group">
            <label htmlFor="image">URL Hình ảnh</label>
            <input type="url" id="image" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required />
            {formData.image && <img className="image-preview" src={formData.image} alt="preview" />}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>Hủy</button>
            <button type="submit" className="btn-primary">{editingProduct ? 'Cập nhật' : 'Thêm sản phẩm'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;