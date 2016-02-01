/*global define*/
define(['jquery', 'i18n!nls/common'], function ($, Common) {

    'use strict';

    return $.extend(true, {}, Common, {

        about: 'About',
        interactive_download_title: 'Interactive Download',
        bulk_downloads_title: 'Bulk Downloads',
        metadata_title: 'Metadata',
        related_documents: 'Related Documents',
        no_docs_available: 'No documents available for',
        go_to_section: 'Go To Section',

        faostat_domains: 'FAOSTAT Domains',
        preview_options_label: 'Preview Options',
        download_as_label: 'Download as...',
        preview: 'Preview',
        metadata: 'Metadata',
        bulk_downloads: 'Bulk Downloads',
        interactive_download: 'Interactive Download',
        welcome_page: 'About',
        report: 'Report',

        interactive_download_welcome_text: 'Use this section to create a custom query to extract data from the current domain. Please use the selectors below to filter the data according to your needs. Press the <var>Preview</var> button to have an overview of your selection. Use the <var>Preview Options</var> button to customize the final output. Click on <var>Download As...</var> to get the data in the Excel or CSV format. Please consider to visit the <var>Bulk Downloads</var> sections if you need all the data contained in this domain.',

        domains_list_description_bulk: "Click on the list below to go to the Domain Bulk download section",
        domains_list_description_interactive_download: "Click on the list below to go to the Domain Interactive Download section",
        domains_list_description_metadata: "Click on the list below to go to the Domain Metadata section",

    });

});