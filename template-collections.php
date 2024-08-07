<?php
/*
Template Name: Collections Page
*/
get_header();

?>

<div id="content" class="content" data-template="collections">
<div class="collections" data-background="#edeee9" data-color="#111">
   <div class="collections__wrapper">
        <div class="collections__titles">
            <div class="collection__titles__label">One</div>
            <br>
            <div class="collection__titles__title">Collection</div>

            <div class="collection__titles__label">two</div>
            <br>
            <div class="collection__titles__title">Collection</div>

            <div class="collection__titles__label">three</div>
            <br>
            <div class="collection__titles__title">Collection</div>
            <div class="collection__titles__label">four</div>
            <br>
            <div class="collection__titles__title">Collection</div>
        </div>

        <div class="collections__gallery">
           <div class="collections__gallery__wrapper">

            <div class="collections__gallery__item">
                <a href="/detail" class="collections__gallery__link">
                    <figure class="collections__gallery__media">
                        <img class="collections__gallery__media__image" data-src="<?php echo get_template_directory_uri(); ?>/images/mlnk6.jpeg" alt="Service Image" >
                    </figure>
                </a>
            </div>

            <div class="collections__gallery__item">
                <a href="/detail" class="collections__gallery__link">
                    <figure class="collections__gallery__media">
                        <img class="collections__gallery__media__image" data-src="<?php echo get_template_directory_uri(); ?>/images/mlnk7.jpeg" alt="Service Image" >
                    </figure>
                </a>
            </div>

            <div class="collections__gallery__item">
                <a href="/detail" class="collections__gallery__link">
                    <figure class="collections__gallery__media">
                        <img class="collections__gallery__media__image" data-src="<?php echo get_template_directory_uri(); ?>/images/mlnk8.jpeg" alt="Service Image" >
                    </figure>
                </a>
            </div>

            <div class="collections__gallery__item">
                <a href="/detail" class="collections__gallery__link">
                    <figure class="collections__gallery__media">
                        <img class="collections__gallery__media__image" data-src="<?php echo get_template_directory_uri(); ?>/images/mlnk9.jpeg" alt="Service Image" >
                    </figure>
                </a>
            </div>  
            
            <div class="collections__gallery__item">
                <a href="/detail" class="collections__gallery__link">
                    <figure class="collections__gallery__media">
                        <img class="collections__gallery__media__image" data-src="<?php echo get_template_directory_uri(); ?>/images/mlnk6.jpeg" alt="Service Image" >
                    </figure>
                </a>
            </div>

            <div class="collections__gallery__item">
                <a href="/detail" class="collections__gallery__link">
                    <figure class="collections__gallery__media">
                        <img class="collections__gallery__media__image" data-src="<?php echo get_template_directory_uri(); ?>/images/mlnk7.jpeg" alt="Service Image" >
                    </figure>
                </a>
            </div>

            <div class="collections__gallery__item">
                <a href="/detail" class="collections__gallery__link">
                    <figure class="collections__gallery__media">
                        <img class="collections__gallery__media__image" data-src="<?php echo get_template_directory_uri(); ?>/images/mlnk8.jpeg" alt="Service Image" >
                    </figure>
                </a>
            </div>

            <div class="collections__gallery__item">
                <a href="/detail" class="collections__gallery__link">
                    <figure class="collections__gallery__media">
                        <img class="collections__gallery__media__image" data-src="<?php echo get_template_directory_uri(); ?>/images/mlnk9.jpeg" alt="Service Image" >
                    </figure>
                </a>
            </div>    
          </div>
        </div>

         <div class="collections__content">
            <article class="collections__article">
                <h2 class="collections__article__title">Collections Title</h2>
                <p class="collections__article__description">Whether you're looking for a subtle sun-kissed effect or dramatic contrast, our experts will create a personalized color blend that enhances your natural beauty and complements your features</p>
            </article>
         </div>
         

   </div>
</div>

<?php get_footer(); ?>