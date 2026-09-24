import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="page-shell profile-page">
      <h1>Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button type="button" className="primary-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="profile-grid">
        <div className="mini-panel">
          <h3>My Orders</h3>
          <p>No orders yet.</p>
        </div>
        <div className="mini-panel">
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div className="mini-panel">
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </div>
  );
}
