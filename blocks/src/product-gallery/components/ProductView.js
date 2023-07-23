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

  console.log(product.product_images[0].image_url);

  return (
     <div className="nc-productOne">
        <span id="bestSeller">Best Seller</span>
        <div className="nc-img">
          <img src={product.product_images[0].image_url} alt="Product Name" />
          <img id="hover" src={product.product_images[1].image_url} alt="Product Name" />
          <button id="open">Quick View</button>
        </div>
        <h2>{product.name}</h2>
        <p>{product.base_price}</p>
     </div>
  );
}
