import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductCard from "../ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data/product.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load product");
        }
        return response.json();
      })
      .then((data) => {
        const products = Array.isArray(data) ? data : [];
        setAllProducts(products);
        const selected = products.find(
          (item) => String(item.id) === String(id),
        );

        if (!selected) {
          setError("This product could not be found.");
        } else {
          setProduct(selected);
        }
      })
      .catch(() => {
        setError("Unable to load this product right now.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const relatedProducts = useMemo(() => {
    if (!product || !allProducts.length) {
      return [];
    }

    return allProducts
      .filter(
        (item) => item.category === product.category && item.id !== product.id,
      )
      .slice(0, 3);
  }, [allProducts, product]);

  const isWishlisted = product
    ? wishlistItems.some((item) => item.id === product.id)
    : false;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  if (loading) {
    return <div className="loading-state">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="page-shell">
        <div className="error-state">{error || "Product not found."}</div>
        <div className="mt-16">
          <Link to="/products" className="primary-button">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell product-detail-page">
      <div className="detail-gallery">
        {product.image.map((image, index) => (
          <img
            key={`${product.id}-${index}`}
            src={image}
            alt={`${product.name} ${index + 1}`}
          />
        ))}
      </div>

      <div className="detail-info">
        <p className="section-kicker">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="price-tag">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>
        <p className="detail-description">{product.description}</p>

        <div className="quantity-row">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((value) => value + 1)}
          >
            +
          </button>
        </div>

        <div className="detail-actions">
          <button
            type="button"
            className="primary-button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => toggleWishlist(product)}
          >
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>

      <div className="related-products-block">
        <div className="section-heading">
          <h2>Related Products</h2>
          <Link to="/products">View all</Link>
        </div>

        {relatedProducts.length ? (
          <div className="product-grid">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
