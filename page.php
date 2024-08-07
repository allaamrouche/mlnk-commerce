<?php get_header(); ?>

<div id="content" class="content" data-template="home">
    <div class="home" data-background="#edeee9" data-color="#111">
    <div class="home__wrapper">
    <?php while (have_posts()) { the_post(); ?>
        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
        <?php
        if (has_post_thumbnail()) {
            // Display the thumbnail
            the_post_thumbnail();
        }
        ?>
        <?php the_content(); ?>
    <?php } ?>

    </div>
</div>
</div>
<?php get_footer(); ?>