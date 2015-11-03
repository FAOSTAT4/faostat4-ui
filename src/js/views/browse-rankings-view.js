/*global define, _:false, $, console, amplify, FM*/
define([
    'views/base/view',
    'config/FAOSTAT',
    'config/Config',
    'config/Queries',
    'config/Events',
    'text!templates/browse/browse_rankings.hbs',
    'i18n!nls/browse_rankings',
    'handlebars',
    'globals/Common',
    'FAOSTAT_UI_TREE',
    'amplify'
], function (View, F, C, Q, E, template, i18nLabels, Handlebars, Common, Tree) {

    'use strict';

    var s = {

            TREE: "tree"
        },
        
        o = {

        };

    var BrowseRankingsView = View.extend({

        autoRender: true,

        className: 'browse',

        template: template,

        initialize: function (options) {
            this.o = $.extend(true, {}, o, options);
        },

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State. needed?
            amplify.publish(E.STATE_CHANGE, {browse: 'browse'});

            this.initVariables();

            this.initComponents();

            this.bindEventListeners();

            this.configurePage();
        },

        initVariables: function () {

            // TODO: handle change state
            this.changeState();

        },

        initComponents: function () {

        },

        configurePage: function () {

        },

        bindEventListeners: function () {

        },

        unbindEventListeners: function () {

        },

        changeState: function() {
            console.log(":here");
            console.warn("TODO: read internal state anche change URL state");
            // TODO: handle the country selection
            Common.changeURL(this.o.section, [], false);
        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        }
    });

    return BrowseRankingsView;
});
