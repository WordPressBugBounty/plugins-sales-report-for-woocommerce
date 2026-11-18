<?php
/** Presentation only: values come from the existing report blocks. */
$monochrome = 'monochrome' === $html_data['layout'];
$text_color = $monochrome ? '#222222' : '#1e293b';
$background_color = $monochrome ? '#fafafa' : '#ffffff';
$border_color = $monochrome ? '#dddddd' : '#e2e8f0';
$label_color = $monochrome ? '#555555' : '#475569';
?>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;max-width:600px;table-layout:fixed;margin:0 auto;font-family:Arial,sans-serif;font-size:16px;line-height:1.5;color:<?php echo esc_attr($text_color); ?>;background-color:<?php echo esc_attr($background_color); ?>;">
    <tr><td style="padding:12px 16px;border-bottom:1px solid <?php echo esc_attr($border_color); ?>;overflow-wrap:anywhere;word-wrap:break-word;word-break:break-word;">
        <?php if (!in_array('hide_header', $html_data['blocks'])) : ?>
            <h2 style="margin:0;font-size:20px;line-height:1.4;"><?php echo esc_html($date_string); ?></h2>
        <?php endif; ?>
        <?php if (in_array('sales', $html_data['blocks'])) : ?>
            <h3 style="margin:0 0 4px;font-size:14px;color:<?php echo esc_attr($label_color); ?>;"><?php esc_html_e('Sales', 'sales-report-for-woocommerce'); ?></h3>
            <div style="font-size:24px;font-weight:bold;line-height:1.4;word-break:break-all;"><?php echo wc_price($total_price); ?></div>
        <?php endif; ?>
        <?php if (in_array('order_count', $html_data['blocks'])) : ?>
            <h3 style="margin:0 0 4px;font-size:14px;color:<?php echo esc_attr($label_color); ?>;"><?php esc_html_e('Order count', 'sales-report-for-woocommerce'); ?></h3>
            <div style="font-size:24px;font-weight:bold;line-height:1.4;"><?php echo esc_html($order_count); ?></div>
            <?php echo isset($html_data['analytics_button']) ? $html_data['analytics_button'] : ''; ?>
        <?php endif; ?>
        <?php if (in_array('products', $html_data['blocks'])) : ?>
            <h3 style="margin:0 0 8px;font-size:16px;"><?php esc_html_e('Products', 'sales-report-for-woocommerce'); ?></h3>
            <?php if (empty($ready_products)) : ?>
                <p style="margin:0;"><?php esc_html_e('No products sold in this period.', 'sales-report-for-woocommerce'); ?></p>
            <?php endif; ?>
            <?php foreach ($ready_products as $product) : ?>
                <p style="margin:0 0 6px;"><?php echo esc_html($product['quantity']); ?> &times; <strong><?php echo esc_html($product['name']); ?><?php echo empty($product['sku']) ? '' : ' ('.esc_html($product['sku']).')'; ?></strong></p>
            <?php endforeach; ?>
        <?php endif; ?>
    </td></tr>
</table>
