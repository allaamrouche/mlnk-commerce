<?php
/*
Template Name: Introduction Page
*/

get_header(); 

?>
<div id="content" class="content" data-template="intro">
<div class="intro" data-background="#edeee9" data-color="#111">
  <div class="intro__wrapper">
    <div class="intro__titles">
   
      <div class="intro__titles__label">
        <div class="intro__titles__label__text">Label</div>
      </div>
      <div class="intro__titles__title">
        <div class="intro__titles__title__text">Collection </div>
      </div>
    
    </div>
    <div class="intro__gallery">

    <?php

      $images = [
          'images/mlnk10.jpeg',
          'images/mlnk8.jpeg',
          'images/mlnk9.jpeg',
          'images/mlnk7.jpeg',
          'images/mlnk6.jpeg',
          'images/mlnk8.jpeg',
          'images/mlnk7.jpeg',
          'images/mlnk6.jpeg',
          'images/mlnk.jpeg',
          'images/mlnk11.jpeg',
          'images/mlnk10.jpeg',
          'images/mlnk8.jpeg',
          'images/mlnk6.jpeg',
          'images/mlnk7.jpeg',
          'images/mlnk.jpeg'
      ];

      $index = 0; // Initialize $index outside the loop
      foreach ($images as $image) {
          // Use modulo operator to cycle through classes 1 to 5
          echo '<figure class="intro__gallery__media">';
          echo '<img class="intro__gallery__media__image" data-src="' . esc_url(get_template_directory_uri() . '/' . $image) . '" alt="intro Gallery Image">';
          echo '</figure>';
          $index++; // Increment $index at the end of each iteration
      }
    ?>
   
    </div>
    <a class="intro__link" data-animation="button" href="/">
      <span>view collections</span>
      <svg class="intro__link__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 60">
        <path stroke="currentColor" opacity="0.4" fill="none" d="M144,0.5c79.25,0,143.5,13.21,143.5,29.5S223.25,59.5,144,59.5S0.5,46.29,0.5,30S64.75,0.5,144,0.5z"></path>
        <path class="intro__link__icon__path" stroke="#000" fill="none" d="M144,0.5c79.25,0,143.5,13.21,143.5,29.5S223.25,59.5,144,59.5S0.5,46.29,0.5,30S64.75,0.5,144,0.5z"></path>
      </svg>
    </a>

  </div>
</div>

<?php get_footer(); ?>