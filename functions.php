<?php

namespace NorthCommerce\Themes;

require_once __DIR__ . '/inc/editor-customizations.php';
require_once __DIR__ . '/blocks/blocks.php';

function setup() {

    // Remove core block patterns
    remove_theme_support('core-block-patterns');
}
add_action( 'after_setup_theme', __NAMESPACE__ . '\setup' );



/**
 * Add block style variations.
 */

 function register_block_styles() {
    $block_styles = array(
        'core/separator' => array(
            'half-width' => __( 'Half Width', 'north-commerce' ),
        )
    );

    foreach ( $block_styles as $block => $styles ) {
		foreach ( $styles as $style_name => $style_label ) {
			register_block_style(
				$block,
				array(
					'name'  => $style_name,
					'label' => $style_label,
				)
			);
		}
	}
}
add_action( 'init', __NAMESPACE__ . '\register_block_styles' );


/**
 * Load custom block styles only when the block is used.
 */
function enqueue_custom_block_styles() {

	// Scan our styles folder to locate block styles.
	$files = glob( get_template_directory() . '/assets/styles/*.css' );

	foreach ( $files as $file ) {

		// Get the filename and core block name.
		$filename   = basename( $file, '.css' );
		$block_name = str_replace( 'core-', 'core/', $filename );

		wp_enqueue_block_style(
			$block_name,
			array(
				'handle' => "NorthCommerce-block-{$filename}",
				'src'    => get_theme_file_uri( "assets/styles/{$filename}.css" ),
				'path'   => get_theme_file_path( "assets/styles/{$filename}.css" ),
			)
		);
	}
}
add_action( 'init', __NAMESPACE__ . '\enqueue_custom_block_styles' );





/**
 * Register pattern categories.
 */
function pattern_categories() {

	$block_pattern_categories = array(
        'hero'           => array(
            'label' => __( 'Hero', 'north-commerce' ),
        ),
		'card'           => array(
			'label' => __( 'Cards', 'north-commerce' ),
		),
		'call-to-action' => array(
			'label' => __( 'Call To Action', 'north-commerce' ),
		),
		'columns'        => array(
			'label' => __( 'Columns', 'north-commerce' ),
		),
		'features'       => array(
			'label' => __( 'Features', 'north-commerce' ),
		),
		'pages'          => array(
			'label' => __( 'Pages', 'north-commerce' ),
		),
		'posts'          => array(
			'label' => __( 'Posts', 'north-commerce' ),
		),
		'pricing'        => array(
			'label' => __( 'Pricing', 'north-commerce' ),
		),
		'testimonial'    => array(
			'label' => __( 'Testimonials', 'north-commerce' ),
		),
	);

	foreach ( $block_pattern_categories as $name => $properties ) {
		register_block_pattern_category( $name, $properties );
	}
}
add_action( 'init', __NAMESPACE__ . '\pattern_categories', 9 );