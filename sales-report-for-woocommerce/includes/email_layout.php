<?php
/** Editable, opt-in email layout shared by all editions. */
class BeRocket_sales_report_email_layout {
    public static function init() {
        add_action('add_meta_boxes_br_sale_report', array(__CLASS__, 'add_meta_box'));
    }

    public static function add_meta_box() {
        add_meta_box('brsr_email_layout', __('Email layout', 'sales-report-for-woocommerce'), array(__CLASS__, 'meta_box'), 'br_sale_report', 'side');
    }

    public static function meta_box() {
        echo '<p>'.esc_html__('Add a compact summary and the five most popular products. Each report block remains editable. The layout is added after your current content.', 'sales-report-for-woocommerce').'</p>';
        echo '<button type="button" class="button brsr-insert-compact">'.esc_html__('Insert compact layout', 'sales-report-for-woocommerce').'</button>';
    }

    public static function content($blocks = false) {
        $parts = array(
            'header' => 'header',
            'sales' => 'sales',
            'order-count' => 'order_count',
            'products-list' => 'products',
        );
        $content = array();
        foreach ($parts as $block => $part) {
            $attributes = array('layout' => 'compact');
            $shortcode = '[br_sales_report_part content='.$part.' layout=compact';
            if ('products' === $part) {
                $attributes['sort'] = 'qty_desc';
                $attributes['productLimit'] = 5;
                $shortcode .= ' limit=5 sort=qty_desc';
            }
            $shortcode .= ']';
            $content[] = $blocks ? '<!-- wp:berocket/sales-report-'.$block.'-gutenberg '.wp_json_encode($attributes).' -->'.$shortcode.'<!-- /wp:berocket/sales-report-'.$block.'-gutenberg -->' : $shortcode;
        }
        return implode("\n\n", $content);
    }

    /** Analytics accepts calendar dates, not the report's arbitrary send times. */
    public static function analytics_url($report) {
        $features = 'Automattic\\WooCommerce\\Admin\\Features\\Features';
        if (!class_exists($features) || !$features::is_enabled('analytics')) {
            return '';
        }
        $args = array('page' => 'wc-admin', 'path' => '/analytics/revenue');
        $dates = isset($report['date_data_array']) ? $report['date_data_array'] : array();
        if (isset($dates['start_datetime'], $dates['end_datetime'])
            && $dates['start_datetime'] instanceof DateTimeInterface && $dates['end_datetime'] instanceof DateTimeInterface) {
            $start = $dates['start_datetime'];
            $end = clone $dates['end_datetime'];
            if ('00:00:00' === $start->format('H:i:s') && in_array($end->format('H:i:s'), array('00:00:00', '23:59:59'), true) && $end > $start) {
                if ('00:00:00' === $end->format('H:i:s')) {
                    $end = $end->modify('-1 second');
                }
                $args['period'] = 'custom';
                $args['compare'] = 'previous_period';
                $args['after'] = $start->format('Y-m-d');
                $args['before'] = $end->format('Y-m-d');
            }
        }
        return add_query_arg($args, admin_url('admin.php'));
    }

    public static function analytics_button($report) {
        $url = self::analytics_url($report);
        if (!$url) {
            return '';
        }
        return '<p style="margin:16px 0;overflow-wrap:anywhere;word-wrap:break-word;"><a href="'.esc_url($url).'" style="display:inline-block;max-width:100%;box-sizing:border-box;padding:12px 16px;background-color:#3858e9;border-radius:4px;color:#ffffff;font-family:Arial,sans-serif;font-size:14px;line-height:20px;text-decoration:none;white-space:normal;">'.esc_html__('View in WooCommerce Analytics', 'sales-report-for-woocommerce').'</a></p>';
    }
}
BeRocket_sales_report_email_layout::init();
