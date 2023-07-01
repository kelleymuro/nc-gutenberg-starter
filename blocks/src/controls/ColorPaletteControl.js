import { ColorPalette } from "@wordpress/block-editor";
const ColorPaletteControl = ({ color, onChangeColor, label }) => {
  return (
    <fieldset style={{ width: "100%" }}>
      <legend>{label}</legend>
      <ColorPalette label="DEMO LABEL" value={color} onChange={onChangeColor} />
    </fieldset>
  );
};

export default ColorPaletteControl;
