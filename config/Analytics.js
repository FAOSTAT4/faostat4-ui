/*global define*/
define(function () {

    'use strict';

    return {

        // GOOGLE ANALYTICS BINDINGS

        // categories
        download: {
            category: 'download',
            action: {
                preview_table: 'preview',
                download_table: 'download',
                preview_pivot: 'download',
                download_pivot: 'download',
            },
            label: {
                // section should be derived from the page viewed
                section: '', //i.e. browse_by_domain/download_interactive from ChaplinJS etc
            } //domain code
        },

        download_bulk: {
            category: 'download_bulk',
            action: {
                download: 'download'
            },
            label: {
                filename: '',
                section: ''
            }
        },

        /* data */
        data: {

            search: {
                category: 'data',
                action: 'seach',
                label: '' //text searched
            }

        },

        /* metadata */
        metadata: {

            download_csv: {
                category: 'metadata',
                action: 'download_csv',
                label: '' //code
            }

        },

        /* methodos and standards specific tracking */
        // DONE
        methodology: {
            selection: {
                category: 'methodology',
                action: 'methodology_selection',
                label: '' //code
            }
        },

        classifications: {

            selection: {
                category: 'classifications',
                action: 'classifications_selection',
                label: '' //code
            },

            download: {
                category: 'classifications',
                action: 'download',
                label: '' //code
            }

        },

        abbreviations: {

            download: {
                category: 'abbreviations',
                action: 'download',
                label: ''
            }
            
        },

        glossary: {

            download: {
                category: 'glossary',
                action: 'download',
                label: ''
            }
            
        },

        units: {

            download: {
                category: 'glossary',
                action: 'download',
                label: ''
            }

        },

        /* search */
        // DONE
        search: {

            // tracking query
            query: {
                category: 'search',
                action: 'query',
                label: '' //text searched
            },

            // tracking the downloads on the search page
            download: {
                category: 'search',
                action: 'download',
                label: '' // filter object
            }

            /*
            
            // the link now is in the anchor
             
            go_to_browse: {
                category: 'search',
                action: 'go_to_browse',
                label: '' // url
            },

            go_to_download: {
                category: 'search',
                action: 'go_to_download',
                label: '' // url
            }
            */
        },

        /* compare */
        // DONE
        compare: {

            add_filter: {
                category: 'compare',
                action: 'add_filter',
                label: ''
            },

            remove_filter: {
                category: 'compare',
                action: 'remove_filter',
                label: ''
            },

            compare_data: {
                category: 'compare',
                action: 'compare_data',
                label: {
                    codes: []
                }
            }

        }

    };
});