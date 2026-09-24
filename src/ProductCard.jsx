import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, 1);
    navigate("/cart");
  };

  return (
    <div className="Product-card">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {(product.image || []).map((img, index) => (
          <SwiperSlide key={`${product.id}-${index}`}>
            <img src={img} alt={`${product.name} ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="product-card-body">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <button
            type="button"
            className={`wishlist-button ${isWishlisted ? "active" : ""}`}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            onClick={() => toggleWishlist(product)}
          >
            ♥
          </button>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>

        <p>{product.description}</p>

        <div className="product-price">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </div>

        <div className="product-card-actions">
          <button
            type="button"
            className="primary-button small-button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
