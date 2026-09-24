import { Link } from "react-router-dom";

export default function CategoryCard({ category, title, image, description }) {
  return (
    <Link to="/products" className="category-card" state={{ category }}>
      <img src={image} alt={title} />
      <div className="category-card-body">
        <span>{category}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}
