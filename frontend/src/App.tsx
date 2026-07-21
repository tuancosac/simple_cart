import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import { Product, CartItem as CartItemType } from './types';
import { defaultProducts } from './constants/products';
import { loadFromStorage, saveToStorage } from './utils/storage';

const App: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'cart'>('home');

  useEffect(() => {
    const { products: savedProducts, cart: savedCart } = loadFromStorage();
    setProducts(savedProducts.length > 0 ? savedProducts : defaultProducts);
    setCart(savedCart);
  }, []);

  useEffect(() => {
    saveToStorage(products, cart);
  }, [products, cart]);

  const toggleAdminMode = () => setIsAdminMode(!isAdminMode);

  const openAddModal = () => { setEditingProduct(null); setIsModalOpen(true); };
  const openEditModal = (id: string) => {
    const p = products.find(x => x.id === id);
    if (p) { setEditingProduct(p); setIsModalOpen(true); }
  };

  const handleProductSubmit = (data: Omit<Product, 'id'> & { id?: string }) => {
    if (data.id) {
      setProducts(prev => prev.map(p => p.id === data.id ? { ...p, ...data } : p));
    } else {
      const newProduct: Product = { ...data, id: Date.now().toString() };
      setProducts(prev => [...prev, newProduct]);
    }
  };

  // === DELETE PRODUCT ===
  const deleteProduct = (id: string) => {
    const isConfirmed = window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?');
    if (isConfirmed) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  // === RESET PRODUCTS ===
  const resetProducts = () => {
    const isConfirmed = window.confirm('Bạn chắc chắn muốn reset tất cả sản phẩm về mặc định?');
    if (isConfirmed) {
      setProducts([...defaultProducts]);
    }
};
  const addToCart = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prev => {
      const exist = prev.find(i => i.id === productId);
      if (exist) {
        return prev.map(i => i.id === productId ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (id: string, change: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header isAdminMode={isAdminMode} cartCount={cartCount} onToggleAdmin={toggleAdminMode} onShowCart={() => setCurrentPage('cart')} />

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
                <button className="btn-outline" onClick={resetProducts}>🔄 Reset mặc định</button>
              </div>
            )}

            <div className="products-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} isAdminMode={isAdminMode} onAddToCart={addToCart} onEdit={openEditModal} onDelete={deleteProduct} />
              ))}
            </div>
          </>
        )}

        {currentPage === 'cart' && (
          <>
            <button className="btn-outline" onClick={() => setCurrentPage('home')}>← Quay lại mua sắm</button>
            <h2>Giỏ hàng của bạn</h2>

            <div className="cart-container">
              <div className="cart-items">
                {cart.map(item => (
                  <CartItem key={item.id} item={item} onUpdateQuantity={updateCartQuantity} onRemove={removeFromCart} />
                ))}
                {cart.length === 0 && <p>Giỏ hàng trống</p>}
              </div>
              {cart.length > 0 && <OrderSummary cart={cart} />}
            </div>
          </>
        )}
      </main>

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleProductSubmit} editingProduct={editingProduct} />

      <footer><p>© 2024 ShopCart. Tất cả quyền được bảo lưu.</p></footer>
    </>
  );
};

export default App;