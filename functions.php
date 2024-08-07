<?php
require get_template_directory() . '/inc/malanka-overlay-navigation.php';
require get_template_directory() . '/inc/malanka-navigation.php';
require get_template_directory() . '/inc/woocommerce-single-product.php';
function malanka_enqueue_scripts() {
    wp_enqueue_style('malanka-style', get_template_directory_uri() . '/assets/css/main.css');
    wp_enqueue_script('malanka-script', get_template_directory_uri() . '/assets/js/main.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'malanka_enqueue_scripts');

function malanka_enqueue_editor_scripts() {
    // Enqueue editor-specific JavaScript
    wp_enqueue_script('malanka-editor-script', get_template_directory_uri() . '/assets/js/editor.js', array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), filemtime(get_template_directory() . '/assets/js/editor.js'), true);
}
add_action('enqueue_block_editor_assets', 'malanka_enqueue_editor_scripts');

function malanka_config() {
    register_nav_menus(array(
        'header-menu' => __('Malanka Header Menu', 'malanka'), 
        'overlay-menu' => __('Malanka Overlay Menu', 'malanka'), 
    ));

    add_theme_support('post-thumbnails');
    add_theme_support('woocommerce');

}
add_action('after_setup_theme', 'malanka_config', 20);

function malanka_modify_image_output($content) {
    return preg_replace_callback('/<img\s+(.*?)src=["\']([^"\']+)["\'](.*?)>/i', function ($matches) {
        if (strpos($matches[0], 'data-src=') !== false) {
            return $matches[0];  // Skip if data-src is already set
        }
        $placeholder_image = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';  // Placeholder image
        return '<img ' . $matches[1] . ' data-src="' . $matches[2] . '" src="' . $placeholder_image . '" ' . $matches[3] . '>';
    }, $content);
}

add_filter('the_content', 'malanka_modify_image_output');
add_filter('post_thumbnail_html', 'malanka_modify_image_output');
add_filter('widget_text_content', 'malanka_modify_image_output');
add_filter('get_image_tag', 'malanka_modify_image_output');









