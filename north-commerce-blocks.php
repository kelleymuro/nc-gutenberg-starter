<?php

/**
 * Plugin Name:       North Commerce Blocks
 * Description:       Blocks for the North Commerce plugin.
 * Requires at least: 6.2
 * Requires PHP:      7.0
 * Version:           0.1
 * Author:            North Plugins
 * Author URI:        https://northplugins.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       north-commerce
 * Domain Path:       /languages
 */

//if direct access is called, abort
if (!defined('WPINC')) {
  die;
}


define('NORTH_COMMERCE_BLOCKS_PLUGIN_DIR_PATH', plugin_dir_path(__FILE__));

require_once NORTH_COMMERCE_BLOCKS_PLUGIN_DIR_PATH . 'inc/north-commerce-blocks-init.php';

\NorthCommerce\Blocks\North_Commerce_Blocks_Init::init();
