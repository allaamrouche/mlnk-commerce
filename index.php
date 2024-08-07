<?php get_header(); ?>
<div id="content" class="content" data-template="main">
    <div class="main" data-background="#edeee9" data-color="#111">
      <div class="main__wrapper">

    <?php  while(have_posts()) { the_post(); ?>
    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
    <?php the_content(); } ?>
    </div>
    </div>
<?php get_footer(); ?>