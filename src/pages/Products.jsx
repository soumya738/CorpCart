import { useEffect, useMemo, useState } from "react";
import ProductCard from "../ProductCard";
import { useLocation } from "react-router-dom";
import "../products.css";

export default function ProductsPage() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(location.state?.search || "");
  const [category, setCategory] = useState(location.state?.category || "All");
  const [sortBy, setSortBy] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setSearch(location.state?.search || "");
    if (location.state?.category) {
      setCategory(location.state.category);
    }
  }, [location.state]);

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
      })
      .catch(() => {
        setError("Unable to load products. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    const filtered = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        (product.description || "").toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "low-high") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high-low") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [category, products, search, sortBy]);

  return (
    <div className="page-shell">
      <section className="section-header-block">
        <div>
          <p className="section-kicker">Catalog</p>
          <h1>Products</h1>
        </div>
      </section>

      <section className="catalog-toolbar">
        <div className="search-block">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products"
          />
        </div>

        <div className="filter-row">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </section>

      {loading ? (
        <div className="loading-state">Loading products...</div>
      ) : error ? (
        <div className="error-state">{error}</div>
      ) : (
        <>
          {filteredProducts.length ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No products found</h3>
              <p>Try a different category or search term.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
