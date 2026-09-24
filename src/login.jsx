import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import LoginImage from "./image.jsx";
import { useAuth } from "./context/AuthContext";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirect") || "/";
  const [formData, setFormData] = useState({ email: "", password: "" });

  if (user) {
    return (
      <Navigate to={redirectTo.startsWith("/") ? redirectTo : "/"} replace />
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentValues) => ({ ...currentValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = formData.email.split("@")[0] || "CorpCart User";

    login({
      name,
      email: formData.email,
    });

    navigate(redirectTo.startsWith("/") ? redirectTo : "/");
  };

  return (
    <div id="container">
      <div className="logindata">
        <div className="heading">
          <h1>CorpCart</h1>
          <p>
            Login with your corporate credentials to access exclusive goodies.
          </p>
        </div>
        <form id="loginform" onSubmit={handleSubmit}>
          <label htmlFor="email">Email ID</label>
          <br />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email ID"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <button type="submit" className="primary-button block-button">
            Login
          </button>
          <p className="auth-switch">
            Need an account? <Link to="/signup">Create one</Link>
          </p>
        </form>
      </div>

      <LoginImage />
    </div>
  );
}
