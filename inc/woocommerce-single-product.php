<?php

function remove_woocommerce_default_hooks() {
    // Remove the product title
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
    
    // Remove the product rating
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_rating', 10 );
    
    // Remove the product price
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
    
    // Remove the product excerpt
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );
    
    // Remove the add to cart button
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
    
    // Remove the meta information
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
    
    // Remove the sharing buttons
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_sharing', 50 );
}
add_action( 'wp', 'remove_woocommerce_default_hooks' );


function add_custom_product_summary_content() {
    global $product;
    if (!$product) {
        $product = wc_get_product();
    }

    $categories = wc_get_product_category_list($product->get_id(), ', ', '<span class="posted_in">Category: ', '</span>');
    $product_name = $product->get_name();
    $product_description = $product->get_description();

    echo '<p class="detail__information__collection">' . $categories . '</p>';
    echo '<h1 class="detail__information__title">' . $product_name . '</h1>';
    echo '<div class="detail__information__content">';
    echo '<div class="detail__information__highlights">';
    echo '<p class="detail__information__highlight">';
    echo '<svg class="detail__information__highlight__icon detail__information__highlight__icon--star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">';
    echo '<path fill="currentColor" d="M24.26,9.87l-2.76,8.6l8.72-2.63l-8.16,4.13l8.15,4.26l-8.71-2.82l2.82,8.91l-4.26-8.34l-4.14,8.15l2.63-8.72 l-8.6,2.75l8.15-4.2l-8.34-4.33l8.78,2.82l-2.82-8.78l4.33,8.34L24.26,9.87z"></path>';
    echo '<path fill="none" stroke="currentColor" d="M20,0.5c10.77,0,19.5,8.73,19.5,19.5S30.77,39.5,20,39.5S0.5,30.77,0.5,20S9.23,0.5,20,0.5z"></path>';
    echo '</svg>';
    echo '<span class="detail__information__highlight__text">Achieve smooth, frizz-free hair with our keratin treatments</span>';
    echo '</p>';
    echo '<p class="detail__information__highlight">';
    echo '<svg class="detail__information__highlight__icon detail__information__highlight__icon--arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">';
    echo '<path stroke="currentColor" d="M14.84,25.46l11.31-11.31"></path>';
    echo '<path fill="currentColor" d="M30.75,9.55l-0.66,2.36l-0.05,2.59l-1.93-2.31l-2.31-1.93l2.59-0.05L30.75,9.55z"></path>';
    echo '<path fill="currentColor" d="M10.25,30.05l0.66-2.36l0.05-2.59l1.93,2.31l2.31,1.93l-2.59,0.05L10.25,30.05z"></path>';
    echo '<path fill="none" stroke="currentColor" d="M20,0.5c10.77,0,19.5,8.73,19.5,19.5S30.77,39.5,20,39.5S0.5,30.77,0.5,20S9.23,0.5,20,0.5z"></path>';
    echo '</svg>';
    echo '<span class="detail__information__highlight__text">Illuminate your hair with our custom highlights and balayage services</span>';
    echo '</p>';
    echo '</div>';
    echo '<div class="detail__information__list">';
    echo '<p class="detail__information__item">';
    echo '<strong class="detail__information__item__title">Service info label</strong>';
    echo '<div class="detail__information__item__description">' . $product_description . '</div>';
    echo '</p>';
    echo '<p class="detail__information__item">';
    echo '<strong class="detail__information__item__title">You should also know</strong>';
    echo '<div class="detail__information__item__description">' . $product_description . '</div>';
    echo '</p>';
    echo '</div>';

    echo '<p class="product_price">' . $product->get_price_html() . '</p>';

    // Add to Cart button
    echo '<div class="product_add_to_cart">';
    woocommerce_template_single_add_to_cart();
    echo '</div>';



    echo '<a href="/" class="detail__information__link" target="_blank">Link Text</a>';
    echo '<a href="' . get_permalink( wc_get_page_id( 'shop' ) ) . '" class="detail__button dynamic__link" target="_blank">
      <span>Close</span>
      <svg class="detail__button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 60">
        <path fill="none" stroke="currentColor" opacity="0.4" d="M62,0.5c33.97,0,61.5,13.21,61.5,29.5S95.97,59.5,62,59.5S0.5,46.29,0.5,30S28.03,0.5,62,0.5z"></path>
        <path class="home__link__icon__path" fill="none" stroke="currentColor" d="M62,0.5c33.97,0,61.5,13.21,61.5,29.5S95.97,59.5,62,59.5S0.5,46.29,0.5,30S28.03,0.5,62,0.5z"></path>
      </svg>
      </a>';
    echo '</div>';
}
add_action('woocommerce_single_product_summary', 'add_custom_product_summary_content', 5);

