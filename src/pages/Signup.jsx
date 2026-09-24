import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      window.alert("Passwords do not match.");
      return;
    }

    signup({
      name: formData.name,
      email: formData.email,
    });

    navigate("/");
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-copy">
          <h1>Welcome to CorpCart</h1>
          <p>
            Create an account to save your cart, wishlist, and checkout details.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Name
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
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="primary-button block-button">
            Create Account
          </button>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
