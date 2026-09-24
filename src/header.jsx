import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";
import "./header.css";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const { wishlistItems } = useWishlist();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate("/products", { state: { search: search.trim() } });
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" aria-label="CorpCart home">
          <img src="/images/Logo.png" alt="CorpCart Logo" />
        </Link>

        <form className="search-box" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
          />
          <button type="submit" aria-label="Search">
            🔍
          </button>
        </form>

        <nav className={`navigation ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/products" state={{ category: "All" }}>
            Products
          </NavLink>
        </nav>

        <div className="header-actions">
          <Link to="/wishlist" className="header-icon" title="Wishlist">
            <span className="header-icon-symbol">♡</span>
            <span className="header-icon-text">Wishlist</span>
            {wishlistItems.length > 0 && (
              <span className="header-count">{wishlistItems.length}</span>
            )}
          </Link>

          <Link to="/cart" className="header-icon" title="Cart">
            <span className="header-icon-symbol">🛒</span>
            <span className="header-icon-text">Cart</span>
            {itemCount > 0 && <span className="header-count">{itemCount}</span>}
          </Link>

          {user ? (
            <div className="profile-menu">
              <Link to="/profile" className="header-icon" title="Profile">
                <span className="header-icon-symbol">👤</span>
                <span className="header-icon-text">
                  {user.name || "Profile"}
                </span>
              </Link>
              <button type="button" className="header-logout" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="header-login-button">
              Login
            </Link>
          )}

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMenuOpen((open) => !open)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
