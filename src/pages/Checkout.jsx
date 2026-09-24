import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!user) {
    return <Navigate to="/login?redirect=/checkout" replace />;
  }

  if (!cartItems.length && !orderPlaced) {
    return (
      <div className="page-shell empty-page">
        <h1>Your cart is empty</h1>
        <p>Add products before placing an order.</p>
        <Link to="/products" className="primary-button">
          Browse Products
        </Link>
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const nextOrderId = `CC-${Date.now().toString().slice(-8)}`;
    setOrderId(nextOrderId);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="page-shell success-page">
        <div className="success-card">
          <h1>Order placed successfully</h1>
          <p>
            Your order ID is <strong>{orderId}</strong>.
          </p>
          <p>Thank you for shopping with CorpCart.</p>
          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <div className="field-grid">
            <label>
              Full Name
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phone
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label className="full-width">
              Shipping Address
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              City
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              State
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Pincode
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button type="submit" className="primary-button block-button">
            Place Order
          </button>
        </form>

        <aside className="order-summary">
          <h2>Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="summary-item">
              <span>
                {item.name} × {item.quantity}
              </span>
              <strong>
                ₹{(Number(item.price) * item.quantity).toLocaleString("en-IN")}
              </strong>
            </div>
          ))}

          <div className="summary-row total-row">
            <span>Total</span>
            <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}
