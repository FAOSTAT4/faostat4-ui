/*global define*/
define([
    'config/browse_by_domain/Config'
],function (C) {

    'use strict';

    return {

        "filter": {

            defaultFilter: {
                "domain_code": ["CC"]
            },

            items: [
                {
                    // id to be applied on the getData request
                    "id": "item",
                    "type": "codelist",
                    "parameter": "List3Codes",
                    "componentType": {
                        "class": "col-xs-6 col-sm-6 col-md-3",
                        "type": "dropDownList"
                    },
                    "config": {
                        "dimension_id": "item",
                        "defaultCodes": ["2905"],
                        "filter": {
                            "show_lists": false
                        }
                    }
                },
                {
                    "id": "area",
                    "type": "codelist",
                    "parameter": "List1Codes",
                    "componentType": {
                        "class": "col-xs-6 col-sm-6 col-md-3",
                        "type": "dropDownList"
                    },
                    "config": {
                        "dimension_id": "area",
                        "defaultCodes": ["5000"],
                        "filter": {
                            "show_lists": false
                        }
                    }
                },
                {
                    "id": "year",
                    "type": "codelist",
                    "parameter": "List4Codes",
                    "componentType": {
                        "class": "col-xs-4 col-sm-4 col-md-2",
                        "type": "dropDownList-timerange"
                    },
                    "config": {
                        "dimension_id": "year",
                        "defaultCodes": ["1993"],
                        "filter": {
                        }
                    }
                },
                C.filter.aggregation
            ]
        },

        dashboard: {

            //data base filter
            defaultFilter: {
                domain_codes: ['CC'],
                List5Codes: null,
                List6Codes: null,
                List7Codes: null,
                decimal_places: 2,
                decimal_separator: ".",
                limit: -1,
                thousand_separator: ",",
                null_values: null,
                page_size: 0,
                per_page: 0,
                page_number: 0
            },

            // labels?
            labels: {
                // labels to dinamically substitute the title and subtitle
                default: {

                }
            },

            //bridge configuration
            bridge: {
                type: "faostat",
                //requestType: 'data' // data, rankings
            },

            metadata: {},

            items: [
                {
                    type: 'chart',
                    class: "col-md-6",

                    labels: {
                        template: {
                            title: {
                                en: "Fat supply quantity {{area}}",
                                fr: "La quantité de disponibilité de matière grasse {{area}}",
                                es: "Cantidad de suministro de grasas {{area}}"
                            },
                            subtitle: "{{year}}"
                        }
                    },

                    config: {
                        adapter: {
                            adapterType: 'faostat',
                            type: "timeserie",
                            xDimensions: 'year',
                            yDimensions: 'unit',
                            valueDimensions: 'value',
                            seriesDimensions: ['area', 'item', 'element']
                        },
                        template: {},
                        creator: {}
                    },
                    allowedFilter: ['area', 'year', 'item'],
                    filter: {
                        List2Codes: [684],
                        "order_by": 'year'
                    }
                },
                {
                    type: 'chart',
                    class: "col-md-6",

                    labels: {
                        template: {
                            title: {
                                en: "Protein supply quantity {{area}}",
                                fr: "La quantité de disponibilité de protéines {{area}}",
                                es: "Cantidad de suministro de proteína {{area}}"
                            },
                            subtitle: "{{year}}"
                        }
                    },

                    config: {
                        adapter: {
                            adapterType: 'faostat',
                            type: "timeserie",
                            xDimensions: 'year',
                            yDimensions: 'unit',
                            valueDimensions: 'value',
                            seriesDimensions: ['area', 'item', 'element']
                        },
                        template: {},
                        creator: {}
                    },
                    allowedFilter: ['area', 'year', 'item'],
                    filter: {
                        List2Codes: [674],
                        "order_by": 'year'
                    }
                },
                {
                    type: 'chart',
                    class: "col-md-6",

                    labels: {
                        template: {
                            title: {
                                en: "Food supply quantity (kg/capita/yr) {{area}}",
                                fr: "Quantité de la disponibilité alimentaire (kg /habitant/an) {{area}}",
                                es: "Cantidad de suministro de alimentos (kg/persona/año) {{area}}"
                            },
                            subtitle: "{{year}}"
                        }
                    },

                    config: {
                        adapter: {
                            adapterType: 'faostat',
                            type: "timeserie",
                            xDimensions: 'year',
                            yDimensions: 'unit',
                            valueDimensions: 'value',
                            seriesDimensions: ['area', 'item', 'element']
                        },
                        template: {},
                        creator: {}
                    },
                    allowedFilter: ['area', 'year', 'item'],
                    filter: {
                        List2Codes: [645],
                        "order_by": 'year'
                    }
                },
                {
                    type: 'chart',
                    class: "col-md-6",

                    labels: {
                        template: {
                            title: {
                                en: "Food supply quantity (tonnes) {{area}}",
                                fr: "Quantité de la disponibilité alimentaire (tonnes) {{area}}",
                                es: "Cantidad de suministro de alimentos (toneladas) {{area}}"
                            },
                            subtitle: "{{year}}"
                        }
                    },

                    config: {
                        adapter: {
                            adapterType: 'faostat',
                            type: "timeserie",
                            xDimensions: 'year',
                            yDimensions: 'unit',
                            valueDimensions: 'value',
                            seriesDimensions: ['area', 'item', 'element']
                        },
                        template: {},
                        creator: {}
                    },
                    allowedFilter: ['area', 'year', 'item'],
                    filter: {
                        List2Codes: [641],
                        "order_by": 'year'
                    }
                }
            ]
        }

    }
});