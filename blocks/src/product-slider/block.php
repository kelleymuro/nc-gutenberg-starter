<?php

/**
 * Register the Product Slider block.
 */
function north_commerce_blocks_register_product_slider_block(): WP_Block_Type|false {
  return register_block_type(
    get_template_directory(). '/blocks/build/product-slider/',
    [
      'render_callback' => 'north_commerce_blocks_output_product_slider_block',
    ]
  );
}
add_action('init', 'north_commerce_blocks_register_product_slider_block');

/**
 * Render the Product Slider block.
 */

function north_commerce_blocks_output_product_slider_block($attributes): string {
  $category_id = $attributes['category'] ?? "__all__";
  $title_text_color = $attributes['titleTextColor'] ?? 'inherit';
  $price_text_color = $attributes['priceTextColor'] ?? 'inherit';
  $flickityOptions = $attributes['flickityOptions'];


  $agent = North_Commerce_Db_Agent::instance();
  $ea = $agent->entityAccess();

  $filter = true;
  if ($category_id != "__all__") {
    $filter = ['product_categories.category_id' =>  $category_id];
  }

  $products = $ea->list('products', $filter, ['expand' => 'product_tags,product_images,product_options']);

  ob_start();
?>
  <section class="nc-product-slider-area">
    <div class="nc-product-slider-main">
      <div class="nc-block-carousel" data-flickity='<?php echo json_encode($flickityOptions) ?>'>
        <?php
        foreach ($products as $p) { ?>
          <div class="carousel-cell">
            <div class="nc-product-slider-item">
              <img class="nc-product-carousel-item-thumbnail" src="<?php echo $p['product_images'][0]['image_url'] ?>" alt="">
            </div>
            <div class="nc-product-slider-meta">
              <a href="<?php echo North_Commerce_Product::get_permalink_base() . $p['slug'] ?>" class="nc-product-slider-title" style="color:<?php echo $title_text_color ?>">
                <?php echo $p['name'] ?>
              </a>
              <p class="nc-product-slider-price" style="color:<?php echo $price_text_color ?>">
                <?php echo North_Commerce_Settings::get_currency_symbol() . $p['base_price'] ?>
                <?php echo North_Commerce_Settings::formatted_price($p['base_price'], false)   ?>
              </p>
            </div>
          </div>
        <?php }  ?>
      </div>
    </div>
  </section>
<?php
  return ob_get_clean();
}
