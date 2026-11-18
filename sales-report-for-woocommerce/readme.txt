=== Sales Report for WooCommerce ===
Plugin Name: Sales Report for WooCommerce
Contributors: berocket, dholovnia
Donate link: https://berocket.com/?utm_source=wordpress_org&utm_medium=donate&utm_campaign=sales_report
Tags: woocommerce, sales report, email report, analytics, reporting
Requires at least: 5.0
Tested up to: 7.1.4
Stable tag: 3.8
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Sales Report for WooCommerce generates daily, weekly and monthly sales report

== Description ==

Sales Report for WooCommerce generates daily, weekly and monthly sales report. Plugin will generates E-Mail message with total sales, amount of orders and sold products and sends to selected E-Mail.

= Features: =
&#9989; Sends report to selected E-Mails
&#9989; Can select time to send report
&#9989; Sends weekly report
&#9989; Sends daily and monthly report
&#9989; Multiple interval to send reports
&#9989; Can select data to send
&#9989; Optional compact email layout with editable sales, order count and top product blocks
&#9989; Links from report summaries to WooCommerce Analytics

= Features in Version 3.5: =
&#9989; Different E-Mails for each report
&#9989; Sends report for custom period of time
&#9989; Sends report only on selected day of the week
&#9989; Sales by days for weekly and monthly period
&#9989; Custom subject for each report

= Plugin video =
[youtube https://youtu.be/Eb5v4FoWISU]

= Compatibility with WooCommerce plugins =
Sales Report for WooCommerce has been tested and compatibility is certain with the following WooCommerce plugins that you can add to your site:

&#128312; [**Advanced AJAX Product Filters**](https://wordpress.org/plugins/woocommerce-ajax-filters/)
&#128312; [**Advanced Product Labels for WooCommerce**](https://wordpress.org/plugins/advanced-product-labels-for-woocommerce/)
&#128312; [**Load More Products for WooCommerce**](https://wordpress.org/plugins/load-more-products-for-woocommerce/)
&#128312; [**Currency Exchange for WooCommerce**](https://wordpress.org/plugins/currency-exchange-for-woocommerce/)
&#128312; [**Min and Max Quantity for WooCommerce**](https://wordpress.org/plugins/minmax-quantity-for-woocommerce/)
&#128312; [**Splash Popup for WooCommerce**](https://wordpress.org/plugins/splash-popup-for-woocommerce/)

== Installation ==
Important: First of all, you have to download and activate WooCommerce plugin, because without it Sales Report for WooCommerce cannot work.

1. Unzip the downloaded .zip file.
2. Upload the Sales Report for WooCommerce folder into the `wp-content/plugins/` directory of your WordPress site.
3. Activate `Sales Report for WooCommerce` from Plugins page

= Configuration =
Sales Report for WooCommerce will add a new sub-menu item called "Sales Report" in "WooCommerce" menu. There you will be able to access plugin settings page.

In a Report Variant, use the Email layout panel to insert Compact or Monochrome. Both add an editable header, total sales, order count and the five most popular products after your existing content. Monochrome uses a light, neutral palette. In the block editor, use Email styling to change the look of an existing block. The products block has an editable maximum product count (0 shows all products). In the Classic editor, use `layout=monochrome` in a report shortcode to apply the same preset.

Use Email introduction in the Email layout panel to add an optional short paragraph above the report. The period heading in the email body displays the store's time zone next to the dates.

Report summaries include a View in WooCommerce Analytics button when Analytics is enabled. The link opens the store's native Revenue Analytics and requires the recipient's normal WordPress login and reporting permissions. Full-day report periods are passed as calendar dates; periods with partial days open Analytics without date filters. Existing empty-report sending preferences still apply.


== Frequently Asked Questions ==

= How can I get support if my WooCommerce plugin is not working? =
If you have problems with our plugins or something is not working as it should, first follow this preliminary steps:

* Deactivate all plugins you are using and check if the problem is still occurring.
* Ensure that your plugin version, your theme version and your WordPress and WooCommerce version (if required) are updated and that the problem you are experiencing has not already been solved in a later plugin update.

If none of the previous listed actions helps you solve the problem, then, submit a ticket in the forum and describe your problem accurately, specify WordPress and WooCommerce versions you are using and any other information that might help us solve your problem as quickly as possible. Thanks!

---

== Screenshots ==
1. General settings
2. Weekly report

---

== Changelog ==

= 3.8 =
* Feature - Preview all five Sales Report blocks with sample data directly in the block editor.
* Feature - Added a light Monochrome preset for compact report emails.
* Feature - Add an optional introduction above each report.
* Enhancement - Show the store time zone next to the report dates in the email body.
* Enhancement - Updated BeRocket Framework to 3.1.5 with support for custom settings import and export fields.
* Fix - The framework now skips premium product links when no destination is configured.
* Fix - Prevented a PHP error when WooCommerce add-on sections are unavailable.

= 3.7 =
* Feature - Added a compact sales report email layout.
* Feature - Added links to WooCommerce Analytics from report emails.
* Enhancement - Added or improved settings import/export and backup restoration.
* Enhancement - Updated BeRocket Framework to 3.1.3 with CDN release metadata, reduced updater API traffic, isolated invalid catalog records, improved banner tracking, and an SVG account icon.
* Enhancement - Updated compatibility declarations for WordPress 7.1.3 and WooCommerce 11.2.1.

= 3.6.4 =
* Feature - Insert an editable compact email layout with total sales, order count and the five most popular products.
* Feature - Open WooCommerce Analytics from report summaries, with matching calendar dates for full-day reports.
* Fix - Avoid loading WooCommerce Block assets in the report editor.
* Enhancement - Updated BeRocket framework.
* Security - Hardened framework validation and output handling.

= 3.6.3 =
* Enhancement - Harden locked features validation
* Enhancement - Small speed improvement
* Enhancement - Harden Global settings validation
* Fix - Global settings, some options were not editable
* Fix - PHP warnings in new framework submodule

= 3.6.2.8 =
* Enhancement - Compatibility version: Wordpress 7.0

= 3.6.2.7 =
* Fix - PHP fatal error on plugin update when other BeRocket plugin installed

= 3.6.2.6 =
* Enhancement - Compatibility version: WooCommerce 10.7
* Fix - Plugins notice mark on BeRocket element

= 3.6.2.5 =
* Enhancement - Compatibility version: Wordpress 6.9.4 and WooCommerce 10.6.2
* Fix - PHP warning in admin area

= 3.6.2.4 =
* Enhancement - Compatibility with other BeRocket plugins
* Fix - Updater PHP error

= 3.6.2.3 =
* Enhancement - Compatibility version: Wordpress 6.9.3 and WooCommerce 10.6

= 3.6.2.2 =
* Enhancement - Compatibility version: WooCommerce 10.3
* Fix - New plugin framework

= 3.6.2.1 =
* Enhancement - Compatibility version: Wordpress 6.8 and WooCommerce 10.0

= 3.6.1 =
* Enhancement - Compatibility version: WooCommerce 9.5
* Fix - Change CDN links for elements

= 3.6 =
* Enhancement - Compatibility version: Wordpress 6.7 and WooCommerce 9.4
* Fix - Translation init errors with WordPress 6.7

= 3.5.9 =
* Enhancement - Compatibility version: WooCommerce 9.3
* Enhancement - WooCommerce requirements
* Fix - Plugin update to premium PHP error

= 3.5.8 =
* Enhancement - Compatibility version: Wordpress 6.6 and WooCommerce 9.1
* Fix - New plugin framework

= 3.5.7.8 =
* Enhancement - Compatibility version: Wordpress 6.4 and WooCommerce 8.4
* Enhancement - HPOS Compatibility
* Fix - New plugin framework

= 3.5.7.7 =
* Fix - SECURITY ISSUE! Some admin AJAX functionality can be called with any logged in users.

= 3.5.7.6 =
* Enhancement - Compatibility version: Wordpress 6.1 and WooCommerce 7.1
* Fix - Some plugin links to match new BeRocket Site

= 3.5.7.5 =
* Enhancement - Compatibility version: WooCommerce 7.0
* Enhancement - Remove some PHP 8.1 notices

= 3.5.7.4 =
* Enhancement - Compatibility version: Wordpress 6.0 and WooCommerce 6.7

= 3.5.7.3 =
* Enhancement - Compatibility version: Wordpress 5.9 and WooCommerce 6.1

= 3.5.7.2 =
* Enhancement - Compatibility version: WooCommerce 5.9

= 3.5.7.1 =
* Enhancement - Compatibility version: WooCommerce 5.6
* Fix - Send issue with "Days of week"

= 3.5.7 =
* Enhancement - Compatibility version: Wordpress 5.8 and WooCommerce 5.5

= 3.5.6 =
* Enhancement - Compatibility version: WooCommerce 5.4

= 3.5.5 =
* Enhancement - Compatibility version: WooCommerce 5.3

= 3.5.4 =
* Enhancement - Compatibility version: WooCommerce 5.2.2
* Fix - Days of the week option not displayed

= 3.5.3 =
* Fix - SECURITY ISSUE! Sanitize HTML tags for all settings. Custom JavaScript can be changed only by admin(Super admin for multisite).

= 3.5.2.2 =
* Enhancement - Compatibility version: Wordpress 5.7 and WooCommerce 5.1

= 3.5.2.1 =
* Enhancement - Compatibility version: WooCommerce 5.0

= 3.5.2 =
* Enhancement - Compatibility version: PHP 8, Wordpress 5.6 and WooCommerce 4.9

= 3.5.1.7 =
* Enhancement - Compatibility version: WooCommerce 4.5

= 3.5.1.6 =
* Enhancement - Compatibility version: Wordpress 5.5 and WooCommerce 4.4

= 3.5.1.5 =
* Enhancement - Compatibility version: WooCommerce 4.3
* Fix - Plugin display activation message

= 3.5.1.4 =
* Enhancement - Compatibility version: Wordpress 5.4.1 and WooCommerce 4.1

= 3.5.1.3 =
* Enhancement - Compatibility version: Wordpress 5.4 and WooCommerce 4.0

= 3.5.1.2 =
* Enhancement - Compatibility version: Wordpress 5.3 and WooCommerce 3.8
* Fix - Product Variations in reports

= 3.5.1.1 =
* Fix - Compatibility with Min/Max Quantity plugin

= 3.5.1 =
* Enhancement - Gutenberg Blocks to build your email report
* Enhancement - Possibility to Enable/Disable specific Sale Report

= 3.5.0.2 =
* Fix - Links to BeRocket
* Fix - Compatibility with other BeRocket plugins
* Fix - Wait time sometimes work incorrect

= 3.5.0.1 =
* Fix - Some notices displayed incorrect
* Fix - Compatibility with other plugins

= 3.5 =
* Enhancement - Different E-Mails for each report
* Enhancement - Sends report for custom period of time
* Enhancement - Sends report only on selected day of the week
* Enhancement - Sales by days for weekly and monthly period
* Enhancement - Custom subject for each report

= 1.1.8.1 =
* Enhancement - Compatibility with other BeRocket plugins
* Enhancement - Code Security

= 1.1.8 =
* Enhancement - Update BeRocket plugin framework 2.1
* Fix - Fatal error without WooCommerce
* Fix - Send time

= 1.1.7 =
* Fix - Do not set WordPress Cron
* Fix - Reports on some site create with incorrect post status

= 1.1.6.1 =
* Fix - Font Awesome 5 on some themes
* Fix - Sending emails

= 1.1.6 =
* Fix - Subscribe
* Fix - Feature request send

= 1.1.5 =
* Enhancement - Feature request box
* Enhancement - Feedback box

= 1.1.4 =
* Fix - Support link
* Fix - Restore some information, that was removed in previous version

= 1.1.3 =
* Fix - Updater compatibility

= 1.1.2 =
* Fix - Previous send time was incorrect
* Fix - Periodicity send email every day

= 1.1.1 =
* Upgrade - Columns with informations for custom post type
* Upgrade - Metabox with informations for custom post type

= 1.1.0 =
* Upgrade - Custom send message for reports
* Upgrade - Option to select order status for report
* Upgrade - Custom send time
* Upgrade - Send periodicity
* Upgrade - Option to set start date for sending data
* Upgrade - Option to set end date for sending data
* Upgrade - Multiple reports
* Upgrade - Multiple Emails to send reports
* Upgrade - Custom subject for reports

= 1.0.8 =
* Upgrade - WordPress 4.9 compatibility

= 1.0.7 =
* Upgrade - recent woocommerce version support
* Upgrade - new Admin notices

= 1.0.5 =
* Upgrade - Option to subscribe
* Upgrade - Better advertisement

= 1.0.4 =
* Fix - Better WooCommerce 3 compatibility
* Fix - Premium plugin link on settings page

= 1.0.3 =
* Change styles in admin panel
* Small fixes

= 1.0.2 =
* Better support for PHP5.2

= 1.0.1.2 =
* First public version
