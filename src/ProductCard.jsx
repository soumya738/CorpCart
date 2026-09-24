import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function ProductCard({ product }) {
  return (
    <div className="Product-card">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {product.image.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`${product.name} ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <p>Price: ₹{product.price}</p>

      <button>Add to Cart</button>
    </div>
  );
}
