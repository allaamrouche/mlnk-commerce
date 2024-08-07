<?php
/*
Template Name: Detail Page
*/

get_header();

?>

<div id="content" class="content" data-template="detail">
  <div class="detail" data-background="#edeee9" data-color="#111">
    <div class="detail__wrapper">
        <figure class="detail__media">
            <img class="detail__media__image" data-src="<?php echo get_template_directory_uri(); ?>/images/mlnk7.jpeg" alt="Service Image" >
        </figure>
        <div class="detail__information">
            <p class="detail__information__collection">Collection</p>
            <h1 class="detail__information__title">Keratin treatment</h1>
            <div class="detail__information__content">

                <div class="detail__information__highlights">
                    <p class="detail__information__higlight">
                    <svg class="detail__information__highlight__icon detail__information__highlight__icon--star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <path fill="currentColor" d="M24.26,9.87l-2.76,8.6l8.72-2.63l-8.16,4.13l8.15,4.26l-8.71-2.82l2.82,8.91l-4.26-8.34l-4.14,8.15l2.63-8.72 l-8.6,2.75l8.15-4.2l-8.34-4.33l8.78,2.82l-2.82-8.78l4.33,8.34L24.26,9.87z"></path>
                      <path fill="none" stroke="currentColor" d="M20,0.5c10.77,0,19.5,8.73,19.5,19.5S30.77,39.5,20,39.5S0.5,30.77,0.5,20S9.23,0.5,20,0.5z"></path>
                    </svg>
                      <span class="detail__information__highlight__text">
                      Achieve smooth, frizz-free hair with our keratin treatments
                      </span>
                    </p>
                    <p class="detail__information__higlight">
                    <svg class="detail__information__highlight__icon detail__information__highlight__icon--arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <path stroke="currentColor" d="M14.84,25.46l11.31-11.31"></path>
                      <path fill="currentColor" d="M30.75,9.55l-0.66,2.36l-0.05,2.59l-1.93-2.31l-2.31-1.93l2.59-0.05L30.75,9.55z"></path>
                      <path fill="currentColor" d="M10.25,30.05l0.66-2.36l0.05-2.59l1.93,2.31l2.31,1.93l-2.59,0.05L10.25,30.05z"></path>
                      <path fill="none" stroke="currentColor" d="M20,0.5c10.77,0,19.5,8.73,19.5,19.5S30.77,39.5,20,39.5S0.5,30.77,0.5,20S9.23,0.5,20,0.5z"></path>
                    </svg>
                      <span class="detail__information__highlight__text">
                        Illuminate your hair with our custom highlights and balayage services
                      </span>
                    </p>
                </div>

                <div class="detail__information__list">
                    <p class="detail__information__item">
                        <strong class="detail__information__item__title">Service info label</strong>
                        <span class="detail__information__item__description">Ideal for all hair types, this rejuvenating service not only smooths and straightens but also significantly reduces styling time, leaving your hair silky, shiny, and manageable.</span>
                    </p>

                    <p class="detail__information__item">
                        <strong class="detail__information__item__title">You should also know</strong>
                        <span class="detail__information__item__description">Whether you're looking for a subtle sun-kissed effect or dramatic contrast, our experts will create a personalized color blend that enhances your natural beauty and complements your features</span>
                    </p>
                </div>
                
                <a href="/" class="detail__information__link" target="_blank">Link Text</a>
                <button class="detail__button"> <span> close</span>
                <svg class="detail__button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 60">
                  <path fill="none" stroke="currentColor" opacity="0.4" d="M62,0.5c33.97,0,61.5,13.21,61.5,29.5S95.97,59.5,62,59.5S0.5,46.29,0.5,30S28.03,0.5,62,0.5z"></path>
                  <path class="home__link__icon__path" fill="none" stroke="currentColor" d="M62,0.5c33.97,0,61.5,13.21,61.5,29.5S95.97,59.5,62,59.5S0.5,46.29,0.5,30S28.03,0.5,62,0.5z"></path>
                </svg>
                </button>
               
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>


