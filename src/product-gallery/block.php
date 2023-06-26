<?php

/**
 * Product Gallery Block.
 */

/**
 * Register the Product Gallery block.
 *
 * @return WP_Block_Type|false The registered block type on success, or false on failure.
 */


 function north_commerce_blocks_register_product_gallery_block(): WP_Block_Type|false {
	return register_block_type(
		get_template_directory() . '/north-commerce-blocks/build/product-gallery/',
		[
			'render_callback' => 'north_commerce_blocks_output_product_gallery_block',
		]
	);
}

add_action('init', 'north_commerce_blocks_register_product_gallery_block');



/**
 * Render the Product Gallery block.
 *
 * @return string Returns the block content.
 */
function north_commerce_blocks_output_product_gallery_block($attributes): string {
	$title_text_color = $attributes['titleTextColor'] ?? 'inherit';
	$price_text_color = $attributes['priceTextColor'] ?? 'inherit';
	$add_to_cart_text   = $attributes['addToCartText'] ?? 'Add To Cart';
	$category_id = $attributes['category'] ?? "__all__";
	$permalink_base = North_Commerce_Product::get_permalink_base();

	$agent = North_Commerce_Db_Agent::instance();
	$ea = $agent->entityAccess();

	$filter = true;
	if ($category_id != "__all__") {
		$filter = ['product_categories.category_id' =>  $category_id];
	}

	$products = $ea->list('products', $filter, ['expand' => 'product_tags,product_images,product_options']);

	ob_start();


?>
	<section class="main-wrapper nc-products-list">
		<div class="container" data-type="product-overview">
			<div class="shoes-main">
				<div class="row">
					<?php foreach ($products as $product) {
						//error_log(print_r($product, true));

					?>



						<div class="col-md-4 col-sm-6">
							<div class="product-item" data-type="nc-product" data-id="<?php echo esc_html($product['id']) ?>" <?php /* data-product-type="<?php echo esc_html($product['product_type']['slug']) ?>" */ ?>data-timestamp="<?php echo strtotime($product['created']) ?>">
								<a href="<?php echo esc_html($permalink_base . $product['slug']) ?>">
									<img src="<?php echo esc_html($product['product_images'][0]['image_url']) ?>" alt="<?php echo esc_html($product['name']) ?>" />
								</a>
								<div class="shoe-cnt seller-cnt">
									<a href="<?php echo esc_html($permalink_base . $product['slug']) ?>" style="color:<?php echo esc_html($title_text_color); ?>"><?php echo esc_html($product['name']) ?></a>
									<p style="color:<?php echo esc_html($price_text_color); ?>"><?php echo North_Commerce_Settings::formatted_price($product['base_price']) ?></p>
								</div>

								<?php if (count($product['product_options']) > 1) { ?>

									<a href="<?php echo esc_html($permalink_base . $product['slug']) ?>">View Options</a>

								<?php } else {  ?>

									<button class="cta-button add-to-cart" data-add-to-cart-action><?php echo $add_to_cart_text ?></button>

								<?php }  ?>

							</div>
						</div>
					<?php } ?>
				</div>
			</div>
		</div>
	</section>
<?php

	return ob_get_clean();
}
