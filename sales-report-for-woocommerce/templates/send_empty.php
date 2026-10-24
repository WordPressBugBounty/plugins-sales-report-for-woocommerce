<?php
_e('Unfortunately this period of time doesn\'t have WooCommerce orders', 'sales-report-for-woocommerce');
global $br_current_notice_post;
if (!empty($br_current_notice_post)) {
    echo BeRocket_sales_report_email_layout::analytics_button($br_current_notice_post);
}
?>
