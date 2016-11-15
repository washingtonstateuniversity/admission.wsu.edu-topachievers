<?php

add_filter( 'spine_child_theme_version', 'admission_ta_theme_version' );
function admission_ta_theme_version() {
	return '0.0.1';
}

add_action( 'wp_enqueue_scripts', 'admission_ta_wp_enqueue_scripts', 20 );
/**
 * Enqueue scripts and styles required for front end pageviews.
 */
function admission_ta_wp_enqueue_scripts() {
	wp_enqueue_script( 'admission-ta-script', get_stylesheet_directory_uri() . '/js/script.min.js', array( 'jquery' ), spine_get_child_version() );
}
