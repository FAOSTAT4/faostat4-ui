require(['../submodules/fenix-ui-common/js/Compiler',
         '../submodules/faostat-ui-commons/js/paths',
         '../submodules/faostat-ui-menu/js/paths',
         '../submodules/faostat-ui-home/js/paths',
         '../submodules/faostat-ui-download/js/paths',
         '../submodules/faostat-ui-tree/js/paths',
         '../submodules/faostat-ui-download/submodules/faostat-ui-bulk-downloads/js/paths',
         '../submodules/faostat-ui-download/submodules/faostat-ui-download-selectors-manager/js/paths',
         '../submodules/faostat-ui-download/submodules/faostat-ui-download-selectors-manager/submodules/faostat-ui-download-selector/js/paths',
         '../submodules/faostat-ui-download/submodules/fenix-ui-download-options/js/paths',
         '../submodules/faostat-ui-download/submodules/fenix-ui-metadata-viewer/js/paths',
         '../submodules/faostat-ui-analysis/js/paths',
         '../submodules/faostat-ui-analysis/submodules/faostat-ui-analysis-ghg-indicators/js/paths',
         '../submodules/faostat-ui-analysis/submodules/faostat-ui-analysis-ghg-overview/js/paths',
         '../submodules/faostat-ui-analysis/submodules/faostat-ui-analysis-ghg-qaqc/js/paths',
         '../submodules/faostat-ui-analysis/submodules/fenix-ui-tiles-manager/js/paths',
         '../submodules/faostat-ui-download/submodules/fenix-ui-metadata-viewer/submodules/json-editor-faostat-theme/js/paths',
         '../submodules/faostat-ui-analysis/submodules/faostat-ui-wide-tables/js/paths',
         '../submodules/faostat-ui-download/submodules/fenix-ui-olap/js/paths'
        ], function(Compiler, Commons, MENU, HOME, DWLD, TREE, BULK, SELECTOR_MGR, SELECTOR, OPTIONS, METADATA,
                    ANALYSIS, GHG_INDICATORS, GHG_OVERVIEW, GHG_QA_QC, TILES_MGR, FAOSTAT_THEME, WIDE_TABLES,
                    OLAP) {

    var commonsConfig = Commons;
    commonsConfig['baseUrl'] = 'submodules/faostat-ui-commons/js';

    var menuConfig = MENU;
    menuConfig['baseUrl'] = 'submodules/faostat-ui-menu/js';

    var homeConfig = HOME;
    homeConfig['baseUrl'] = 'submodules/faostat-ui-home/js';

    var downloadConfig = DWLD;
    downloadConfig['baseUrl'] = 'submodules/faostat-ui-download/js';

    var treeConfig = TREE;
    treeConfig['baseUrl'] = 'submodules/faostat-ui-tree/js';

    var bulkConfig = BULK;
    bulkConfig['baseUrl'] = 'submodules/faostat-ui-download/submodules/faostat-ui-bulk-downloads/js';

    var selectorMgrConfig = SELECTOR_MGR;
    selectorMgrConfig['baseUrl'] = 'submodules/faostat-ui-download/submodules/faostat-ui-download-selectors-manager/js';

    var selectorConfig = SELECTOR;
    selectorConfig['baseUrl'] = 'submodules/faostat-ui-download/submodules/faostat-ui-download-selectors-manager/submodules/faostat-ui-download-selector/js';

    var optionsConfig = OPTIONS;
    optionsConfig['baseUrl'] = 'submodules/faostat-ui-download/submodules/fenix-ui-download-options/js';

    var metadataConfig = METADATA;
    metadataConfig['baseUrl'] = 'submodules/faostat-ui-download/submodules/fenix-ui-metadata-viewer/js';

    var analysisConfig = ANALYSIS;
    analysisConfig['baseUrl'] = 'submodules/faostat-ui-analysis/js';

    var ghgIndicatorsConfig = GHG_INDICATORS;
    ghgIndicatorsConfig['baseUrl'] = 'submodules/faostat-ui-analysis/submodules/faostat-ui-analysis-ghg-indicators/js';

    var ghgOverviewConfig = GHG_OVERVIEW;
    ghgOverviewConfig['baseUrl'] = 'submodules/faostat-ui-analysis/submodules/faostat-ui-analysis-ghg-overview/js';

    var ghgQAQCConfig = GHG_QA_QC;
    ghgQAQCConfig['baseUrl'] = 'submodules/faostat-ui-analysis/submodules/faostat-ui-analysis-ghg-qaqc/js';

    var tilesManagerConfig = TILES_MGR;
    tilesManagerConfig['baseUrl'] = 'submodules/faostat-ui-analysis/submodules/fenix-ui-tiles-manager/js';

    /* FAOSTAT theme for JSON editor library. */
    var faostatThemeConfig = FAOSTAT_THEME;
    faostatThemeConfig['baseUrl'] = 'submodules/faostat-ui-download/submodules/fenix-ui-metadata-viewer/submodules/json-editor-faostat-theme/js';

    var wideTablesConfig = WIDE_TABLES;
    wideTablesConfig['baseUrl'] = 'submodules/faostat-ui-analysis/submodules/faostat-ui-wide-tables/js';

    var olapConfig = OLAP;
    olapConfig['baseUrl'] = 'submodules/faostat-ui-download/submodules/fenix-ui-olap/js';

    Compiler.resolve([commonsConfig,
                      menuConfig,
                      homeConfig,
                      downloadConfig,
                      treeConfig,
                      bulkConfig,
                      selectorMgrConfig,
                      selectorConfig,
                      optionsConfig,
                      metadataConfig,
                      analysisConfig,
                      ghgIndicatorsConfig,
                      ghgOverviewConfig,
                      ghgQAQCConfig,
                      tilesManagerConfig,
                      faostatThemeConfig,
                      wideTablesConfig,
                      olapConfig],
        {
            placeholders: {
               FENIX_CDN: '//fenixapps.fao.org/repository',
               LOCALHOST: '//localhost:8080/faostat'
            },
            config: {
                locale: 'en',
                baseUrl: './',
                paths: {
                    jquery: '{FENIX_CDN}/js/jquery/2.1.1/jquery.min',
                    amplify : '{FENIX_CDN}/js/amplify/1.1.2/amplify.min',
                    jstree: '{FENIX_CDN}/js/jstree/3.0.8/dist/jstree.min',
                    backbone: '{FENIX_CDN}/js/backbone/1.1.2/backbone.min',
                    chosen: '{FENIX_CDN}/js/chosen/1.2.0/chosen.jquery.min',
                    i18n: '{FENIX_CDN}/js/requirejs/plugins/i18n/2.0.4/i18n',
                    handlebars: '{FENIX_CDN}/js/handlebars/2.0.0/handlebars',
                    text: '{FENIX_CDN}/js/requirejs/plugins/text/2.0.12/text',
                    jsonEditor: '{FENIX_CDN}/js/json-editor/0.7.17/jsoneditor',
                    highcharts: '{FENIX_CDN}/js/highcharts/4.0.4/js/highcharts',
                    bootstrap: '{FENIX_CDN}/js/bootstrap/3.3.2/js/bootstrap.min',
                    underscore: '{FENIX_CDN}/js/underscore/1.8.0/underscore.min',
                    sweetAlert: '{FENIX_CDN}/js/sweet-alert/0.5.0/sweet-alert.min',
                    domReady: '{FENIX_CDN}/js/requirejs/plugins/domready/2.0.1/domReady'
                },
                shim: {
                    backbone: {
                        deps: ['jquery', 'underscore'],
                        exports: 'Backbone'
                    },
                    bootstrap: ['jquery'],
                    chosen: ['jquery'],
                    handlebars: {
                        exports: 'Handlebars'
                    },
                    underscore: {
                        exports: '_'
                    },
                    highcharts: ['jquery'],
                    amplify: {
                        deps: ['jquery'],
                        exports: 'amplifyjs'
                    }
                }
            }
        }
    );

    require(['js/application'], function(APP) {

        /* Initiate components. */
        var app = new APP();

        /* Initiate the application. */
        app.init();

    });

});