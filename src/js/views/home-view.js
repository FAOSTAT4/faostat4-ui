/*global define, _:false, $, console, amplify, FM*/
define([
    'jquery',
    'loglevel',
    'views/base/view',
    'globals/Common',
    'config/Routes',
    'config/Config',
    'config/Events',
    'config/home/Config',
    'text!templates/home/home.hbs',
    'text!templates/home/news.hbs',
    'text!templates/home/domains.hbs',
    'text!templates/home/database_updates.hbs',
    'i18n!nls/home',
    'handlebars',
    'faostatapiclient',
    'fx-c-c/start',
    'config/browse_by_domain/Config',
    'config/home/sample/chartModel',
    'config/home/sample/whatsNew',
    'config/home/sample/comingUp',
    'config/home/sample/databaseUpdates',
    'moment',
    'amplify'
], function ($, log, View, Common, ROUTE, C, E, CM,
             template,
             templateNews,
             templateDomains,
             templateDatabaseUpdates,
             i18nLabels, Handlebars, API, ChartCreator,
             BrowseByDomainConfig,
             ChartModel,
             WhatsNew,
             ComingUp,
             DatabaseUpdates,
             moment
) {

    'use strict';

    var s = {

        DOMAINS: "#fs_home_domains",
        GO_TO_BROWSE: '[data-role="go_to_browse"]',
        GO_TO_DOWNLOAD: '[data-role="go_to_download"]',

        CHART: "#fs_home_chart",
        WHATS_NEW: "#fs_home_whats_new",
        COMING_UP: "#fs_home_coming_up",
        INFO: "#fs_home_info", // i.e. FAO Statistical pocketbook
        FAO_LINKS: "#fs_home_fao_links",
        DATABASE_UPDATES: "#fs_home_database_updates",
        RELEASE_CALENDAR: "#fs_home_release_calendar",
        PARTNERS: "#fs_home_partners",
        COUNTRY_PROFILES: "#fs_home_country_profiles",
        TWITTER: "#fs_home_twitter"

    },
        HomeView = View.extend({

        autoRender: true,

        className: 'home',

        template: template,

        getTemplateData: function () {

            // ADD links
            // TODO: helper?
            var d = $.extend(true, {}, i18nLabels, {
                URL_FAOSTAT_DATABASE_ZIP: C.URL_FAOSTAT_DATABASE_ZIP,
                URL_COUNTRY_PROFILES: C.URL_COUNTRY_PROFILES,
                URL_BROWSE_BY_COUNTRY: Common.getURI(ROUTE.BROWSE_BY_COUNTRY),
                URL_BROWSE_RANKINGS: Common.getURI(ROUTE.BROWSE_RANKINGS_CODE, ['commodities_by_regions']),
                EMAIL_FAO_STATISTICS: C.EMAIL_FAO_STATISTICS,
                TELEPHONE_FAO_STATISTICS: C.TELEPHONE_FAO_STATISTICS
            });

            return d;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'home'});

            this.initVariables();

            this.bindEventListeners();

            this.configurePage();
        },

        initVariables: function () {

            this.$DOMAINS = this.$el.find(s.DOMAINS);
            this.$CHART = this.$el.find(s.CHART);
            this.$WHATS_NEW = this.$el.find(s.WHATS_NEW);
            this.$COMING_UP = this.$el.find(s.COMING_UP);
            this.$INFO = this.$el.find(s.INFO);
            this.$FAO_LINKS = this.$el.find(s.FAO_LINKS);
            this.$PARTNERS = this.$el.find(s.PARTNERS);
            this.$DATABASE_UPDATES = this.$el.find(s.DATABASE_UPDATES);
            this.$RELEASE_CALENDAR = this.$el.find(s.RELEASE_CALENDAR);
            this.$COUNTRY_PROFILES = this.$el.find(s.COUNTRY_PROFILES);
            this.$TWITTER = this.$el.find(s.TWITTER);

            this.api = new API();

            this.o = {};
            this.o.lang = Common.getLocale();

        },

        configurePage: function () {

            this.initDomains();

            this.initChart();

            this.initWhatsNew();

            this.initComingUp();

            this.initDatabaseUpdates();

            this.initTwitter();

        },

        initDomains: function () {

            var self = this,
                browseWhiteList = BrowseByDomainConfig.whitelist || [];
                //browseBlackList = BrowseByDomainConfig.blacklist || [];

            amplify.publish(E.LOADING_SHOW, {container: self.$DOMAINS});

            this.api.groupsanddomains({
                dataosource: C.DATASOURCE,
                lang: this.o.lang
            }).then(function(json) {

                var groups = _.chain(json.data)
                    .uniq(function(d) {
                        if ( browseWhiteList.indexOf(d.group_code) > -1) {
                            d.addBrowse = true;
                        }
                        return d.group_code;
                    })
                    .value();

                var v = _.chain(json.data).pluck('group_code').unique().value();


                // TODO: how to handle the browse blacklist/whitelist?
                // TODO: should come from the DB?
                /*_.each(json.data, function(d) {

                    var v = {
                        code: d.GroupCode,
                        label: d.GroupName
                    };

                    // for now implemented just the whitelist from config file
                    if ( browseWhiteList.indexOf(d.GroupCode) > -1) {
                        v.addBrowse = true;
                    }
                    log.info(v)
                    groups.push(v);

                });*/


                var t = Handlebars.compile(templateDomains);
                //self.$DOMAINS.hide().html(t(json)).slideDown(1000);
                self.$DOMAINS.html(t(
                {
                    groups: groups,
                    download: i18nLabels.download,
                    browse: i18nLabels.browse
                }));

                // add listeners on domains
                self.$DOMAINS.find(s.GO_TO_BROWSE).on('click', function(e) {

                    e.preventDefault();

                    var section = ROUTE.BROWSE_BY_DOMAIN_CODE,
                        //code = $(e.target).data("code");
                        code = this.getAttribute('data-code');

                    self.changeState({
                        section:section,
                        code: code
                    });

                });

                self.$DOMAINS.find(s.GO_TO_DOWNLOAD).on('click', function(e) {

                    e.preventDefault();

                    var section = ROUTE.DOWNLOAD_ABOUT,
                    //code = $(e.target).data("code");
                        code = this.getAttribute('data-code');

                    self.changeState({
                        section:section,
                        code: code
                    });

                });

            }).fail(function(e) {

                // TODO: Handle error
                log.error("Home.initDomains; error", e);

                amplify.publish(E.LOADING_HIDE, {container: self.$DOMAINS});
                amplify.publish(E.CONNECTION_PROBLEM, {});

            });

        },

        initChart: function () {

            var self = this,
                c = new ChartCreator();

            amplify.publish(E.LOADING_SHOW, {container: self.$CHART});

            this.api.databean($.extend(true, {}, ChartModel.filter, {
                lang: this.o.lang,
                datasource: C.DATASOURCE
            })).then(function(d) {

                amplify.publish(E.LOADING_HIDE, {container: self.$CHART});

                c.init($.extend(true, {}, CM.chart, {model: d})).then(function (c) {

                    c.render($.extend(true, {}, CM.chart, {container: self.$CHART}));

                });

            }).fail(function(e) {

                // TODO: Handle error
                log.error("Home.initChart; error", e);
                //amplify.publish(E.NOTIFICATION_WARNING, {title: "Error Connection", text: "We are expecting connection problems"});
                amplify.publish(E.LOADING_HIDE, {container: self.$CHART});
                amplify.publish(E.CONNECTION_PROBLEM, {});

            });

        },

        initWhatsNew: function () {

            amplify.publish(E.LOADING_SHOW, {container: this.$WHATS_NEW});

            amplify.publish(E.LOADING_HIDE, {container: this.$WHATS_NEW});

            /* this.api.whatsNew({}).then(function() {

            }); */

            var t = Handlebars.compile(templateNews);
            this.$WHATS_NEW.append(t(WhatsNew));

        },

        initComingUp: function () {

            amplify.publish(E.LOADING_SHOW, {container: this.$COMING_UP});

            amplify.publish(E.LOADING_HIDE, {container: this.$COMING_UP});

            /* this.api.comingUp({}).then(function() {

             }); */

            var t = Handlebars.compile(templateNews);
            this.$COMING_UP.append(t(ComingUp));

        },

        initDatabaseUpdates: function () {

            var self = this,
                t = Handlebars.compile(templateDatabaseUpdates);

            amplify.publish(E.LOADING_SHOW, {container: self.$DATABASE_UPDATES});

            this.api.groupsanddomains({
                lang: this.o.lang,
                datasource: C.DATASOURCE
            }).then(function(d) {

                var sortedDomains = [],
                    databaseUpdates = {};

                _.each(d.data, function(domain) {
                    domain.date_update = new Date(domain.date_update);
                    sortedDomains.push(domain);
                });

                // order by date
                sortedDomains = _.sortBy(sortedDomains, function(o){
                    return -o.date_update.getTime();
                });

                // parse 10 first domains


                moment.locale(Common.getLocale());

                _.each(sortedDomains, function(domain, index) {

                    //log.info(domain, index);

                    if (index < CM.MAX_DATABASE_UPDATES) {

                        var m = moment(domain.date_update),
                            key =  m.format("MMMM YYYY"),
                            title =  m.format("MMMM YYYY");

                        if (!databaseUpdates.hasOwnProperty(key)) {
                            databaseUpdates[key] = {
                                title: title,
                                data: []
                            };

                        }

                        databaseUpdates[key].data.push(domain);

                    }

                });

                self.$DATABASE_UPDATES.html(t(databaseUpdates));

                self.$DATABASE_UPDATES.find(s.GO_TO_DOWNLOAD).off('click');
                self.$DATABASE_UPDATES.find(s.GO_TO_DOWNLOAD).on('click', function(e) {

                    e.preventDefault();

                    log.info(ROUTE);


                    var section = ROUTE.DOWNLOAD_ABOUT,
                        code = this.getAttribute('data-code');

                    log.info(this.getAttribute('data-code'));

                    self.changeState({
                        section:section,
                        code: code
                    });
                });


            }).fail(function(e) {

                // TODO: Handle error
                log.error("Home.initChart; error", e);
                amplify.publish(E.LOADING_HIDE, {container: self.$DATABASE_UPDATES});
                amplify.publish(E.CONNECTION_PROBLEM, {});

            });

        },

        initReleaseCalendar: function() {

        },

        initTwitter: function() {
           amplify.publish(E.LOADING_SHOW, {container: this.$TWITTER});
        },

        bindEventListeners: function () {

        },

        unbindEventListeners: function () {

        },

        changeState: function (data) {

            var section = data.section,
                code = data.code;

            log.info(section, code);

            Common.changeURL(section, code? [code] : [], true);

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);

        }
    });

    return HomeView;

});
