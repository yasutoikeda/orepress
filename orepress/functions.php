<?php

function my_scripts() {
  wp_enqueue_style( 'style-name', get_template_directory_uri() . '/assets/css/app.css', array(), '1.0.0', 'all' );
  wp_enqueue_script( 'script-name', get_template_directory_uri() . '/assets/js/all.js', array( 'jquery' ), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'my_scripts' );

?>