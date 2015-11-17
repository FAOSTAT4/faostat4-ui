/*global define, _:false, $, console, amplify, FM*/
define([
    'globals/Common',
    'config/Config',
    'config/Events',
    'i18n!nls/filter',
    'handlebars',
    'faostatapiclient',
    'underscore',
    'lib/filters/filter',
    'q',
    'amplify',
], function (Common, C, E, i18nLabels, Handlebars, FAOSTATAPIClient, _, Filter, Q) {

    'use strict';

    var s = {

        //FILTERS: '[data-role="filter-box"]'

    };

    var defaultOptions = {
        requestKey: 0
    };

    'use strict';

    function FilterBox() {
        return this;
    };

    FilterBox.prototype.render = function (options) {

        this.o = $.extend(true, {}, defaultOptions, options);

        this.o.lang = Common.getLocale();

        this.initVariables();

        this.configurePage();

    };


    FilterBox.prototype.initVariables = function () {

        this.FAOSTATAPIClient = new FAOSTATAPIClient();

        // TODO: have a template?
        this.$CONTAINER = $(this.o.container);

    };

    FilterBox.prototype.configurePage = function() {

        var self = this;
        this.o.filters = [];

        amplify.publish(E.LOADING_SHOW, {container: this.$CONTAINER});

        this._preloadCodelists().then(function(f) {

            _.each(f, function (c, index) {

                amplify.publish(E.LOADING_HIDE, {container: self.$CONTAINER});

                var id = 'filter_box_' + index;

                // TODO: dirty append for the filters
                self.$CONTAINER.append('<div id="' + id + '"></div>');

                // render filter
                var filter = new Filter();

                c.container = self.$CONTAINER.find('#' + id);

                filter.init(c);

                self.o.filters.push(filter)

            });

        }).done(function() {

            amplify.publish(E.VIEW_FILTER_BOX_LOADED, {});

        });

    };

    FilterBox.prototype._preloadCodelists = function () {

        var r = [],
            filters = this.o.filter,
            self = this;

        _.each(filters, function(filter) {

            var type = filter.type;

            switch(type) {
                case 'codelist':
                    r.push(self._preloadCodes(filter));
                    break;
                default:
                    r.push(self._preloadStaticCodes(filter));
                    break;
            }

        });

        return Q.all(r);
    };

    FilterBox.prototype._preloadCodes = function (filter) {

        var id = filter.config.dimension_id,
            defaultCodes = filter.config.defaultCodes || {};

        var request = $.extend({}, true, {
            datasource: C.DATASOURCE,
            lang: this.o.lang,
            subcodelists: null,
            show_lists: null,
            show_full_metadata: null,
            ord: null,
            id: id
        }, filter.config.filter);

        return this.FAOSTATAPIClient.codes(request).then(function(c) {

            // TODO: use directly metadata/data returned by APIs?
            var codes = [];

            // process codes/defaults
            _.each(c.data, function(d) {
                codes.push($.extend({}, d, {selected: defaultCodes.indexOf(d.code) > -1 }));
            });
            filter.config.data = codes;
            return filter;

        });

    };

    FilterBox.prototype._preloadStaticCodes = function (config) {

        // TODO: add boolean "translatable"? in the json definition?
        _.each(config.config.data, function(d) {

            // change labels if needed with i18nlabels.
            d.label = i18nLabels[d.label] || d.label;

        });

        return config;
    };

    FilterBox.prototype.getFilters = function (config) {

        var f = [];
        _.each(Object.keys(this.o.filters), _.bind(function (filterKey) {
            f.push(this.o.filters[filterKey].getFilter());
        }, this));

        return f;
    };


    FilterBox.prototype.destroy = function () {

        // destroy all filters
        if (this.$CONTAINER) {
            this.$CONTAINER.empty();
        }

        console.error("Handle destroy");

    };

    return FilterBox;
});
