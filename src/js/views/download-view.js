/*global define, _:false, $, console, amplify, FM*/
define([
    'jquery',
    'loglevel',
    'views/base/view',
    'config/FAOSTAT',
    'config/Config',
    'config/Events',
    'globals/Common',
    'config/Routes',
    'text!templates/download/download.hbs',
    'i18n!nls/download',
    'FAOSTAT_UI_TREE',
    'fs-r-p/start',
    'fs-i-d/start',
    // TODO: change Names
    'FAOSTAT_UI_BULK_DOWNLOADS',
    //'FENIX_UI_METADATA_VIEWER',
    'fs-m-v/start',
    'lib/related_documents/related_documents',
    //'FAOSTAT_UI_WELCOME_PAGE',
    'lib/download/domains_list/domains-list',
    'moment',
    'underscore.string',
    'views/browse-by-domain-view',
    'handlebars',
    'faostatapiclient',
    'lib/common/text-wrapper',
    'amplify'
], function ($, log, View, F, C, E, Common, ROUTE,
             template, i18nLabels,
             Tree, Report, InteractiveDownload,
             BulkDownloads,
             MetadataViewer,
             //WelcomePage,
             RelatedDocuments,
             DomainsList,
             moment,
             _s,
             DomainView,
             Handlebars,
             FAOSTATApi,
             TextWrapper
) {

    'use strict';

    var s = {

            TREE: "#fs-download-domain-tree",
            SEARCH_TREE: "#fs-download-tree-search",
            OUTPUT_AREA: "#fs-download-output-area",
            MAIN_CONTAINER_TITLE: "#fs-download-main-container-title",

            REPORT: "#report",
            BULK: "#bulk_downloads",
            ABOUT: "#about",
            INTERACTIVE_DOWNLOAD: "#interactive_download",
            METADATA: "#metadata",
            BROWSE: "#browse",

            // Related Documents
            RELATED_DOCUMENTS: '[data-role="fs-download-related-documents"]',
            LAST_UPDATED_DATE: '[data-role="fs-download-last-update-date"]',
            BULK_SIDEBAR: '[data-role="fs-download-bulk-downloads-sidebar"]',
            LAST_UPDATE_DATE: '[data-role="fs-download-last-update-date"]',
            METADATA_BUTTON: '[data-role="fs-download-metadata-button"]',
            BULK_CARET: "[data-role='bulk-downloads-caret']",

            // Tree
            MENU_TREE: '[data-role="fs-domains-menu"]',
            TREE_CONTAINER: '[data-role="fs-domains-tree-container"]',
            TREE_CLOSE: '[data-role="fs-domains-tree-container-close"]',

            // this is used to change the link to the interactive download
            DOWNLOAD_INTERACTIVE_LINK: '[data-role="download-interactive-link"]',

            DESCRIPTION: '[data-role="description"]',
            CONTACTS: '[data-role="contact-name"]'

    },

    defaultOptions = {

    },

    DownloadView = View.extend({

        autoRender: true,

        className: 'download',

        template: template,

        initialize: function (options) {

            log.info("DownloadView.initialize; options", options);

            this.o = $.extend(true, {}, defaultOptions, options);
            this.o.lang = Common.getLocale();

            // TODO: should not be here
            this.api = new FAOSTATApi();

            // TODO: useful?
            this.options = $.extend(true, {}, options);

        },

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {data: 'data'});

            this.initVariables();

            this.initComponents();

            this.bindEventListeners();

            this.configurePage();
        },

        initVariables: function () {

            this.$TREE = this.$el.find(s.TREE);
            this.$OUTPUT_AREA = this.$el.find(s.OUTPUT_AREA);
            this.$REPORT = this.$el.find(s.REPORT);
            this.$BULK = this.$el.find(s.BULK);
            this.$METADATA = this.$el.find(s.METADATA);
            this.$INTERACTIVE_DOWNLOAD = this.$el.find(s.INTERACTIVE_DOWNLOAD);
            this.$ABOUT = this.$el.find(s.ABOUT);
            this.$MAIN_CONTAINER_TITLE = this.$el.find(s.MAIN_CONTAINER_TITLE);
            this.$BROWSE = this.$el.find(s.BROWSE);
            this.$MENU_TREE = this.$el.find(s.MENU_TREE);
            this.$TREE_CONTAINER = this.$el.find(s.TREE_CONTAINER);
            this.$TREE_CLOSE = this.$el.find(s.TREE_CLOSE);
            this.$RELATED_DOCUMENTS = this.$el.find(s.RELATED_DOCUMENTS);
            this.$BULK_SIDEBAR = this.$el.find(s.BULK_SIDEBAR);
            this.$BULK_CARET = this.$el.find(s.BULK_CARET);
            this.$LAST_UPDATE_DATE = this.$el.find(s.LAST_UPDATE_DATE);
            this.$METADATA_BUTTON = this.$el.find(s.METADATA_BUTTON);
            this.$DOWNLOAD_INTERACTIVE_LINK = this.$el.find(s.DOWNLOAD_INTERACTIVE_LINK);
            this.$DESCRIPTION = this.$el.find(s.DESCRIPTION);
            this.$CONTACTS = this.$el.find(s.CONTACTS);

            this.$el.find('.nav-tabs [data-section=' + this.o.section + ']').tab('show');

        },

        initComponents: function () {

            var self = this;

            this.tree = new Tree();
            this.tree.init({
                placeholder_id: this.$TREE,
                placeholder_search: this.$el.find(s.SEARCH_TREE),
                datasource: C.DATASOURCE,
                lang: this.o.lang,
                code: this.o.code,
                callback: {

                    onClick: function (callback) {

                        callback.type = self.tree.getCodeType();

                        self.$TREE_CONTAINER.hide();

                        self.updateSection(callback);

                        self.changeState();

                        amplify.publish(E.SCROLL_TO_SELECTOR, {
                            container: self.$MAIN_CONTAINER_TITLE
                        });

                    },

                    onTreeRendered: function (callback) {

                        callback.type = self.tree.getCodeType();

                        self.updateSection(callback);

                    }

                }
            });

        },

        updateSection: function(options) {

            this.o.selected = $.extend(true, {}, options);

            log.info("Download.updateSection", this.o.selected, options);

            this.switchTabs(this.o.section, this.o.selected);

        },

        configurePage: function () {

        },

        switchTabs: function(section, options) {

            log.info('switch tab: ', section, options);

            var code = options.id,
                label = options.label,
                type = options.type;

            // this sections should be always cleaned
            this.$OUTPUT_AREA.empty();

            // Set Title
            this.$MAIN_CONTAINER_TITLE.html(label);

            // Set Related Documents
            // TODO: this in theory should change only when a domain/group is changed and not when a tab is switched.
            this._renderRelatedDocuments(code);
            //this._renderLastUpdate(code);
            //this._renderBulkDownloadsSidebar(code);

            this._renderBulkDownloadCaret(code);
            this._renderMetadata(code);

            // check tab availability
            this.checkSectionsAvailability(section, code);

            if ( type === 'group') {
                this.switchTabsGroup(section, options);
            }

            if ( type === 'domain') {
                this.switchTabsDomain(section, options);
            }

        },

        checkSectionsAvailability: function(section, code) {

            // TODO: check show/hide tabs and if tab is available (use APIs)
            log.info('DONWLOAD.checkSectionsAvailability;', section, code);

            // TODO: change with APIs
            if (code === 'FBS') {
                this.$el.find('.nav-tabs [data-section="report"]').show();
            }else {
                this.$el.find('.nav-tabs [data-section="report"]').hide();
            }

        },

        switchTabsGroup: function(section, options) {

            var code = options.id,
                label = options.label,
                type = options.type;

            if (section === 'about') {

                this.welcomePage = new WelcomePage();
                this.welcomePage.init({
                    container: this._createRandomElement(this.$ABOUT),
                    domain_code: code,
                    domain_name: label,
                    base_url: C.URL_FAOSTAT_DOCUMENTS_BASEPATH
                });

            }

            if (section === 'bulk') {

                this.bulkDownloads = new BulkDownloads();
                this.$BULK.empty();
                this.bulkDownloads.init({
                    container: this._createRandomElement(this.$BULK),
                    code: code,
                    bulk_downloads_root: C.URL_BULK_DOWNLOADS_BASEPATH
                });

            }

            if (section === 'interactive') {

                this.createDomainsList(this.$INTERACTIVE_DOWNLOAD, section, code, i18nLabels.domains_list_description_interactive_download);

            }

            if (section === 'bulk') {

                this.createDomainsList(this.$BULK, section, code, i18nLabels.domains_list_description_bulk);

            }

            if (section === 'report') {

                this.createDomainsList(this.$REPORT, section, code, i18nLabels.domains_list_report);

            }

            if (section === 'metadata') {

                this.createDomainsList(this.$METADATA, section, code, i18nLabels.domains_list_description_metadata);

            }

            if (section === 'browse_by_domain_code') {

                this._browseByDomain(options);

            }

        },

        createDomainsList: function(container, section, code, section_description) {

            this.domainsList = new DomainsList();
            this.domainsList.init({
                container: this._createRandomElement($(container)),
                section: section,
                code: code,
                section_description: section_description
            });

        },

        switchTabsDomain: function(section, options) {

            moment.locale(Common.getLocale());

            var code = options.id,
                date_sanitized = _s.strLeft(_s.replaceAll(options.date_update, '-', '/'), "."),
                label = options.label,
                date_update = moment(new Date(date_sanitized)).format("DD MMMM YYYY"),
                type = options.type;

            // TODO destroy old bulkthis._createRandomElement(this.$ABOUT),
            if (section === 'bulk') {
                this.bulkDownloads = new BulkDownloads();
                this.bulkDownloads.init({
                    container: this._createRandomElement(this.$BULK),
                    code: code,
                    bulk_downloads_root: C.URL_BULK_DOWNLOADS_BASEPATH
                });

            }

            if (section === 'interactive') {

                if (this.interactiveDownload !== undefined && this.interactiveDownload !== null) {
                    this.interactiveDownload.destroy();
                }
                this.interactiveDownload = new InteractiveDownload();
                this.$INTERACTIVE_DOWNLOAD.empty();
                this.interactiveDownload.init({
                    container: this._createRandomElement(this.$INTERACTIVE_DOWNLOAD),
                    // to output the table outside the standard output area
                    output_area: this.$OUTPUT_AREA,
                    code: code,
                    date_update: date_update
                });

            }

            if (section === 'report') {

                // TODO: check on tabs APIs
                if ( options.id === 'FBS') {

                    this.report = new Report();
                    this.$REPORT.empty();
                    this.report.init({
                        container: this._createRandomElement(this.$REPORT),
                        code: code
                    });

                }else {

                    // TODO: set where the user should go during the routing
                    this.changeState({
                        section: ROUTE.DOWNLOAD_ABOUT,
                        id: code,
                        force: true
                    });
                }

            }

            // TODO: the metadataViewer should be the only entry point to get Metadata Informations
            if (section === 'metadata') {

                // adding loading
                this.$METADATA.empty();
                amplify.publish(E.LOADING_SHOW, {
                    container: this.$METADATA
                });

                if (this.metadataViewer && this.metadataViewer.hasOwnProperty("destroy")) {
                    this.metadataViewer.destroy();
                }

                this.metadataViewer = new MetadataViewer();
                this.metadataViewer.init({
                    container: this._createRandomElement(this.$METADATA),
                    code: code,
                    lang: Common.getLocale(),
                    url_get_metadata: C.URL_METADATA_MODEL,
                    url_get_domain: C.URL_METADATA_DOMAIN
                });

            }

            if (section === 'about') {

                this.welcomePage = new WelcomePage();
                this.welcomePage.init({
                    container: this._createRandomElement(this.$ABOUT),
                    domain_code: code,
                    domain_name: label,
                    base_url: C.URL_FAOSTAT_DOCUMENTS_BASEPATH
                });

            }

            // TODO: move to a common function
            if( section === 'browse_by_domain_code') {

                this._browseByDomain(options);

            }

        },

        _browseByDomain: function(options) {

            var browseOptions = {};
            browseOptions.code = options.id;
            browseOptions.lang = this.o.lang;

            // TODO: section shouldn't be need
            browseOptions.section = ROUTE.BROWSE_BY_DOMAIN; //ROUTE.BROWSE_BY_DOMAIN_CODE;

            log.info("Download._browseByDomain; options:", browseOptions);

            if (this.view_domain) {
                this.view_domain.dispose();
            }

            // {region: "main", section: "browse_by_domain", lang: "en", code: "P"}

            // init browse by domain
            this.view_domain = new DomainView(browseOptions);

            this.$BROWSE.empty();
            var $S = this._createRandomElement(this.$BROWSE);
            $S.html(this.view_domain.$el);

        },

        changeState: function(options) {

            var section = (options && options.hasOwnProperty('section'))? options.section: this.o.section,
                id = (options && options.hasOwnProperty('id'))? options.id: this.o.selected.id,
                force = (options && options.hasOwnProperty('force'))? options.force: false;

            log.info('ChangeState: ', section, id, force);

            Common.changeURL(section, [id], force);

        },

        bindEventListeners: function () {

            var self = this;

            // bind tabs listeners
            this.$el.find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

                self.o.section = $(e.target).data("section"); // activated tab

                self.switchTabs(self.o.section, self.o.selected);

                self.changeState();

            });

            this.$MENU_TREE.on('click', function() {

                self.$TREE_CONTAINER.toggle({
                    direction: 'left'
                }, 500);
                
            });

            this.$TREE_CLOSE.on('click', function() {
                self.$TREE_CONTAINER.hide({
                    direction: 'left'
                }, 500);
            });

            this.$METADATA_BUTTON.on('click', function() {

                if (self.o.hasOwnProperty("selected")) {
                    // TODO: this.o.section should be always updated
                    amplify.publish(E.METADATA_SHOW, {
                        code: self.o.selected.id
                    });
                }
                else {
                    log.error("Download.MetadataButton; this.o.selected.code doesn't exists", self.o);
                }

            });

            this.$DOWNLOAD_INTERACTIVE_LINK.on('click', function() {

                // TODO: replace it with an anchor
                self.$el.find('[data-section="interactive"]').tab('show');

/*                if (self.o.hasOwnProperty("selected")) {
                    Common.changeURL(ROUTE.DOWNLOAD_INTERACTIVE, [self.o.selected.id], true);
                }
                else {
                    log.error("Download.DownloadInteractiveLink; this.o.selected.code doesn't exists", self.o);
                }*/

            });
        },

        unbindEventListeners: function () {

            // unbind tabs listeners
            this.$el.find('a[data-toggle="tab"]').off('shown.bs.tab');

            this.$MENU_TREE.off('click');
            this.$TREE_CLOSE.off('click');

        },

        _renderBulkDownloadsSidebar: function(code) {

            this.$BULK_SIDEBAR.empty();

            var bulkDownloads = new BulkDownloads();
            bulkDownloads.init({
                container: this._createRandomElement(this.$BULK_SIDEBAR),
                code: code,
                bulk_downloads_root: C.URL_BULK_DOWNLOADS_BASEPATH,
                show_header: false
            });

        },

        // TODO: remove it from here
        _renderBulkDownloadCaret: function(code) {
            

            var self = this;

            this.$BULK_CARET.empty();

            // TODO: this should be in a common functionality?
            /* Fetch available bulk downloads. */
            this.api.bulkdownloads({
                datasource: C.DATASOURCE,
                lang: this.o.lang,
                domain_code: code
            }).then(function (json) {

                log.info(json)

                var data = json.data,
                    template = "{{#each data}}<li><a target='_blank' href='{{this.url}}'>{{this.FileContent}}</a></li>{{/each}}",
                    t = Handlebars.compile(template);

                if(data.length > 0) {

                    _.each(data, function(d) {

                        d.url = C.URL_BULK_DOWNLOADS_BASEPATH + d.FileName;
                        d.FileContent = _s.capitalize(_s.replaceAll(d.FileContent, '_', ' '));

                    });

                    self.$BULK_CARET.html(t({data: data}));

                }else {
                    self.$BULK_CARET.html('<li><a>'+ i18nLabels.no_data_available +'</a></li>');
                }

            });
            
        },

        _renderLastUpdate: function() {

            this.$LAST_UPDATE_DATE.empty();


        },

        _renderRelatedDocuments: function(code) {

           this.$RELATED_DOCUMENTS.empty();

           var related_documents = new RelatedDocuments();

           related_documents.render({
                container: this.$RELATED_DOCUMENTS,
                code: code
           });

        },

        _renderMetadata: function(code) {

            var self = this;

            this.api.metadata({
                datasource: C.DATASOURCE,
                lang: this.o.lang,
                domain_code: code
            }).then(function(d) {

                if(d.hasOwnProperty('data') && d.data.length > 0 ) {

                    self._renderDescription(d.data);
                    self._renderContacts(d.data);
                }

                else {

                    // add text for no metadata available
                    self.$DESCRIPTION.html(i18nLabels.no_data_available);
                    self.$CONTACTS.html(i18nLabels.no_data_available);

               }

            });

        },

        // TODO: the metadataViewer should be the only entry point to get Metadata Informations
        _renderDescription: function(data) {

            this.$DESCRIPTION.empty();

            var description = _.find(data, function(v) {
                return v.metadata_code === "3.1";
            });

            if ( description ) {
                new TextWrapper().render({
                    container: this.$DESCRIPTION,
                    text: description.metadata_text,
                    length: 250
                });
            }


        },

        // TODO: the metadataViewer should be the only entry point to get Metadata Informations
        _renderContacts: function(data) {

            this.$CONTACTS.empty();

            var contacts = _.find(data, function(v) {
                return v.metadata_code === "1.3";
            });

            var contactsEmail = _.find(data, function(v) {
                return v.metadata_code === "1.5";
            });

            log.info(contacts, contactsEmail)


            if ( contacts ) {

                new TextWrapper().render({
                    container: this.$CONTACTS,
                    text: contactsEmail.metadata_text,
                    length: 250
                });
            }

        },

        _createRandomElement: function($CONTAINER, empty) {

            var empty = (empty && typeof(empty) === "boolean")? empty : true,
                id = Math.random().toString().replace(".", "");

            if(empty) {
                $CONTAINER.empty();
            }

            $CONTAINER.append("<div id='"+ id +"'>");

            return $CONTAINER.find('#' + id);

        },

        dispose: function () {

            this.unbindEventListeners();

            if (this.report && this.report.destroy) {
                this.report.destroy();
            }

            View.prototype.dispose.call(this, arguments);
        }

    });

    return DownloadView;
});
