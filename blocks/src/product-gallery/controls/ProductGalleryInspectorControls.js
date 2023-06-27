import { __ } from "@wordpress/i18n";

import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

import ColorPaletteControl from "../../controls/ColorPaletteControl";
import CategorySelector from "../../controls/CategorySelector";

const ProductGalleryInspectorControls = (props) => {
  const { attributes, setAttributes } = props;

  //destruct attributes
  const { category, titleTextColor, priceTextColor, addToCartText } =
    attributes;

  return (
    <InspectorControls>
      <PanelBody initialOpen={true} title={__("Category", "north-commerce")}>
        <CategorySelector
          category={category}
          onChangeCategory={(category) => setAttributes({ category })}
        />
        <TextControl
          label="Add to cart text"
          value={addToCartText}
          onChange={(addToCartText) => setAttributes({ addToCartText })}
        />
      </PanelBody>
      <PanelBody title={__("Colors", "north-commerce")}>
        <ColorPaletteControl
          color={titleTextColor}
          onChangeColor={(titleTextColor) => setAttributes({ titleTextColor })}
          label={__("Title Color", "north-commerce")}
        ></ColorPaletteControl>
        <ColorPaletteControl
          color={priceTextColor}
          onChangeColor={(priceTextColor) => setAttributes({ priceTextColor })}
          label={__("Price Color", "north-commerce")}
        ></ColorPaletteControl>
      </PanelBody>

      {/*<AddToCartText
        addToCartText={addToCartText}
        onChangeText={onChangeText}
  />*/}
    </InspectorControls>
  );
};

export default ProductGalleryInspectorControls;
