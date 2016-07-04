/*global require, window, outdatedBrowser*/
require([
    './submodules/fenix-ui-common/js/Compiler',
    './submodules/fenix-ui-common/js/paths',
    './submodules/faostat-ui-tree/src/js/paths',
    './submodules/fenix-ui-map-creator/src/js/paths',
    './submodules/fenix-ui-chart-creator/src/js/paths',
    './submodules/fenix-ui-dashboard/src/js/paths',
    './submodules/faostat-ui-metadata-viewer/src/js/paths',
    './submodules/faostat-ui-bulk-downloads/src/js/paths',
    './submodules/faostat-ui-download-selectors-manager/src/js/paths',
    './submodules/faostat-ui-menu/src/js/paths',
    './submodules/faostat-ui-download-options/src/js/paths',
    './submodules/faostat-ui-download-selector/src/js/paths',
    './submodules/faostat-ui-table/src/js/paths',
    './submodules/faostat-ui-pivot/src/js/paths',
    './submodules/faostat-ui-download/src/js/paths',
    './submodules/faostat-ui-report/src/js/paths',
    './submodules/faostat-ui-report-table/src/js/paths'
], function (Compiler, Common, Tree, MapCreator, ChartCreator, Dashboard, MetadataViewer,
             BulkDownloads, DownloadSelectorsManager, FAOSTATMenu,
             //OptionsManager,
             DownloadOptions, DownloadSelector, Table, Pivot,
             Download,
            // WelcomePage,
             Report, ReportTable) {

    'use strict';

    var submodules_path = '../../submodules/',
        commonConfig = Common,
        treeConfig = Tree,
        mapConfig = MapCreator,
        chartConfig = ChartCreator,
        metadataConfig = MetadataViewer,
        dashboardConfig = Dashboard,
        bulkDownloadsConfig = BulkDownloads,
        downloadSelectorsManagerConfig = DownloadSelectorsManager,
        faostatMenuConfig = FAOSTATMenu,
        downloadOptionsConfig = DownloadOptions,
        downloadSelectorConfig = DownloadSelector,
        tableConfig = Table,
        pivotConfig = Pivot,
        downloadConfig = Download,
        reportConfig = Report,
        reportTableConfig = ReportTable;

    treeConfig.baseUrl = submodules_path + '/faostat-ui-tree/src/js';
    commonConfig.baseUrl = submodules_path + 'fenix-ui-common/js';
    mapConfig.baseUrl = submodules_path + '/fenix-ui-map-creator/src/js';
    chartConfig.baseUrl = submodules_path + '/fenix-ui-chart-creator/src/js';
    dashboardConfig.baseUrl = submodules_path + '/fenix-ui-dashboard/src/js';
    metadataConfig.baseUrl = submodules_path + '/faostat-ui-metadata-viewer/src/js';
    bulkDownloadsConfig.baseUrl = submodules_path + '/faostat-ui-bulk-downloads/src/js';
    downloadSelectorsManagerConfig.baseUrl = submodules_path + '/faostat-ui-download-selectors-manager/src/js';
    faostatMenuConfig.baseUrl = submodules_path + '/faostat-ui-menu/src/js';
    downloadOptionsConfig.baseUrl = submodules_path + '/faostat-ui-download-options/src/js';
    downloadSelectorConfig.baseUrl = submodules_path + '/faostat-ui-download-selector/src/js';
    tableConfig.baseUrl = submodules_path + '/faostat-ui-table/src/js';
    pivotConfig.baseUrl = submodules_path + '/faostat-ui-pivot/src/js';
    downloadConfig.baseUrl = submodules_path + '/faostat-ui-download/src/js';
    reportConfig.baseUrl = submodules_path + '/faostat-ui-report/src/js';
    reportTableConfig.baseUrl = submodules_path + '/faostat-ui-report-table/src/js';

    Compiler.resolve([commonConfig, mapConfig, chartConfig,
            dashboardConfig, metadataConfig, bulkDownloadsConfig,
            downloadSelectorsManagerConfig, faostatMenuConfig,
            treeConfig,
            downloadOptionsConfig,
            downloadSelectorConfig, tableConfig, pivotConfig, downloadConfig,
            reportConfig, reportTableConfig],
        {
            placeholders: {"FENIX_CDN": "//fenixrepo.fao.org/cdn/faostat"},
            config: {

                waitSeconds: 20,

                /* Set the config for the i18n. */
                //i18n: {
                //    locale: 'es'
                //},

                //locale: 'es',

                /* The path where your JavaScripts are located. */
                baseUrl: './src/js',

                /* Specify the paths of vendor libraries. */
                paths: {

                    // alias to the application
                    nls: "../../i18n",
                    config: "../../config",
                    json: "../../json",

                    //'faostat-ui/nls': "../../i18n/",
                    //'faostat-ui/config': "../../config/",
                    //'faostat-ui': "./",

                    // TODO: switch to submodule? */
                    'fs-t-c': './lib/table',

                    jquery:  '{FENIX_CDN}/js/jquery/2.2.3/jquery.min',
                    bootstrap: "{FENIX_CDN}/js/bootstrap/3.3.4/js/bootstrap.min",
                    underscore: "{FENIX_CDN}/js/underscore/1.7.0/underscore.min",
                    "underscore.string": "{FENIX_CDN}/js/underscore.string/3.2.2/underscore.string.min",
                    backbone: "{FENIX_CDN}/js/backbone/1.1.2/backbone.min",
                    handlebars: "{FENIX_CDN}/js/handlebars/4.0.5/handlebars.min",
                    chaplin: "{FENIX_CDN}/js/chaplin/1.1.1/chaplin.min",
                    domReady: "{FENIX_CDN}/js/requirejs/plugins/domready/2.0.1/domReady",
                    i18n: "{FENIX_CDN}/js/requirejs/plugins/i18n/2.0.4/i18n",
                    text: '{FENIX_CDN}/js/requirejs/plugins/text/2.0.12/text',
                    rsvp: '{FENIX_CDN}/js/rsvp/3.0.17/rsvp',
                    amplify: '{FENIX_CDN}/js/amplify/1.1.2/amplify.min',
                    select2: '{FENIX_CDN}/js/select2/3.5.4/select2.min',
                    loglevel: '{FENIX_CDN}/js/loglevel/1.4.0/loglevel',
                    moment: '{FENIX_CDN}/js/moment/2.9.0/moment-with-locales.min',
                    outdatedbrowser: '{FENIX_CDN}/js/outdatedbrowser/1.1.1/outdatedbrowser.min',
                    swiper:  '{FENIX_CDN}/js/swiper/3.3.1/dist/js/swiper.min',
                    waves: '{FENIX_CDN}/js/node-waves/0.7.5/waves.min',
                    modernizr: '{FENIX_CDN}/js/modernizr/3.3.1/modernizr-custom',
                    'jquery.lazyload': '{FENIX_CDN}/js/jquery.lazyload/1.9.7/jquery.lazyload.min',

                    typeahead: '{FENIX_CDN}/js/bootstrap-typeahead/0.11.1/typeahead.bundle.custom',
                    bloodhound: '{FENIX_CDN}/js/bloodhound/0.11.1/bloodhound.min',
                    bootpag: '{FENIX_CDN}/js/bootpag/1.0.7/jquery.bootpag.min',
                    instafilta: '{FENIX_CDN}/js/instafilta/1.4.4/instafilta.min',

                    // aos
                    nprogress: '{FENIX_CDN}/js/nprogress/0.2.0/nprogress',

                    // notifications
                    //'bootstrap-notify': '{FENIX_CDN}/js/bootstrap-notify/3.1.5/bootstrap-notify.min',
                    'toastr': '{FENIX_CDN}/js/toastr/2.1.2/build/toastr.min',

                    'fx-common/config/auth_users' : '../../config/auth_users.json',

                    q: '{FENIX_CDN}/js/q/1.1.2/q',
                    'jquery.rangeSlider': '{FENIX_CDN}/js/jquery.rangeslider/5.7.0/jQDateRangeSlider-min',
                    'jquery-ui': '{FENIX_CDN}/js/jquery-ui/1.10.3/jquery-ui-1.10.3.custom.min',
                    'ion.rangeSlider' : '{FENIX_CDN}/js/ion.rangeSlider/2.1.2/js/ion-rangeSlider/ion.rangeSlider.min',

                    'jquery.visible': '{FENIX_CDN}/js/jquery.visible/1.2.0/jquery.visible.min',

                    //jbPivot: '{FENIX_CDN}/js/jbpivot/0.1.0/jbPivot',
                    jbPivot: '../../submodules/faostat-ui-pivot/dist/js/jbPivot',
                    pivot_exporter: '../../submodules/faostat-ui-pivot/src/js/PivotExporter',
                    swal: '{FENIX_CDN}/js/sweet-alert/0.5.0/sweet-alert.min',
                    //sweetAlert: '{FENIX_CDN}/js/sweet-alert/0.5.0/sweet-alert.min',
                    numeral: '{FENIX_CDN}/js/numeral/1.5.3/min/numeral.min',

                    // Export
                    FileSaver: '{FENIX_CDN}/js/FileSaver/1.1.2/FileSaver.min',
                    Blob: '{FENIX_CDN}/js/blob/1.0/Blob',
                    tableExport: '{FENIX_CDN}/js/tableExport.jquery.plugin/1.0/tableExport.min',

                    // TODO: move to CDN
                    /* FAOSTAT API's client. */
                    faostatapiclient: 'FAOSTATAPIClient',
                    list: '//fenixrepo.fao.org/cdn/js/list/1.1.1/list.min',
                    //list_pagination: '//raw.githubusercontent.com/javve/list.pagination.js/v0.1.1/dist/list.pagination.min',

                    // boostrap bplugins
                    'bootstrap-table': '{FENIX_CDN}/js/bootstrap-table/1.9.1/bootstrap-table.min',
                    'bootstrap-treeview': '{FENIX_CDN}/js/boostrap-treeview/1.2.0/bootstrap-treeview.min',
                    'bootstrap-tour': '{FENIX_CDN}/js/bootstrap-tour/0.10.3/build/js/bootstrap-tour.min',


                    // aos
                    aos: 'https://cdn.rawgit.com/michalsnik/aos/1.2.0/dist/aos',

                    // holmes
                    holmes: '//raw.githubusercontent.com/Haroenv/holmes/gh-pages/js/holmes',
                    microlight: '//raw.githubusercontent.com/Haroenv/holmes/gh-pages/js/microlight',

                    // leaflet-image
                    //'leaflet-image': '//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-image/v0.0.4/leaflet-image',
                    'leaflet-image': 'lib/leaflet-image',

                    // fenix-ui-map
                    'fenix-ui-map': '../../submodules/fenix-ui-map/dist/fenix-ui-map.min',
                    //'fenix-ui-map-config': '../../submodules/fenix-ui-map/dist/fenix-ui-map-config',
                    'fenix-ui-map-config': '../../config/submodules/fx-map/fenix-ui-map-config',

                    // PDFs
                    'jspdf': '{FENIX_CDN}/js/jspdf/1.2.61/jspdf.debug',
                    'screenfull': '{FENIX_CDN}/js/screenfull/3.0.0/screenfull.min',


                    "twitter": "//platform.twitter.com/widgets",

                    /* Google Analytics */
                    // "ga": "//www.google-analytics.com/analytics"
                    // TODO: not sure about the version (it is taken from www.google-analytics.com/analytics)
                    "ga":  '{FENIX_CDN}/js/googleanalytics/0.3.7/analytics'

                },

                shim: {
                    modernizr: {
                        exports: 'Modernizr'
                    },
                    'jquery.lazyload': {
                        deps: ["jquery"]
                    },
                    waves: {
                        deps: ["jquery"]
                    },
                    swiper: {
                        deps: ["jquery"]
                    },
                    amplify: {
                        deps: ["jquery"]
                    },
                    "tableExport": {
                        deps: ["jquery", 'FileSaver']
                    },
                    "FileSaver": {
                        deps: ["jquery", 'Blob']
                    },
                    "bloodhound": {
                        deps: ["jquery"],
                        exports: "Bloodhound"
                    },
                    typeahead: {
                        deps: ["jquery"]
                    },
                    bootpag: {
                        deps: ["jquery", "bootstrap"]
                    },
                    bootstrap: {
                        deps: ["jquery"]
                    },
                    'bootstrap-tour': {
                        deps: ["jquery", "bootstrap"],
                    },
                    underscore: {
                        exports: '_'
                    },
                    backbone: {
                        deps: ['underscore', 'jquery'],
                        exports: 'Backbone'
                    },
                    handlebars: {
                        exports: 'Handlebars'
                    },
                    "gt_msg": ['jquery'],
                    "gt_msg_grid": ['jquery', 'gt_msg'],
                    faostatapiclient: {
                        deps: ['jquery']
                    },
                    'jqueryui': {
                        deps: ['jquery']
                    },
                    jbPivot: {
                        deps: ['jquery', 'jquery-ui']
                    },
                    'jquery.rangeSlider': {
                        deps: ['jquery', 'jquery-ui']
                    },
                    'jquery.visible': {
                        deps: ['jquery']
                    },
                    'ion.rangeSlider': {
                        deps: ['jquery']
                    },
                    'leaflet-image': {
                        deps: ['leaflet']
                    },
                    "ga": {
                        exports: "__ga__"
                    },
                    jspdf: {
                        exports: 'jsPDF'
                    },
                    instafilta: {
                        deps: ['jquery']
                    },
                    /*'bootstrap-notify': {
                        deps: ['jquery']
                    }*/
                }
            }
        });

    // TODO: handle the multilanguage in a proper way

    // Google Analytics
    window.GoogleAnalyticsObject = "__ga__";
    window.__ga__ = {
        //q: [["create", "UA-68486942-1", "auto"]],
        l: Date.now()
    };

    var getLocale = function ( url ) {
        var href = url ? url : window.location.href;
        var langString = href.substring(href.indexOf('#')+1, href.length -1);
        langString = langString.substring(0, langString.indexOf('/')).replace('/', '');
        return (langString.length == 2)? langString.toLocaleLowerCase(): null;
    };

    //var locale = getQueryString('locale') || 'en';
    var locale = getLocale() || 'en';
    require.config({'locale': locale});

    /* Bootstrap the application. */
    require([
        'jquery',
        'application',
        'routes',
        'config/Config',
        'globals/Common',
        'config/Events',
        'globals/GoogleAnalyticsManager',
        'loglevel',
        'waves',
        'nprogress',
        //'modernizr',
        'outdatedbrowser',
        'amplify',
    ], function ($, Application, routes, C, Common, E, GoogleAnalyticsManager, log, Waves, NProgress) {

        NProgress.start();

        // outdatedBrowser. Has been moved here to avoid Google indexing it.
        $('body').append('<div id="outdated"><h6>Your browser is out of date!</h6><p>Update your browser to view this website correctly. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Update my browser now </a></p> <p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Close">&times;</a></p></div>');
        outdatedBrowser({
            bgColor: '#f25648',
            color: '#ffffff',
            lowerThan: 'transform',
            languagePath: ''
        });

        // saving Locale
        Common.setLocale(requirejs.s.contexts._.config.locale);
        // Alternative is to use the amplify storage.
        //amplify.store( 'locale', requirejs.s.contexts._.config.locale);
        //amplify.store( 'lang', requirejs.s.contexts._.config.locale);

        $('body').addClass(Common.getLocale());

        // init Wave effect applaied on buttons
        Waves.init();

        // setting global LOGLEVEL level
        log.setLevel(C.LOGLEVEL);

        // modernizr
        //ModernizrFixes();

        // clear amplify
        forceAmplifyStorageClear();

        // starting the Application
        var app = new Application({
            routes: routes,
            root: C.CHAPLINJS_PROJECT_ROOT,
            scrollTo: C.CHAPLINJS_SCROLL_TO,
            pushState: C.CHAPLINJS_PUSH_STATE,
            controllerSuffix: C.CHAPLINJS_CONTROLLER_SUFFIX
        });

    });

    // TODO: move to an external file
    function ModernizrFixes() {

        if (Modernizr.csscolumns) {

        }else{

        }

    }

    // TODO: move to an external file
    function forceAmplifyStorageClear() {

        $.each(amplify.store(), function (storeKey) {
            // Delete the current key from Amplify storage
            amplify.store(storeKey, null);
        });

    }


});