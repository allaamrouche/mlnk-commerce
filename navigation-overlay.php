
<button id="navigation__overlay--toggle" class="navigation__overlay--toggle">Menu</button>

    <?php wp_nav_menu(array(
    'theme_location' => 'overlay-menu', 
    'container' => 'nav', 
    'container_class' => 'navigation__overlay', 
    'echo' => true,
    'fallback_cb' => '__return_false',
    'items_wrap' => '%3$s', 
    'depth' => 0,
    'walker' => new Malanka_Overlay_Nav_Walker(), 
)); ?>
	