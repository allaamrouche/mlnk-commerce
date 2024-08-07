<?php get_header(); ?>

<div id="content" class="content" data-template="single">
    <div class="single" data-background="#edeee9" data-color="#111">
        <div class="single__wrapper">

            <?php while (have_posts()) : the_post(); ?>
                <article class="single__post--<?php the_ID(); ?>" <?php post_class(); ?>>
                    <div class="single__post__wrapper">
                        <h1 class="single__post--title"><?php the_title(); ?></h1>
                        <div class="single__post--info">
                            <p class="single__post--date">Posted in: <?php echo get_the_date(); ?></p>
                            <p class="single__post--category">Categories: <?php the_category( ' ' ); ?> </p>
                            <p class="single__post--tags">Tags: <?php the_tags('', ', '); ?></p>
                        </div>
                    </div>
                    <div class="single__post--content">
                        <?php the_content(); ?>
                    </div>
                </article>
            <?php 
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;
            
        endwhile; 
        
        ?>

        </div>
    </div>

<?php get_footer(); ?>