import { __ } from "@wordpress/i18n";

import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";

import ColorPaletteControl from "../../controls/ColorPaletteControl";
import CategorySelector from "../../controls/CategorySelector";

const ProductSliderInspectorControls = (props) => {
  const { attributes, setAttributes } = props;

  // destruct attributes
  const { category, titleTextColor, priceTextColor } = attributes;

  return (
    <InspectorControls>
      <PanelBody initialOpen={true} title={__("Category", "north-commerce")}>
        <CategorySelector
          category={category}
          onChangeCategory={(category) => setAttributes({ category })}
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
    </InspectorControls>
  );
};

export default ProductSliderInspectorControls;
