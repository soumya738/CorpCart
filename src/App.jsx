import { Route, Routes } from "react-router-dom";
import Header from "./header.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import ProductsPage from "./pages/Products.jsx";
import ProductDetailsPage from "./pages/ProductDetails.jsx";
import LoginPage from "./login.jsx";
import SignupPage from "./pages/Signup.jsx";
import CartPage from "./pages/Cart.jsx";
import WishlistPage from "./pages/Wishlist.jsx";
import CheckoutPage from "./pages/Checkout.jsx";
import ProfilePage from "./pages/Profile.jsx";
import "./App.css";
import "./styles.css";

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
