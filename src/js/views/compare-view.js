/*global define, _:false, $, console, amplify, FM*/
define([
    'jquery',
    'views/base/view',
    'globals/Common',
    'config/FAOSTAT',
    'config/Config',
    'config/Queries',
    'config/Events',
    'config/EventsCompare',
    'config/compare/Config',
    'text!templates/compare/compare.hbs',
    'i18n!nls/compare',
    'handlebars',
    'faostatapiclient',
    'views/compare-filter-box-view',
    'jquery.rangeSlider',
    'amplify'
], function ($, View, Common, F, C, Q, E, EC, CC, template, i18nLabels, Handlebars, FAOSTATAPIClient, FilterBoxView) {

    'use strict';

    var s = {

        FILTERS_CONTAINER: '[data-role="filters_container"]',
        ADD_FILTER: '[data-role="add_filter"]',
        TIMERANGE: '[data-role="timerange"]',
        COMPARE_DATA: '[data-role="compare_data"]',

    };

    var filterBoxIDs = 0;

    var filterBox = {};

    var CompareView = View.extend({

        autoRender: true,

        className: 'compare',

        template: template,

        // TODO: remove
        events: {
            'click': function(a) {
            }
        },

        initialize: function (options) {
            this.o = options;
        },

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {compare: 'compare'});
            amplify.subscribe(EC.FILTER_BOX_REMOVE, _.bind(this.onFilterBoxRemove, this));

            this.initVariables();

            this.initComponents();

            this.bindEventListeners();

            this.configurePage();
        },

        initVariables: function () {

            this.o.lang = Common.getLocale();

            this.FAOSTATAPIClient = new FAOSTATAPIClient();

            this.$FILTERS_CONTAINER = this.$el.find(s.FILTERS_CONTAINER);
            this.$ADD_FILTER = this.$el.find(s.ADD_FILTER);
            this.$TIMERANGE = this.$el.find(s.TIMERANGE);
            this.$COMPARE_DATA = this.$el.find(s.COMPARE_DATA);

            //console.log(this.$filters);

        },

        initComponents: function () {

            // add initial filter
            var filter = this.addFilter();

            // init timerange
            this.$TIMERANGE.rangeSlider(CC.timerange.options);

        },

        configurePage: function () {

        },

        // filters
        addFilter: function() {
            // TODO: keep track of the filters
            var f = new FilterBoxView({
                filterBoxID: ++filterBoxIDs
            });

            this.$FILTERS_CONTAINER.prepend(f.$el);
            // cache the filterBox
            filterBox[f.o.filterBoxID] = f;
            return f;
        },

        onFilterBoxRemove: function(box) {
            console.warn('TODO: internal filter remove');
            //this.removeFilter(filterBox);
            this.removeFilterBox(box);
        },

        removeFilterBox: function(box) {
            if ( Object.keys(filterBox).length > 1 ) {
                delete filterBox[box.filter.o.filterBoxID];
                box.filter.$el.empty();
                console.log(filterBox);
            }
        },

        getFiltersFromBoxes: function() {

          // get the filters from each box to create the chart and the table

        },

        compareData: function() {
            console.log("Compare Data");

            // get years TODO: get all the years in the timerange?
            var timerange = this.$TIMERANGE.rangeSlider("values"),
                minYear = timerange.min,
                maxYear = timerange.max;


            // get for each filterBox the relative filters (domain, items etc...)
            var filters = this._getFiltersSelections();


            // check the estimated series dimensions

            // retrieve with getData the data for the single box

            // create chart

            // create table


            // Waiting
            amplify.publish(E.WAITING_SHOW, {});

            setTimeout(function(){
                console.log("aiuhidauhidasuh");
                amplify.publish(E.WAITING_HIDE, {})
            }, 1000);

        },

        _getFiltersSelections: function() {
            var filters = [];
            _.each(Object.keys(filterBox), _.bind(function(filterID) {
                console.log(filterID);
                var filter = filterBox[filterID];
                filters.push(filter.getFilters());
            }, this));
            console.log(filters);
            return filters;
        },


        bindEventListeners: function () {

            this.$ADD_FILTER.on('click', _.bind(this.addFilter, this));
            this.$COMPARE_DATA.on('click', _.bind(this.compareData, this));

        },

        unbindEventListeners: function () {


        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        }
    });

    return CompareView;
});
