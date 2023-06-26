import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

export default function Save() {
  const blockProps = useBlockProps.save();
  const { children, ...innerBlocksProps } =
    useInnerBlocksProps.save(blockProps);

  return <div {...innerBlocksProps}>{children}</div>;
}
