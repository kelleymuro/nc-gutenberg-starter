/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import metadata from "./block.json";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
  /**
   * @see ./edit.js
   */
  icon: {
    src: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 6.3L2 17.7C2 20.1 3.9 22 6.3 22L17.8 22C20.1 22 22 20.1 22 17.7L22 6.2C22 3.8 20.1 1.9 17.7 1.9L6.3 1.9C3.9 2 2 3.9 2 6.3ZM9.7 11L9.7 4L14.2 4L14.2 11L9.7 11ZM6.3 4L7.8 4L7.8 11L4 11L4 6.3C4 5 5 4 6.3 4ZM17.7 20L6.3 20C5 20 4 19 4 17.7L4 13L20 13L20 17.7C20 19 19 20 17.7 20ZM20 6.3L20 11L16.3 11L16.3 4L17.8 4C19 4 20 5 20 6.3Z"
          fill="black"
        />
      </svg>
    ),
  },
  edit: Edit,
});
