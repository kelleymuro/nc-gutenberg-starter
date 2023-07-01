# North Commerce Theme

## Setup

1. Clone the Git directory into your `themes` folder.
2. `cd` into the `blocks` directory, and run `npm install`.
3. Run `npm run start` for development mode, or `npm run build` for a development build.

## How to add a new block

1. `cd` into the `blocks/src` directory.
2. Run `npx @wordpress/create-block --no-plugin`.
   * The template variant to use for this block: `dynamic`.
   * The internal namespace for the block name: `north-commerce`.
3. `cd` into the new block directory in `src`.
4. Create `block.php` file.
5. Add a call to `register_block_type_from_metadata`:
   ```php
   function north_commerce_blocks_register_<blog-slug>_block() {
      register_block_type( get_template_directory() . '/blocks/build/<blog-slug>/');
   }
   add_action( 'init', 'north_commerce_blocks_register_<blog-slug>_block' );
    ```
6. Add an entry to `blocks/blocks.php` requiring the block's `block.php` file:
    ```php
    require_once __DIR__ . '/build/<blog-slug>/block.php';
    ```
