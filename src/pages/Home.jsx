import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import CategoryCard from "../components/CategoryCard";

const categoryMap = {
  Apparel: {
    title: "Apparel Essentials",
    image: "/images/t-shirt-front.png",
    description: "Comfort-first essentials for everyday workwear.",
  },
  Bags: {
    title: "Carry Smart",
    image: "/images/backpack.jpg",
    description: "Travel-ready pieces built for daily mobility.",
  },
  Drinkware: {
    title: "Hydration",
    image: "/images/XYZ-waterbottle.jpg",
    description: "Stay refreshed with premium, insulated gear.",
  },
  "Tech & Desk": {
    title: "Workspace",
    image: "/images/Laptop-stand1.jpg",
    description: "Upgrade your desk with refined productivity tools.",
  },
  Stationery: {
    title: "Stationery",
    image: "/images/XYZ-premium-notebook.jpg",
    description: "Organized planning and polished office essentials.",
  },
  Gifts: {
    title: "Gifting",
    image: "/images/image_6f545cf0.jpg",
    description: "Thoughtful kits for onboarding and celebrations.",
  },
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data/product.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Unable to load products at the moment.");
        setIsLoading(false);
      });
  }, []);

  const featuredProducts = useMemo(
    () =>
      products
        .filter((product) => [1, 2, 5, 9, 13, 17].includes(product.id))
        .slice(0, 4),
    [products],
  );

  const newArrivals = useMemo(
    () => [...products].reverse().slice(0, 4),
    [products],
  );

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Corporate essentials, refined.</span>
          <h1>Upgrade your workday with premium essentials.</h1>
          <p>
            Discover curated apparel, travel gear, desk accessories, and
            thoughtful gifting picks designed for modern teams.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="primary-button">
              Shop Now
            </Link>
            <Link to="/products" className="secondary-button">
              Explore Catalog
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <img src="/images/Logo.png" alt="CorpCart hero" />
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <h2>Featured Categories</h2>
          <Link to="/products">View all</Link>
        </div>
        <div className="category-grid">
          {Object.entries(categoryMap).map(([key, item]) => (
            <CategoryCard
              key={key}
              category={key}
              title={item.title}
              image={item.image}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <h2>Featured Products</h2>
          <Link to="/products">View all</Link>
        </div>

        {isLoading ? (
          <div className="loading-state">Loading products...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : (
          <ProductGrid
            products={featuredProducts}
            title="Featured Products"
            emptyMessage="No featured products available."
          />
        )}
      </section>

      <section className="content-section">
        <div className="section-heading">
          <h2>New Arrivals</h2>
          <Link to="/products">View all</Link>
        </div>

        {isLoading ? (
          <div className="loading-state">Loading new arrivals...</div>
        ) : (
          <ProductGrid
            products={newArrivals}
            title="New Arrivals"
            emptyMessage="No new arrivals available."
          />
        )}
      </section>
    </>
  );
}
