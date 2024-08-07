<?php
/**
 * The template for displaying comments.
 *
 * This is the area of the page that contains both the current comments
 * and the comment form.
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
    return;
}
?>

<div class="comments__area">

    <?php if ( have_comments() ) : ?>
        <h2 class="comments__title">
            <?php
            $comments_number = get_comments_number();
            if ( '1' === $comments_number ) {
                printf( _x( 'One comment on &ldquo;%s&rdquo;', 'comments title', 'textdomain' ), get_the_title() );
            } else {
                printf(
                    _nx(
                        '%1$s comment on &ldquo;%2$s&rdquo;',
                        '%1$s comments on &ldquo;%2$s&rdquo;',
                        $comments_number,
                        'comments title',
                        'malanka'
                    ),
                    number_format_i18n( $comments_number ),
                    get_the_title()
                );
            }
            ?>
        </h2>

        <ol class="comments__list">
            <?php
            wp_list_comments( array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 42,
                'callback'    => null, // Optional custom callback to format comments
            ) );
            ?>
        </ol>

        <?php the_comments_navigation(); ?>

    <?php endif; // Check for have_comments(). ?>

    <?php
    // If comments are closed and there are comments, let's leave a little note.
    if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) : ?>
        <p class="comments__closed">Comments are closed.</p>
    <?php endif; ?>

    <?php
    comment_form(array(
        'class_form' => 'comments__form',
        'title_reply_before' => '<h2 class="comments__reply-title">',
        'title_reply_after' => '</h2>',
    ));
    ?>

</div><!-- .comments__area -->
