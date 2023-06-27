import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import "./editor.scss";

import { useState, useEffect } from "react";
import ProductView from "./components/ProductView";

import ProductSliderInspectorControls from "../product-slider/controls/ProductSliderInspectorControls";
import API from "../api";
import ProductGalleryInspectorControls from "./controls/ProductGalleryInspectorControls";

export default function Edit(props) {
  const { attributes, setAttributes } = props;

  //destruct attributes
  const { category, titleTextColor, priceTextColor, addToCartText } =
    attributes;

  //state variable
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let filter = [];
    if (category !== "__all__") {
      filter = [
        {
          key: "product_categories.category_id",
          value: category,
          operator: "equal",
        },
      ];
    }
    fetchProducts(filter);

    return () => {
      // cleanup
      setProducts([]);
    };
  }, [category]);

  const fetchProducts = async (filter) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const products = await API.getProducts(filter);
      setProducts(products);
    } catch (e) {
      console.error(e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  /*
		Renderers
	*/
  const productsRenderer = () => {
    return products.map((product) => (
      <ProductView
        key={product.id}
        product={product}
        titleTextColor={titleTextColor}
        priceTextColor={priceTextColor}
        addToCartText={addToCartText}
      ></ProductView>
    ));
  };

  return (
    <>
      <ProductGalleryInspectorControls {...props} />
      <section
        {...useBlockProps({ className: "main-wrapper nc-products-list" })}
      >
        <div className="container" data-type="product-overview">
          <div className="shoes-main">
            <div className="row">{productsRenderer()}</div>
          </div>
        </div>
      </section>
    </>
  );
}
