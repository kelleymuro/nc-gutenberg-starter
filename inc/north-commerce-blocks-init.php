<?php

namespace NorthCommerce\Blocks;


class North_Commerce_Blocks_Init {
  public static function init() {
    self::require_files();
  }

  private static function require_files() {
    require_once get_template_directory() . 'inc/editor-customizations.php';
    require_once get_template_directory() . '/north-commerce-blocks/build/product-gallery/block.php';
    require_once get_template_directory() . '/north-commerce-blocks/build/product-slider/block.php';
    require_once get_template_directory() . '/north-commerce-blocks/build/tabbed-slider/block.php';
    require_once get_template_directory() . '/north-commerce-blocks/build/product/block.php';
    require_once get_template_directory() . '/north-commerce-blocks/build/product-title/block.php';
  }
}
