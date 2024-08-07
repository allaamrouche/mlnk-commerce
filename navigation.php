<?php

if (has_nav_menu('header-menu')) {
    $custom_logo_id = get_theme_mod('custom_logo');
    $logo = wp_get_attachment_image_src($custom_logo_id, 'full');

    if (has_custom_logo()) {
        $logo_html = '<a class="navigation__logo__link" href="' . esc_url(home_url('/')) . '"><img src="' . esc_url($logo[0]) . '" alt="' . esc_attr(get_bloginfo('name')) . ' logo"></a>';
    } else {
        $logo_html = '<a class="navigation__logo__link" href="' . esc_url(home_url('/')) . '">' . esc_html(get_bloginfo('name')) . '</a>';
    }

    wp_nav_menu(array(
        'theme_location'  => 'header-menu',
        'menu_class'      => 'none',
        'container'       => 'nav',
        'container_class' => 'navigation',
        'items_wrap'      => '<div class="navigation__wrapper">' . $logo_html . '<ul class="navigation__list">%3$s</ul></div>',
        'walker'          => new Malanka_Nav_Walker(),
    ));
}
?>
