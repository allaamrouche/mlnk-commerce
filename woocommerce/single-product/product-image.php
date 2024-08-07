<?php
/**
 * Single Product Image
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/product-image.php.
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 7.8.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

// Retrieve the ID of the main product image
$post_thumbnail_id = $product->get_image_id();

// Check if there's a product image
if ( $post_thumbnail_id ) {
    $full_size_image_url = wp_get_attachment_image_url( $post_thumbnail_id, 'full' );
} else {
    // Fallback to a placeholder if no image is set
    $full_size_image_url = wc_placeholder_img_src( 'woocommerce_single' );
}

// Use the alt tag of the product title
$image_alt = get_post_meta($post_thumbnail_id, '_wp_attachment_image_alt', true);
$image_alt = !empty($image_alt) ? $image_alt : $product->get_name();
?>
<figure class="detail__media">
    <img class="detail__media__image" data-src="<?php echo esc_url($full_size_image_url); ?>" alt="<?php echo esc_attr($image_alt); ?>">
</figure>
