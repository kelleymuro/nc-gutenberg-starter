<?php
/**
 * Customizations for the Block Editor.
 */

/**
 * Register category for the North Commerce blocks.
 *
 * @param array $categories Block categories.
 *
 * @return array Modified block categories.
 */
function north_commerce_blocks_register_block_category( array $categories ) : array {
	$categories[] = [
		'slug'  => 'north-commerce',
		'title' => 'North Commerce'
	];

	return $categories;
}
add_filter( 'block_categories_all' , 'north_commerce_blocks_register_block_category' );
