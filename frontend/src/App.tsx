import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import { Product, CartItem as CartItemType } from './types/products';
import { productApi, cartApi, setAuthToken } from './services/api';

const App: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'cart'>('home');
  const [loading, setLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
    }
    loadProducts();
  }, []);

  // Load dữ liệu từ Backend
  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const handleLoginSuccess = (token: string) => {
    setIsLoggedIn(true);
    loadCart();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCart([]);
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await productApi.getAll();
      setProducts(res.data);
    } catch (error) {
      console.error('Lỗi tải sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      const res = await cartApi.getCart();
      setCart(res.data);
    } catch (error) {
      console.error('Lỗi tải giỏ hàng:', error);
    }
  };

  const toggleAdminMode = () => setIsAdminMode(!isAdminMode);

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (id: string) => {
    const p = products.find(x => x.id === id);
    if (p) {
      setEditingProduct(p);
      setIsModalOpen(true);
    }
  };

  const handleProductSubmit = async (data: any) => {
    try {
      if (data.id) {
        await productApi.update(data.id, data);
      } else {
        await productApi.create(data);
      }
      loadProducts();
      alert(data.id ? 'Cập nhật thành công!' : 'Thêm sản phẩm thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra!');
    }
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) return;
    try {
      await productApi.delete(id);
      loadProducts();
    } catch (error) {
      alert('Xóa thất bại!');
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      await cartApi.addToCart(productId, quantity);
      loadCart();
    } catch (error) {
      alert('Không thể thêm vào giỏ hàng');
    }
  };

  const updateCartQuantity = async (id: string, change: number) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    
    const newQuantity = Math.max(1, item.quantity + change);
    try {
      await cartApi.updateQuantity(id, newQuantity);
      loadCart();
    } catch (error) {
      alert('Cập nhật số lượng thất bại');
    }
  };

  const removeFromCart = async (id: string) => {
    if (!window.confirm('Xóa sản phẩm khỏi giỏ hàng?')) return;
    try {
      await cartApi.removeFromCart(id);
      loadCart();
    } catch (error) {
      alert('Xóa thất bại');
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header 
        isAdminMode={isAdminMode} 
        cartCount={cartCount} 
        isLoggedIn={isLoggedIn}
        onToggleAdmin={toggleAdminMode} 
        onShowCart={() => setCurrentPage('cart')} 
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={logout}
      />

      <main className="container">
        {currentPage === 'home' && (
          <>
            <div className="section-title">
              <div className="title-group">
                <h2>Các sản phẩm nổi bật</h2>
                <p>Khám phá bộ sưu tập thời trang chất lượng cao</p>
              </div>
            </div>

            {isAdminMode && (
              <div className="admin-toolbar">
                <button className="btn-primary" onClick={openAddModal}>➕ Thêm sản phẩm</button>
              </div>
            )}

            <div className="products-grid">
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isAdminMode={isAdminMode} 
                  onAddToCart={addToCart} 
                  onEdit={openEditModal} 
                  onDelete={deleteProduct} 
                />
              ))}
            </div>
          </>
        )}

        {currentPage === 'cart' && (
          <>
            <button className="btn-outline" onClick={() => setCurrentPage('home')}>
              ← Quay lại mua sắm
            </button>
            <h2>Giỏ hàng của bạn</h2>

            <div className="cart-container">
              <div className="cart-items">
                {cart.map(item => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    onUpdateQuantity={updateCartQuantity} 
                    onRemove={removeFromCart} 
                  />
                ))}
                {cart.length === 0 && <p>Giỏ hàng trống</p>}
              </div>
              {cart.length > 0 && <OrderSummary cart={cart} />}
            </div>
          </>
        )}
      </main>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleProductSubmit} 
        editingProduct={editingProduct} 
      />

      <footer><p>© 2024 ShopCart. Tất cả quyền được bảo lưu.</p></footer>
    </>
  );
};

export default App;