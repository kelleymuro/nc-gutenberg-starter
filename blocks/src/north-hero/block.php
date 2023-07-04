<?php

/**
 * Product Gallery Block.
 */

/**
 * Register the Product Gallery block.
 *
 * @return WP_Block_Type|false The registered block type on success, or false on failure.
 */


 function north_commerce_blocks_register_north_hero_block(): WP_Block_Type|false {
	return register_block_type(
		get_template_directory() . '/north-commerce-blocks/build/north-hero/',
		[
			'render_callback' => 'north_commerce_blocks_output_north_hero_block',
		]
	);
}

add_action('init', 'north_commerce_blocks_register_north_hero_block');



/**
 * Render the Product Gallery block.
 *
 * @return string Returns the block content.
 */
function north_commerce_blocks_output_north_hero_block(): string {
	ob_start();
?>
	<section class="main-wrapper nc-products-list">
		Hii
	</section>
<?php

	return ob_get_clean();
}
