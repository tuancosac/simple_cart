import React from 'react';

interface HeaderProps {
  isAdminMode: boolean;
  cartCount: number;
  onToggleAdmin: () => void;
  onShowCart: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isAdminMode,
  cartCount,
  onToggleAdmin,
  onShowCart,
}) => {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">🛍️</div>
            <span>ShopCart</span>
          </div>
          <div className="header-actions">
            <button 
              className={`btn-outline ${isAdminMode ? 'active-admin' : ''}`} 
              onClick={onToggleAdmin}
            >
              {isAdminMode ? 'Đang quản lý' : 'Quản lý'}
            </button>
            <button className="btn-primary badge" onClick={onShowCart}>
              🛒 Giỏ hàng
              <span className="badge-count">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;