import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();

  if (!cartItems.length) {
    return (
      <div className="page-shell empty-page">
        <h1>Your cart is empty</h1>
        <p>Add products to your cart to continue shopping.</p>
        <Link to="/products" className="primary-button">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="page-shell cart-page">
      <div className="cart-layout">
        <div className="cart-items">
          <h1>Shopping Cart</h1>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>₹{Number(item.price).toLocaleString("en-IN")}</p>
                <div className="quantity-row compact">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="text-button"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <aside className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>Free</strong>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
          </div>
          <Link to="/products" className="secondary-button block-button">
            Continue Shopping
          </Link>
          <Link to="/checkout" className="primary-button block-button">
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
