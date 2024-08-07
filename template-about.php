<?php
/*
Template Name: About Page
*/

get_header();


?>
 <div id="content" class="content" data-template="about">
<div class="about" data-background="#edeee9" data-color="#111">

<div class="about__wrapper">
        <!-- About Gallery Section -->
        <section class="about__gallery">
            <div class="about__gallery__wrapper">
            <?php
                // Define your images relative to the theme root
                $images = [
                    'images/mlnk10.jpeg',
                    'images/mlnk8.jpeg',
                    'images/mlnk9.jpeg',
                    'images/mlnk7.jpeg',
                    'images/mlnk6.jpeg',
                    'images/mlnk11.jpeg',
                ];
                foreach ($images as $image) {
                    // Use get_template_directory_uri() to get the theme root URI
                    echo '<figure class="about__gallery__media">';
                    echo '<img class="about__gallery__media__image" data-src="' . esc_url(get_template_directory_uri() . '/' . $image) . '" alt="Gallery Image">';
                    echo '</figure>';
                }
                ?>
            </div>
        </section>

        <!-- About Title -->
        <h2 class="about__title" data-animation="title">Reflects <br> Brand Essence</h2>

        <!-- About Content Section -->
        <section class="about__content about__content--left">
          <div class="about__content__wrapper">
            <div class="about__content__box">
              <p class="about__content__label" data-animation="paragraph">Article Label</p>
              <div class="about__content__description" data-animation="paragraph">The name should reflect the essence of your cosmetic brand. It should convey the style, values, and unique selling points of your products. For example, if your brand focuses on natural and organic cosmetics, the name should hint at this</div>
            </div>
            <figure class="about__content__media">
           
              <?php $content_image = 'images/mlnk11.jpeg'; ?>
              <img class="about__content__media__image--rounded" data-src="<?php echo esc_url(get_template_directory_uri() . '/' . $content_image); ?>" alt="Second Content Featured Image">
            </figure>
        
           
          </div>
        </section>

        <!-- About Highlight Section -->
        <section class="about__highlight">
            <div class="about__highlight__wrapper">
                <h4 class="about__highlight__title">Malanka</h4>
                <div class="about__highlight__medias">
                  <figure class="about__highlight__media">
                    <?php $content_image = 'images/mlnk6.jpeg'; ?>
                    <img class="about__highlight__media__image" data-src="<?php echo esc_url(get_template_directory_uri() . '/' . $content_image); ?>" alt="Second Content Featured Image">
                  </figure>
                  <figure class="about__highlight__media">
                    <?php $content_image = 'images/mlnk7.jpeg'; ?>
                    <img class="about__highlight__media__image" data-src="<?php echo esc_url(get_template_directory_uri() . '/' . $content_image); ?>" alt="Second Content Featured Image">
                  </figure>
                </div>
            </div>
        </section>

           <!-- About Gallery Section -->
           <section class="about__gallery">
            <div class="about__gallery__wrapper">
            <?php
                // Define your images relative to the theme root
                $images = [
                    'images/mlnk10.jpeg',
                    'images/mlnk8.jpeg',
                    'images/mlnk9.jpeg',
                    'images/mlnk7.jpeg',
                    'images/mlnk6.jpeg',
                    'images/mlnk11.jpeg',
                ];
                foreach ($images as $image) {
                    // Use get_template_directory_uri() to get the theme root URI
                    echo '<figure class="about__gallery__media">';
                    echo '<img class="about__gallery__media__image" data-src="' . esc_url(get_template_directory_uri() . '/' . $image) . '" alt="Gallery Image">';
                    echo '</figure>';
                }
                ?>
            </div>
        </section>
        <!-- About Title -->
        <h2 class="about__title" data-animation="title">Evokes Beauty <br> and Luxury</h2>

        <!-- About Content Section -->
        <section class="about__content about__content--right">
          <div class="about__content__wrapper">
            <div class="about__content__box">
              <p class="about__content__label" data-animation="paragraph">Article Label</p>
              <div class="about__content__description" data-animation="paragraph">Many cosmetics shoppers are drawn to products that make them feel more beautiful and luxurious. A name that evokes beauty, elegance, and luxury can be very attractive.</div>
            </div>
            <figure class="about__content__media">
              <?php $content_image = 'images/mlnk10.jpeg'; ?>
              <img class="about__content__media__image" data-src="<?php echo esc_url(get_template_directory_uri() . '/' . $content_image); ?>" alt="Second Content Featured Image">
            </figure>
          </div>
        </section>

        <!-- About Content Section -->
        <section class="about__content about__content--left">
          <div class="about__content__wrapper">
            <div class="about__content__box">
              <p class="about__content__label" data-animation="paragraph">Article Label</p>
              <div class="about__content__description" data-animation="paragraph">Whether you're looking for a subtle sun-kissed effect or dramatic contrast, our experts will create a personalized color blend that enhances your natural beauty and complements your features</div>
            </div>
            <figure class="about__content__media">
              <?php $content_image = 'images/mlnk9.jpeg'; ?>
              <img class="about__content__media__image" data-src="<?php echo esc_url(get_template_directory_uri() . '/' . $content_image); ?>" alt="Second Content Featured Image">
            </figure>
          </div>
        </section>

        <!-- About Highlight Section -->
        <section class="about__highlight">
            <div class="about__highlight__wrapper">
                <p class="about__highlight__label">follow us</p>
                <h4 class="about__highlight__title">Instagram</h4>
                <div class="about__highlight__medias">
                  <div>
                  <figure class="about__highlight__media">
                    <?php $content_image = 'images/mlnk6.jpeg'; ?>
                    <img class="about__highlight__media__image" data-src="<?php echo esc_url(get_template_directory_uri() . '/' . $content_image); ?>" alt="Second Content Featured Image">
                  </figure>
                  
                  </div>
                  <figure class="about__highlight__media">
                    <?php $content_image = 'images/mlnk7.jpeg'; ?>
                    <img class="about__highlight__media__image" data-src="<?php echo esc_url(get_template_directory_uri() . '/' . $content_image); ?>" alt="Second Content Featured Image">
                  </figure>
                </div>
            </div>
        </section>
    </div>
    </div>
<!-- </div>
</div> -->
<?php get_footer(); ?>


