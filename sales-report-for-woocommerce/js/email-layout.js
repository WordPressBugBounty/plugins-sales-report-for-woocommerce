(function ($) {
    $(document).on('click', '.brsr-insert-layout', function () {
        var layout = brsrEmailLayout.layouts[this.dataset.layout];
        if (window.wp && wp.data && wp.data.select('core/editor') && wp.data.select('core/editor').getCurrentPostType() === 'br_sale_report') {
            var editor = wp.data.select('core/block-editor');
            wp.data.dispatch('core/block-editor').insertBlocks(wp.blocks.parse(layout.blocks), editor.getBlockCount());
        } else if (window.tinymce && tinymce.get('content') && !tinymce.get('content').isHidden()) {
            tinymce.get('content').focus();
            tinymce.get('content').selection.select(tinymce.get('content').getBody(), true);
            tinymce.get('content').selection.collapse(false);
            tinymce.get('content').insertContent('<p>' + layout.classic.replace(/\n\n/g, '</p><p>') + '</p>');
            tinymce.get('content').save();
        } else {
            var content = document.getElementById('content');
            if (!content) {
                return;
            }
            content.value += '\n\n' + layout.classic;
            $(content).trigger('input').trigger('change');
        }
        $(this).closest('#brsr_email_layout').find('.brsr-layout-inserted').remove();
        $('<p class="brsr-layout-inserted" role="status"></p>').text(brsrEmailLayout.inserted).insertAfter($(this).parent());
    });
})(jQuery);
