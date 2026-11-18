( function() {
    var attributesDefault = {
        layout: { type: 'string', default: '' },
        orderFrom: {
            type: 'string',
            default: '',
        },
        orderTill: {
            type: 'string',
            default: '',
        },
        startDayOffset: {
            type: 'string',
            default: '0',
        },
        startTimeHours: {
            type: 'string',
            default: '0',
        },
        startTimeHours: {
            type: 'string',
            default: '0',
        },
        startTimeMinutes: {
            type: 'string',
            default: '0',
        },
        endDayOffset: {
            type: 'string',
            default: '0',
        },
        endTimeHours: {
            type: 'string',
            default: '0',
        },
        endTimeMinutes: {
            type: 'string',
            default: '0',
        },
    };
    var __                = wp.i18n.__;
    var registerBlockType = wp.blocks.registerBlockType;
    var createElement     = wp.element.createElement;
    var InspectorControls = wp.editor.InspectorControls;

    function getProductPreview(html, attributes) {
        if (!attributes.sort && !attributes.productLimit) {
            return html;
        }

        const template = document.createElement('template');
        template.innerHTML = html;
        const rows = Array.from(template.content.querySelectorAll('p'));
        const products = brsrBlockPreviews.products.map((product, index) => ({
            name: product.name,
            quantity: product.quantity,
            row: rows[index],
        }));
        if (attributes.sort) {
            const [field, direction] = attributes.sort.split('_');
            products.sort((first, second) => {
                const difference = field === 'name'
                    ? first.name.localeCompare(second.name)
                    : first.quantity - second.quantity;
                return direction === 'desc' ? -difference : difference;
            });
        }
        const container = rows[0].parentNode;
        rows.forEach(row => row.remove());
        products.slice(0, attributes.productLimit || products.length).forEach(product => {
            container.appendChild(product.row);
        });
        return template.innerHTML;
    }

    function renderPreview(part, attributes, title) {
        if (typeof brsrBlockPreviews === 'undefined') {
            return title;
        }
        const previews = brsrBlockPreviews.html[part];
        const layout = attributes.layout || '';
        let html = part === 'days' ? previews : previews[layout] || previews[''];
        if (part === 'products') {
            html = getProductPreview(html, attributes);
        }
        return createElement('div', { className: 'brsr-block-preview' },
            createElement('span', { className: 'brsr-block-preview__label' }, __('Demo data', 'sales-report-for-woocommerce')),
            createElement('div', {
                className: 'brsr-block-preview__email',
                dangerouslySetInnerHTML: { __html: html },
                onClick: event => {
                    if (event.target.closest('a')) {
                        event.preventDefault();
                    }
                },
            })
        );
    }

    function berocket_sales_report_check_int(value, negative) {
        if( value == '' ) {
            return value;
        }
        if( value != '-' || ! negative) {
            value = parseInt(value);
            if( isNaN(value) ) {
                value = 0;
            }
        }
        if( ! negative && value < 0 ) {
            value = 0;
        }
        return value;
    }
    function berocket_sales_report_get_global_controls(attributes, setAttributes) {
        const {
            orderFrom,
            startDayOffset,
            startTimeHours,
            startTimeMinutes,
            orderTill,
            endDayOffset,
            endTimeHours,
            endTimeMinutes,
        } = attributes;
        return [
            createElement(InspectorControls, {}, createElement(wp.components.SelectControl, {
                label: __('Email styling', 'sales-report-for-woocommerce'),
                value: attributes.layout,
                options: [
                    {label: __('Default', 'sales-report-for-woocommerce'), value: ''},
                    {label: __('Compact', 'sales-report-for-woocommerce'), value: 'compact'},
                    {label: __('Monochrome', 'sales-report-for-woocommerce'), value: 'monochrome'},
                ],
                onChange: function (value) { setAttributes({ layout: value }); }
            })),
            createElement(
                InspectorControls,
                {},
                createElement(
                    wp.components.SelectControl,
                    {
                        label: __('Get orders from'),
                        value: orderFrom,
                        onChange: function (newOrderFrom) {setAttributes( { orderFrom: newOrderFrom } );},
                        options: [
                            {label:'From settings(other time settings will not work)', value:''},
                            {label:'Previous send day', value:'prev_send_time'},
                            {label:'Send day', value:'send_time'},
                            {label:'First day of the month', value:'month'},
                            {label:'First day of the previous month', value:'prev_month'},
                            {label:'First day of the week', value:'week'},
                            {label:'First day of the previous week', value:'prev_week'},
                            {label:'First day of the year', value:'year'},
                        ]
                    }
                ),
            ),
            createElement(
                InspectorControls,
                {},
                createElement(
                    wp.components.TextControl,
                    {
                        label: __('Start Day Offset'),
                        value: startDayOffset,
                        onChange: function (newValue) {setAttributes( { startDayOffset: berocket_sales_report_check_int(newValue, true)+'' } );},
                    }
                ),
            ),
            createElement(
                InspectorControls,
                {},
                createElement(
                    wp.components.TextControl,
                    {
                        label: __('Start Time Hour(s)'),
                        value: startTimeHours,
                        onChange: function (newValue) {setAttributes( { startTimeHours: berocket_sales_report_check_int(newValue, false)+'' } );},
                    }
                ),
            ),
            createElement(
                InspectorControls,
                {},
                createElement(
                    wp.components.TextControl,
                    {
                        label: __('Start Time Minute(s)'),
                        value: startTimeMinutes,
                        onChange: function (newValue) {setAttributes( { startTimeMinutes: berocket_sales_report_check_int(newValue, false)+'' } );},
                    }
                ),
            ),
            createElement(
                InspectorControls,
                {},
                createElement(
                    wp.components.SelectControl,
                    {
                        label: __('Get Orders Till'),
                        value: orderTill,
                        onChange: function (newValue) {setAttributes( { orderTill: newValue } );},
                        options: [
                            {label:'From settings(other time settings will not work)', value:''},
                            {label:'Previous send day', value:'prev_send_time'},
                            {label:'Send day', value:'send_time'},
                            {label:'First day of the month', value:'month'},
                            {label:'First day of the previous month', value:'prev_month'},
                            {label:'First day of the week', value:'week'},
                            {label:'First day of the previous week', value:'prev_week'},
                            {label:'First day of the year', value:'year'},
                        ]
                    }
                ),
            ),
            createElement(
                InspectorControls,
                {},
                createElement(
                    wp.components.TextControl,
                    {
                        label: __('End Day Offset'),
                        value: endDayOffset,
                        onChange: function (newValue) {setAttributes( { endDayOffset: berocket_sales_report_check_int(newValue, true)+'' } );},
                    }
                ),
            ),
            createElement(
                InspectorControls,
                {},
                createElement(
                    wp.components.TextControl,
                    {
                        label: __('End Time Hour(s)'),
                        value: endTimeHours,
                        onChange: function (newValue) {setAttributes( { endTimeHours: berocket_sales_report_check_int(newValue, false)+'' } );},
                    }
                ),
            ),
            createElement(
                InspectorControls,
                {},
                createElement(
                    wp.components.TextControl,
                    {
                        label: __('End Time Minute(s)'),
                        value: endTimeMinutes,
                        onChange: function (newValue) {setAttributes( { endTimeMinutes: berocket_sales_report_check_int(newValue, false)+'' } );},
                    }
                ),
            ),
        ];
    }
    function berocket_sales_report_generate_shortcode_attributes(attributes) {
        const {
            orderFrom,
            startDayOffset,
            startTimeHours,
            startTimeMinutes,
            orderTill,
            endDayOffset,
            endTimeHours,
            endTimeMinutes,
        } = attributes;
        var attr = '';
        if (attributes.layout === 'compact' || attributes.layout === 'monochrome') {
            attr += ' layout=' + attributes.layout;
        }
        if (attributes.productLimit > 0) {
            attr += ' limit=' + parseInt(attributes.productLimit, 10);
        }
        if( orderFrom && orderTill ) {
            attr += ' start_date_type='+orderFrom+'';
            attr += ' start_day_offset='+startDayOffset+'';
            attr += ' start_time_hours='+startTimeHours+'';
            attr += ' start_time_minutes='+startTimeMinutes+'';
            attr += ' end_date_type='+orderTill+'';
            attr += ' end_day_offset='+endDayOffset+'';
            attr += ' end_time_hours='+endTimeHours+'';
            attr += ' end_time_minutes='+endTimeMinutes+'';
        }
        return attr;
    }
    function berocket_sales_report_gutenberg_save_function({attributes}) {
        var shortcode_attr = berocket_sales_report_generate_shortcode_attributes(attributes);
        var content = '[br_sales_report_part content=header '+shortcode_attr+']';
        return content;
    }
    
    var categories = wp.blocks.getCategories();
    categories.push({icon:null, slug:'berocket', title: __( 'BeRocket', 'sales-report-for-woocommerce' )});;
    wp.blocks.setCategories(categories);
    
    registerBlockType(
        'berocket/sales-report-header-gutenberg',
        {
            title: __( 'BeRocket Sales Report: Header', 'sales-report-for-woocommerce' ),
            icon: 'editor-textcolor',
            category: 'berocket',
            attributes: attributesDefault,
            edit: function( {attributes, setAttributes, focus, className} ) {
                const controls = berocket_sales_report_get_global_controls(attributes, setAttributes);
                return [controls,
                    renderPreview('header', attributes, __('BeRocket Sales Report: Header', 'sales-report-for-woocommerce')),
                ];
            },
            save: function( {attributes} ) {
                const sort = attributes.sort;
                var shortcode_attr = berocket_sales_report_generate_shortcode_attributes(attributes);
                var content = '[br_sales_report_part content=header'+shortcode_attr+']';
                return content;
            },
        }
    );
    
    registerBlockType(
        'berocket/sales-report-sales-gutenberg',
        {
            title: __( 'BeRocket Sales Report: Total Sales', 'sales-report-for-woocommerce' ),
            icon: 'editor-textcolor',
            category: 'berocket',
            attributes: attributesDefault,
            edit: function( {attributes, setAttributes, focus, className} ) {
                const controls = berocket_sales_report_get_global_controls(attributes, setAttributes);
                return [controls,
                    renderPreview('sales', attributes, __('BeRocket Sales Report: Total Sales', 'sales-report-for-woocommerce')),
                ];
            },
            save: function( {attributes} ) {
                const sort = attributes.sort;
                var shortcode_attr = berocket_sales_report_generate_shortcode_attributes(attributes);
                var content = '[br_sales_report_part content=sales'+shortcode_attr+']';
                return content;
            },
        }
    );
    
    registerBlockType(
        'berocket/sales-report-order-count-gutenberg',
        {
            title: __( 'BeRocket Sales Report: Order Count', 'sales-report-for-woocommerce' ),
            icon: 'editor-textcolor',
            category: 'berocket',
            attributes: attributesDefault,
            edit: function( {attributes, setAttributes, focus, className} ) {
                const controls = berocket_sales_report_get_global_controls(attributes, setAttributes);
                return [controls,
                    renderPreview('order_count', attributes, __('BeRocket Sales Report: Order Count', 'sales-report-for-woocommerce')),
                ];
            },
            save: function( {attributes} ) {
                const sort = attributes.sort;
                var shortcode_attr = berocket_sales_report_generate_shortcode_attributes(attributes);
                var content = '[br_sales_report_part content=order_count'+shortcode_attr+']';
                return content;
            },
        }
    );
    registerBlockType(
        'berocket/sales-report-days-gutenberg',
        {
            title: __( 'BeRocket Sales Report: Table by Days', 'sales-report-for-woocommerce' ),
            icon: 'chart-bar',
            category: 'berocket',
            attributes: attributesDefault,
            edit: function( {attributes, setAttributes, focus, className} ) {
                const controls = berocket_sales_report_get_global_controls(attributes, setAttributes);
                return [controls,
                    renderPreview('days', attributes, __('BeRocket Sales Report: Table by Days', 'sales-report-for-woocommerce')),
                ];
            },
            save: function( {attributes} ) {
                const sort = attributes.sort;
                var shortcode_attr = berocket_sales_report_generate_shortcode_attributes(attributes);
                var content = '[br_sales_report_part content=days'+shortcode_attr+']';
                return content;
            },
        }
    );
    
    //BeRocket Sales Report: Products List
    attributesDefaultProducts = attributesDefault;
    attributesDefaultProducts.sort = {
        type: 'string',
        default: '',
    };
    attributesDefaultProducts.productLimit = { type: 'number', default: 0 };
    registerBlockType(
        'berocket/sales-report-products-list-gutenberg',
        {
            title: __( 'BeRocket Sales Report: Products List', 'sales-report-for-woocommerce' ),
            icon: 'list-view',
            category: 'berocket',
            attributes: attributesDefaultProducts,
            edit: function( {attributes, setAttributes, focus, className} ) {
                const sort = attributes.sort;
                const controls = berocket_sales_report_get_global_controls(attributes, setAttributes);
                controls.push(
                    createElement(InspectorControls, {}, createElement(wp.components.TextControl, {
                        label: __('Maximum products (0 for all)', 'sales-report-for-woocommerce'),
                        type: 'number',
                        min: 0,
                        value: attributes.productLimit,
                        onChange: function (value) { setAttributes({ productLimit: Math.max(0, parseInt(value, 10) || 0) }); }
                    })),
                    createElement(
                        InspectorControls,
                        {},
                        createElement(
                            wp.components.SelectControl,
                            {
                                label: __('Sort', 'sales-report-for-woocommerce'),
                                value: sort,
                                onChange: function (newValue) {setAttributes( { sort: newValue } );},
                                options: [
                                    {label: 'Default products sort', value: ''},
                                    {label: 'Product name ascending', value: 'name_asc'},
                                    {label: 'Product name descending', value: 'name_desc'},
                                    {label: 'Buyed quantity ascending', value: 'qty_asc'},
                                    {label: 'Buyed quantity descending', value: 'qty_desc'},
                                ]
                            }
                        ),
                    )
                );
                return [controls,
                    renderPreview('products', attributes, __('BeRocket Sales Report: Products List', 'sales-report-for-woocommerce')),
                ];
            },
            save: function( {attributes} ) {
                const sort = attributes.sort;
                var shortcode_attr = berocket_sales_report_generate_shortcode_attributes(attributes);
                if( sort != '' ) {
                    shortcode_attr += ' sort='+sort;
                }
                var content = '[br_sales_report_part content=products'+shortcode_attr+']';
                return content;
            },
        }
    );
})();
