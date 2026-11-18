<?php
/** Editable, opt-in email layout shared by all editions. */
class BeRocket_sales_report_email_layout {
    public static function init() {
        add_action('add_meta_boxes_br_sale_report', array(__CLASS__, 'add_meta_box'));
    }

    public static function add_meta_box() {
        add_meta_box('brsr_email_layout', __('Email layout', 'sales-report-for-woocommerce'), array(__CLASS__, 'meta_box'), 'br_sale_report', 'side');
    }

    public static function meta_box($post) {
        $options = BeRocket_sales_report_custom_post::getInstance()->get_option($post->ID);
        $intro = sanitize_text_field($options['email_intro']);
        echo '<p><label for="brsr-email-intro">'.esc_html__('Email introduction', 'sales-report-for-woocommerce').'</label>';
        echo '<input type="text" class="widefat" id="brsr-email-intro" name="br_sale_report[email_intro]" value="'.esc_attr($intro).'" aria-describedby="brsr-email-intro-help">';
        echo '<span id="brsr-email-intro-help" class="description">'.esc_html__('Optional. Add a short paragraph above the report.', 'sales-report-for-woocommerce').'</span></p>';
        echo '<p>'.esc_html__('Add a compact summary and the five most popular products. Each report block remains editable. The layout is added after your current content.', 'sales-report-for-woocommerce').'</p>';
        echo '<p><button type="button" class="button brsr-insert-layout" data-layout="compact">'.esc_html__('Insert compact layout', 'sales-report-for-woocommerce').'</button></p>';
        echo '<p><button type="button" class="button brsr-insert-layout" data-layout="monochrome">'.esc_html__('Insert Monochrome layout', 'sales-report-for-woocommerce').'</button></p>';
    }

    public static function is_compact($layout) {
        return in_array($layout, array('compact', 'monochrome'), true);
    }

    public static function period_heading($date_string, $timezone) {
        if ('+' === $timezone[0] || '-' === $timezone[0]) {
            $timezone = 'UTC'.$timezone;
        }
        return $date_string.' ('.$timezone.')';
    }

    public static function editor_previews($timezone) {
        $week_days = array(
            array('string' => '12', 'total_price' => 195),
            array('string' => '13', 'total_price' => 284.50),
            array('string' => '14', 'total_price' => 221.40),
            array('string' => '15', 'total_price' => 412),
            array('string' => '16', 'total_price' => 355.60),
        );
        $daily_totals = array_column($week_days, 'total_price');
        $max_price = max($daily_totals);
        $total_price = array_sum($daily_totals);
        $order_count = 24;
        $ready_products = array(
            array('name' => __('Travel Mug', 'sales-report-for-woocommerce'), 'quantity' => 12),
            array('name' => __('Canvas Tote', 'sales-report-for-woocommerce'), 'quantity' => 8),
            array('name' => __('Desk Lamp', 'sales-report-for-woocommerce'), 'quantity' => 3),
            array('name' => __('Notebook', 'sales-report-for-woocommerce'), 'quantity' => 10),
            array('name' => __('Water Bottle', 'sales-report-for-woocommerce'), 'quantity' => 5),
            array('name' => __('Coffee Grinder', 'sales-report-for-woocommerce'), 'quantity' => 2),
        );
        $date_string = self::period_heading(
            sprintf(esc_html__('Your reports for WooCommerce ( From: %1$s To: %2$s )', 'sales-report-for-woocommerce'), '2026-10-12', '2026-10-17'),
            esc_html($timezone)
        );

        $parts = array(
            'header' => array('show_header'),
            'sales' => array('hide_header', 'sales'),
            'order_count' => array('hide_header', 'order_count'),
            'products' => array('hide_header', 'products'),
        );
        $previews = array();
        foreach (array('', 'compact', 'monochrome') as $layout) {
            $analytics_button = str_replace('<a href=', '<a tabindex="-1" href=', self::analytics_button(array(), $layout));
            foreach ($parts as $part => $blocks) {
                $html_data = array('blocks' => $blocks, 'layout' => $layout, 'analytics_button' => $analytics_button);
                ob_start();
                include sales_report_TEMPLATE_PATH.'email.php';
                $previews[$part][$layout] = ob_get_clean();
            }
        }

        ob_start();
        include sales_report_TEMPLATE_PATH.'week_day.php';
        $previews['days'] = ob_get_clean();

        return array('html' => $previews, 'products' => $ready_products);
    }

    public static function content($blocks = false, $layout = 'compact') {
        $parts = array(
            'header' => 'header',
            'sales' => 'sales',
            'order-count' => 'order_count',
            'products-list' => 'products',
        );
        $content = array();
        foreach ($parts as $block => $part) {
            $attributes = array('layout' => $layout);
            $shortcode = '[br_sales_report_part content='.$part.' layout='.$layout;
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

    public static function analytics_button($report, $layout = '') {
        $url = self::analytics_url($report);
        if (!$url) {
            return '';
        }
        $background = 'monochrome' === $layout ? '#333333' : '#3858e9';
        return '<p style="margin:16px 0;overflow-wrap:anywhere;word-wrap:break-word;"><a href="'.esc_url($url).'" style="display:inline-block;max-width:100%;box-sizing:border-box;padding:12px 16px;background-color:'.$background.';border-radius:4px;color:#ffffff;font-family:Arial,sans-serif;font-size:14px;line-height:20px;text-decoration:none;white-space:normal;">'.esc_html__('View in WooCommerce Analytics', 'sales-report-for-woocommerce').'</a></p>';
    }
}
BeRocket_sales_report_email_layout::init();
