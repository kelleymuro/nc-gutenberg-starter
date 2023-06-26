import { __ } from "@wordpress/i18n";

import {
  useBlockProps,
  useInnerBlocksProps,
  InnerBlocks,
} from "@wordpress/block-editor";

import "./editor.scss";

export default function Edit() {
  const blockProps = useBlockProps({ className: "nc-product" });
  const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps);

  return (
    <div {...innerBlocksProps}>
      <label>Product block</label>
      {children}
    </div>
  );
}
