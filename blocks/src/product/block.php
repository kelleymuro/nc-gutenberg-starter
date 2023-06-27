<?php

function north_commerce_blocks_register_product_block(): WP_Block_Type|false {
	return register_block_type(
		get_template_directory(). '/blocks/build/product/',
		[
			'render_callback' => 'north_commerce_blocks_output_product_block',
		]
	);
}
add_action('init', 'north_commerce_blocks_register_product_block');

function north_commerce_blocks_output_product_block($attributes, $content, $block): string {


	//error_log(print_r($block, true));
	//error_log(print_r($block->context, true));
	error_log(print_r($attributes, true));

	$attributes['name'] = "DEMO PRODUCT NAME";

	//rendering inner blocks
	$inner_blocks_html = '';
	foreach ($block->inner_blocks as $inner_block) {
		$inner_block->context['north-commerce/product/name'] = "Dynamicly replaced in PHP :)";
		$inner_blocks_html .= $inner_block->render();
		error_log(print_r($inner_block, true));
	}


	ob_start();
?>
	<div class="nc-product">
		Dynamic product block
		<div>
			<?php echo $inner_blocks_html; ?>
		</div>
	</div>

<?php

	return ob_get_clean();
}
