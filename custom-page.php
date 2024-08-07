<?php
/*
Template Name: Malanka Custom WebGL Page
*/

get_header();  // This includes your header.php template

// Start the Loop.
while ( have_posts() ) : the_post(); ?>

    <div id="primary" class="content-area">
        <main id="main" class="site-main" role="main">

            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header">
                    <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                </header><!-- .entry-header -->

                <div class="entry-content">
                    <?php
                        the_content();

                        wp_link_pages( array(
                            'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'textdomain' ),
                            'after'  => '</div>',
                        ) );
                    ?>
                </div><!-- .entry-content -->
            </article><!-- #post-<?php the_ID(); ?> -->

        </main><!-- .site-main -->
    </div><!-- .content-area -->

<?php endwhile;  // End of the loop.

get_footer();  // This includes your footer.php template