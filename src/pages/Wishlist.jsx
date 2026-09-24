import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!wishlistItems.length) {
    return (
      <div className="page-shell empty-page">
        <h1>Your wishlist is empty</h1>
        <p>Save products you love and revisit them anytime.</p>
        <Link to="/products" className="primary-button">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <h1>Wishlist</h1>
      <div className="product-grid">
        {wishlistItems.map((product) => (
          <div key={product.id} className="wishlist-card">
            <img src={product.image} alt={product.name} />
            <div className="wishlist-card-body">
              <h3>{product.name}</h3>
              <p>₹{Number(product.price).toLocaleString("en-IN")}</p>
              <div className="detail-actions stacked-actions">
                <button
                  type="button"
                  className="primary-button small-button"
                  onClick={() => addToCart(product, 1)}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="secondary-button small-button"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
