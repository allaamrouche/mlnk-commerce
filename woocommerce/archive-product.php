<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
get_header();

// Get all product categories
$args = array(
    'taxonomy' => 'product_cat',
    'orderby' => 'name',
    'order' => 'ASC',
    'hide_empty' => true, 
);
$product_categories = get_terms('product_cat', $args);

do_action('woocommerce_before_main_content');
?>

<div id="content" class="content" data-template="collections">
<div class="collections" data-background="#edeee9" data-color="#111">
    <div class="collections__wrapper">
    <?php 
echo '<div class="collections__titles">'; // Start the outer container

// Loop three times
for ($i = 0; $i < 3; $i++) {
    echo '<div class="collections__titles__wrapper">'; // Start wrapper for each iteration

    $index = 1; // Reset index for each iteration

    foreach ($product_categories as $category) {
        if ($category->count > 0) { 
            echo '<div class="collections__titles__item">'; 
            echo '<div class="collections__titles__label">'; 
            echo '<div class="collections__titles__label__text">' . $index . '. ' . esc_html($category->name) . '</div>'; // Output label text
            echo '</div>'; 
            echo '<div class="collections__titles__title">'; 
            echo '<div class="collection__titles__title__text">' . esc_html($category->name) . '</div>'; // Output title text
            echo '</div>'; 
            echo '</div>'; 
        }
        $index++; 
    }

    echo '</div>'; 
}

echo '</div>';
?>
<div class="collections__gallery">
    <div class="collections__gallery__wrapper">
        <?php 
        $category_index = 0; 
        foreach ($product_categories as $category) {
            if ($category->count > 0) {
                $args = array(
                    'post_type' => 'product',
                    'posts_per_page' => 4,
                    'tax_query' => array(
                        array(
                            'taxonomy' => 'product_cat',
                            'field' => 'slug',
                            'terms' => $category->slug,
                        ),
                    ),
                );
                $products = new WP_Query($args);
                if ($products->have_posts()) {
                    while ($products->have_posts()) : $products->the_post();
                        $image_url = has_post_thumbnail() ? get_the_post_thumbnail_url(get_the_ID(), 'large') : '';
                        echo '<a href="' . get_permalink() . '" class="collections__gallery__link">';
                
                        echo '<figure class="collections__gallery__media" data-index="' . $category_index . '" data-url="' . $image_url . '" data-detail-url="' . get_permalink() . '">';
                        if ($image_url) {
                            the_post_thumbnail(null, [
                                'class' => 'collections__gallery__media__image',
                                'data-src' => $image_url,
                                'data-model-src' => $image_url
                            ]);
                        }
                        echo '</figure>';
                        echo '</a>';
                      
                    endwhile;
                }
                wp_reset_postdata();
                $category_index++; 
            }
        }
        ?>
    </div>
</div>


<div class="collections__content">
    <?php
    $category_index = 0;
    foreach ($product_categories as $category) {
        if ($category->count > 0) {
            $class = ($category_index === 0) ? 'collections__article--active' : '';
            
            echo '<article class="collections__article ' . $class . '">';
            echo '<h2 class="collections__article__title">' . esc_html($category->name) . '</h2>';

            if (!empty($category->description)) {
                echo '<p class="collections__article__description">' . wp_kses_post($category->description) . '</p>';
            } else {
                echo '<p class="collections__article__description">No description available.</p>';
            }

            echo '</article>';
            $category_index++;
        }
    }
    ?>
</div>


    </div>
</div>

<?php
do_action('woocommerce_after_main_content');
get_footer();
?>


