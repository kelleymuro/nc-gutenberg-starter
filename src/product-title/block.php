<?php

function north_commerce_blocks_register_product_title_block(): WP_Block_Type|false {
	return register_block_type(
		NORTH_COMMERCE_BLOCKS_PLUGIN_DIR_PATH . 'build/product-title/',
		[
			'render_callback' => 'north_commerce_blocks_output_product_title_block',
		]
	);
}
add_action('init', 'north_commerce_blocks_register_product_title_block');

function north_commerce_blocks_output_product_title_block($attributes, $content, $block): string {


	$title = $block->context['north-commerce/product/name'];

	ob_start();
?>
	<div class="nc-product-title">
		Product title:
		<div>
			<?php echo $title ?>
		</div>
	</div>

<?php

	return ob_get_clean();
}
