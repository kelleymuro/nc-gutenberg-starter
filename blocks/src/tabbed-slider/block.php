<?php

/**
 * Register the Tabbed Slider
 */
function north_commerce_blocks_register_tabbed_slider_block(): WP_Block_Type|false {
  return register_block_type(
    get_template_directory(). '/blocks/build/tabbed-slider/',
    [
      'render_callback' => 'north_commerce_blocks_output_tabbed_slider_block',
    ]
  );
}
add_action('init', 'north_commerce_blocks_register_tabbed_slider_block');

/**
 * Render the Tabbed Slider block.
 */
function north_commerce_blocks_output_tabbed_slider_block($attributes): string {
  $title_text_color = $attributes['titleTextColor'] ?? 'inherit';
  $categories_text_color = $attributes['categoriesTextColor'] ?? 'inherit';

  $data_one = $attributes['dataOne'];
  $data_two = $attributes['dataTwo'];
  $data_three = $attributes['dataThree'];

  $category_one = $data_one['category'] ?? "__all__";
  $category_two = $data_two['category'] ?? "__all__";
  $category_three = $data_three['category'] ?? "__all__";


  $agent = North_Commerce_Db_Agent::instance();
  $ea = $agent->entityAccess();

  $filter_one = true;
  if ($category_one != "__all__") {
    $filter_one = ['product_categories.category_id' =>  $category_one];
  }

  $filter_two = true;
  if ($category_two != "__all__") {
    $filter_two = ['product_categories.category_id' =>  $category_two];
  }

  $filter_three = true;
  if ($category_three != "__all__") {
    $filter_three = ['product_categories.category_id' =>  $category_three];
  }

  $products_one = $ea->list('products', $filter_one, ['expand' => 'product_tags,product_images,product_options,product_categories.category', 'limit' => '3']);
  $products_two = $ea->list('products', $filter_two, ['expand' => 'product_tags,product_images,product_options,product_categories.category', 'limit' => '3']);
  $products_three = $ea->list('products', $filter_three, ['expand' => 'product_tags,product_images,product_options,product_categories.category', 'limit' => '3']);

  $tabsData = [
    ["products" => $products_one, "tab" => "tab1"],
    ["products" => $products_two, "tab" => "tab2"],
    ["products" => $products_three, "tab" => "tab3"],
  ];

  ob_start();
?>

  <section class="tab-area" data-tabbed-slider-block>
    <div class="nc-tab-container">
      <div class="tab-main">
        <div class="tabs">
          <ul class="tab-links">
            <li class="active" data-open-tab="tab1"><a><?php echo $data_one['tabTitle'] ?></a></li>
            <li data-open-tab="tab2"><a><?php echo $data_two['tabTitle'] ?></a></li>
            <li data-open-tab="tab3"><a><?php echo $data_three['tabTitle'] ?></a></li>
          </ul>
          <div class="tab-content">
            <?php
            foreach ($tabsData as $tabData) {
              $products = $tabData['products'];
              $tabName = $tabData['tab'];

            ?>
              <div class="tab" data-tab="<?php echo $tabName ?>">
                <div>
                  <div class="tab-part">
                    <div class="nc-tab-row">
                      <?php foreach ($products as $p) {

                        $categories = "";
                        foreach ($p['product_categories'] as $c) {
                          $categories .= $c['category']['name'] . ", ";
                        }
                      ?>
                        <div class="col-md-4">
                          <div class="tab-item" data-type="nc-product" data-id="<?php echo $p['id'] ?>">
                            <div class="tab-fav">
                              <img src="<?php echo $p['product_images'][0]['image_url'] ?>" />
                              <div class="tab-inner">
                                <ul>
                                  <li data-add-to-cart-action>
                                    <a href="javascript:void(0)"><?php echo esc_html__('Add to basket', "north-commerce") ?></a>
                                  </li>
                                  <li>
                                    <a href="<?php echo North_Commerce_Product::get_permalink_base() . $p['slug'] ?>"><?php echo esc_html__('View Product', "north-commerce") ?></a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="tab-cnt">
                              <label style="color:<?php echo $title_text_color ?>"><?php echo $p['name'] ?></label>
                              <p style="color:<?php echo $categories_text_color ?>"><?php echo $categories ?></p>
                            </div>
                          </div>
                        </div>
                      <?php }  ?>

                    </div>
                  </div>
                </div>
              </div>

            <?php } ?>
          </div>
        </div>
      </div>
    </div>
  </section>

<?php
  return ob_get_clean();
}
