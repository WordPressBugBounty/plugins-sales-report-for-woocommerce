(function ($) {
    $(document).on('click', '.brsr-insert-compact', function () {
        if (window.wp && wp.data && wp.data.select('core/editor') && wp.data.select('core/editor').getCurrentPostType() === 'br_sale_report') {
            var editor = wp.data.select('core/block-editor');
            wp.data.dispatch('core/block-editor').insertBlocks(wp.blocks.parse(brsrEmailLayout.blocks), editor.getBlockCount());
        } else if (window.tinymce && tinymce.get('content') && !tinymce.get('content').isHidden()) {
            tinymce.get('content').focus();
            tinymce.get('content').selection.select(tinymce.get('content').getBody(), true);
            tinymce.get('content').selection.collapse(false);
            tinymce.get('content').insertContent('<p>' + brsrEmailLayout.classic.replace(/\n\n/g, '</p><p>') + '</p>');
            tinymce.get('content').save();
        } else {
            var content = document.getElementById('content');
            if (!content) {
                return;
            }
            content.value += '\n\n' + brsrEmailLayout.classic;
            $(content).trigger('input').trigger('change');
        }
        $(this).siblings('.brsr-layout-inserted').remove();
        $('<p class="brsr-layout-inserted" role="status"></p>').text(brsrEmailLayout.inserted).insertAfter(this);
    });
})(jQuery);
