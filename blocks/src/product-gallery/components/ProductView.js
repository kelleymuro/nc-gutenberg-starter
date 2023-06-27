import Helper from "../../helpers";
import Product from "../../product";

export default function ProductView({
  product,
  titleTextColor,
  priceTextColor,
  addToCartText,
}) {
  const p = new Product(product);

  const renderButtons = () => {
    if (p.hasProductOptions()) {
      return <a href="#">View Options</a>;
    } else {
      return (
        <button className="cta-button add-to-cart">{addToCartText}</button>
      );
    }
  };

  return (
    <div className="col-md-4 col-sm-6">
      <div className="product-item" data-type="nc-product" data-id={p.getId()}>
        <a href="#">
          <img
            src={p.getFirstImage()}
            alt="<?php echo esc_html($product['name']) ?>"
          />
        </a>
        <div className="shoe-cnt seller-cnt">
          <a
            href="#"
            style={{
              color: titleTextColor,
            }}
          >
            {p.getName()}
          </a>
          <p style={{ color: priceTextColor }}>{p.getHtmlPrice()}</p>
        </div>

        {renderButtons()}
      </div>
    </div>
  );
}
