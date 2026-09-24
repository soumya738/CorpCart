import ProductCard from "../ProductCard";

export default function ProductGrid({ products, title, emptyMessage }) {
  if (!products.length) {
    return (
      <div className="empty-state">
        <h3>{title}</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
