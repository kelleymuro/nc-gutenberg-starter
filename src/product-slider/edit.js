import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";

import "./editor.scss";

import Flickity from "react-flickity-component";
import { useEffect, useState } from "react";

import ProductView from "./components/ProductView";

import API from "../api";
import ProductSliderInspectorControls from "./controls/ProductSliderInspectorControls";

export default function Edit(props) {
  const { attributes, setAttributes } = props;

  // destruct attributes
  const { category, titleTextColor, priceTextColor, flickityOptions } =
    attributes;

  //state variable
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let filter = [];
    console.log("Category: ", category);
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

  /**
   * Renderers
   */
  const loadingRenderer = () => {
    return (
      <div className="nc-product-slider-loading">
        Loading products, please wait...
      </div>
    );
  };
  const errorRenderer = () => {
    return (
      <div className="nc-product-slider-error">
        Error loading prodcuts. Please try again.
      </div>
    );
  };
  const noProductsRenderer = () => {
    return <div className="nc-product-slider-error">No products found.</div>;
  };
  const productsRenderer = () => {
    if (isLoading) return loadingRenderer();
    if (isError) return errorRenderer();
    if (products.length === 0) return noProductsRenderer();

    return (
      <Flickity className="nc-block-carousel" options={flickityOptions}>
        {products.map((product) => (
          <ProductView
            key={product.id}
            product={product}
            titleTextColor={titleTextColor}
            priceTextColor={priceTextColor}
          />
        ))}
      </Flickity>
    );
  };

  return (
    <>
      <ProductSliderInspectorControls
        attributes={attributes}
        setAttributes={setAttributes}
      />

      <section {...useBlockProps({ className: "nc-product-slider-area" })}>
        <div className="nc-product-slider-main">{productsRenderer()}</div>
      </section>
    </>
  );
}
