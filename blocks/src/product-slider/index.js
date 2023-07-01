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
          d="M9.52727 1.08096L5.05455 1.85199C3.30909 2.18242 2 3.72447 2 5.59695V18.2637C2 20.1362 3.30909 21.6782 5.05455 22.0087L9.52727 22.8899C9.74545 23 9.96364 23 10.1818 23C11.0545 23 11.9273 22.6696 12.5818 22.1188C13.4545 21.3478 14 20.3565 14 19.1449V4.82593C14 3.72447 13.4545 2.62301 12.5818 1.85199C11.8182 1.08096 10.6182 0.860673 9.52727 1.08096ZM11.8182 19.1449C11.8182 19.5855 11.6 20.1362 11.2727 20.3565C10.9455 20.6869 10.4 20.7971 9.96364 20.6869L5.49091 19.8058C4.72727 19.8058 4.18182 19.1449 4.18182 18.3739V5.59695C4.18182 4.82592 4.72727 4.16505 5.49091 3.94476L9.96364 3.17374C10.0727 3.17374 10.1818 3.17374 10.2909 3.17374C10.6182 3.17374 11.0545 3.28388 11.2727 3.50417C11.6 3.83461 11.8182 4.2752 11.8182 4.82593V19.1449Z"
          fill="black"
        />
        <path
          d="M17.9836 3H16.1475C15.459 3 15 3.44737 15 4.11842C15 4.78947 15.459 5.23684 16.1475 5.23684H17.9836C18.9016 5.23684 19.7049 6.01974 19.7049 6.91447V16.0855C19.7049 16.9803 18.9016 17.7632 17.9836 17.7632H16.1475C15.459 17.7632 15 18.2105 15 18.8816C15 19.5526 15.459 20 16.1475 20H17.9836C20.1639 20 22 18.2105 22 16.0855V6.91447C22 4.78947 20.1639 3 17.9836 3Z"
          fill="black"
        />
      </svg>
    ),
  },
  edit: Edit,
});
