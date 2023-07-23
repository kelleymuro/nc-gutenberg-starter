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
		get_template_directory() . '/blocks/build/product-gallery/',
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
	// $title_text_color = $attributes['titleTextColor'] ?? 'inherit';
	// $price_text_color = $attributes['priceTextColor'] ?? 'inherit';
	// $add_to_cart_text   = $attributes['addToCartText'] ?? 'Add To Cart';
	$category_id = $attributes['category'] ?? "__all__";
	// $permalink_base = North_Commerce_Product::get_permalink_base();

	$agent = North_Commerce_Db_Agent::instance();
	$ea = $agent->entityAccess();

	$filter = true;
	if ($category_id != "__all__") {
		$filter = ['product_categories.category_id' =>  $category_id];
	}

	$products = $ea->list('products', $filter, ['expand' => 'product_tags,product_images,product_options']);

	ob_start();


?>
	<section class="nc-main-wrapper">
		<div class="nc-grid-container">
			<div class="nc-wrapper_title">
                <h1 class="nc-heading">Minis + Kits</h1>
            </div>

			<div class="nc-wrapper_upper">
				<div class="nc-wrap_left">
					<ul>
                        <li><img src="images/filter.png" alt=""></li>
                        <li>
                            <select name="" id="">
                                <option value="">Filter</option>
                                <option value="">Filter 2</option>
                                <option value="">Filter 3</option>
                                <option value="">Filter 4</option>
                            </select>
                        </li>
                        <li> 27 Results </li>
                    </ul>
				</div>

				<div class="nc-wrap_right">
					<div class="nc-wrap_right">
						<select name="" id="">
							<option value="">Sort: Price, low to high </option>
							<option value="">Sort: Price, high to low </option>
							<option value="">Sort: Price, low to high </option>
							<option value="">Sort: Price, high to low </option>
						</select>
					</div>
				</div>
			</div>

			<div class="nc-wrapper-row">
				<div class="nc-product-grid-3">
					<?php foreach($products as $product) { ?>
						<div class="nc-productOne">
							<span id="bestSeller">Best Seller</span>
							<div class="nc-img">
								<img src="<?php echo $product['product_images'][0]['image_url'] ?>" alt="Product Name" />
								<img id="hover" src="<?php echo $product['product_images'][1]['image_url'] ?>" alt="Product Name" />
								<button id="open">Quick View</button>
							</div>
							<h2><?php echo $product['name']?></h2>
							<p><?php echo $product['base_price']?></p>
						</div>
					<?php } ?>
				</div>
			</div>
		</div>
	</section>
<?php

	return ob_get_clean();
}
