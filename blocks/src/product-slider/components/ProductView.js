import Product from "../../product";

export default function ProductView({
  product,
  titleTextColor,
  priceTextColor,
}) {
  const p = new Product(product);

  return (
    <div className="carousel-cell">
      <div className="nc-product-slider-item">
        <img
          className="nc-product-carousel-item-thumbnail"
          src={p.getFirstImage()}
          alt=""
        />
      </div>
      <div className="nc-product-slider-meta">
        <a
          href="#"
          className="nc-product-slider-title"
          style={{ color: titleTextColor }}
        >
          {product.name}
        </a>
        <p
          className="nc-product-slider-price"
          style={{ color: priceTextColor }}
        >
          {p.getHtmlPrice()}
        </p>
      </div>
    </div>
  );
}
