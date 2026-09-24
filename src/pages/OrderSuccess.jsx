import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="page-shell success-page">
      <div className="success-card">
        <h1>Order placed successfully</h1>
        <p>Your order is on the way.</p>
        <Link to="/products" className="primary-button">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
