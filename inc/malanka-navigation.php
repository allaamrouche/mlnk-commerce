<?php

class Malanka_Nav_Walker extends Walker_Nav_Menu {
    // Start Level
    function start_lvl(&$output, $depth = 0, $args = null) {
        $indent = str_repeat("\t", $depth);
        $output .= "\n$indent<ul class=\"navigation__list\">\n";
    }

    // End Level
    function end_lvl(&$output, $depth = 0, $args = null) {
        $indent = str_repeat("\t", $depth);
        $output .= "$indent</ul>\n";
    }

    // Start Element
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $indent = ($depth) ? str_repeat("\t", $depth) : '';
        $url = esc_url($item->url);
        $title = apply_filters('the_title', $item->title, $item->ID);

        $output .= $indent . '<li class="navigation__list__item"><a class="navigation__list__link dynamic__link" href="' . $url . '">' . $title . '</a>';
    }

    // End Element
    function end_el(&$output, $item, $depth = 0, $args = null) {
        $output .= "</li>\n";
    }
}
