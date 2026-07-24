import React from 'react';

interface HeaderProps {
  isAdminMode: boolean;
  cartCount: number;
  isLoggedIn: boolean;
  onToggleAdmin: () => void;
  onShowCart: () => void;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isAdminMode,
  cartCount,
  isLoggedIn,
  onToggleAdmin,
  onShowCart,
  onLoginClick,
  onLogout,
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

            {isLoggedIn ? (
              <button className="btn-outline" onClick={onLogout}>
                Đăng xuất
              </button>
            ) : (
              <button className="btn-primary" onClick={onLoginClick}>
                Đăng nhập
              </button>
            )}

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