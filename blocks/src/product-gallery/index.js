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
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.7 2.40002H6.3C3.9 2.40002 2 4.30002 2 6.70002V18.2C2 20.5 3.9 22.4 6.3 22.4H17.8C20.2 22.4 22.1 20.5 22.1 18.1V6.70002C22 4.30002 20.1 2.40002 17.7 2.40002ZM9.7 14.7V10.1H14.2V14.6H9.7V14.7ZM14.3 16.7V20.4H9.7V16.7H14.3ZM4 10.1H7.7V14.6H4V10.1ZM9.7 8.10002V4.40002H14.2V8.10002H9.7ZM16.3 10.1H20V14.6H16.3V10.1ZM20 6.70002V8.20002H16.3V4.40002H17.8C19 4.40002 20 5.40002 20 6.70002ZM6.3 4.40002H7.8V8.10002H4V6.70002C4 5.40002 5 4.40002 6.3 4.40002ZM4 18.1V16.6H7.7V20.4H6.3C5 20.4 4 19.4 4 18.1ZM17.7 20.4H16.2V16.7H20V18.2C20 19.4 19 20.4 17.7 20.4Z"
          fill="black"
        />
      </svg>
    ),
  },
  edit: Edit,
});
