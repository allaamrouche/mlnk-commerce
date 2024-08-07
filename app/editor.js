( function( blocks, element, blockEditor ) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var useBlockProps = blockEditor.useBlockProps;

    blocks.registerBlockType('mytheme/about-title', {
        title: 'About Title',
        icon: 'universal-access-alt', // or any other dashicon
        category: 'layout',
        attributes: {
            content: {
                type: 'string',
                source: 'html',
                selector: 'h2',
            },
        },
        edit: function(props) {
            var blockProps = useBlockProps({
                className: 'about__title',
                'data-animation': 'title'  // Ensuring data attribute is present during editing
            });
            var content = props.attributes.content;
            function onChangeContent(newContent) {
                props.setAttributes({ content: newContent });
            }

            return el(
                RichText,
                {
                    ...blockProps,
                    tagName: 'h2',
                    value: content,
                    onChange: onChangeContent,
                    placeholder: 'Enter your text here',
                    'data-animation': 'title'  // Explicitly setting data attribute for RichText
                }
            );
        },
        save: function(props) {
            var blockProps = useBlockProps.save({
                className: 'about__title',
                'data-animation': 'title'  // Ensuring data attribute is present in saved content
            });
            return el(
                RichText.Content,
                {
                    ...blockProps,
                    tagName: 'h2',
                    value: props.attributes.content
                }
            );
        }
    });
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor );