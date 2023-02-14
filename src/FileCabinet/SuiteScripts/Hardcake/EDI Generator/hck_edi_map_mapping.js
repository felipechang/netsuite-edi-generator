(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "N/search", "./enum", "N/log"], factory);
    }
})(function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMappings = void 0;
    var search_1 = require("N/search");
    var enum_1 = require("./enum");
    var log_1 = require("N/log");
    /**
     * Module file
     *
     * WARNING:
     * TypeScript generated file, do not edit directly
     * source files are located in the repository
     *
     * @project: EDI Generator
     * @description: Searches for EDI Mappings
     *
     * @copyright 01/11/2023 Hardcake
     * @author Felipe Chang felipechang@hardcake.org
     *
     * @NApiVersion 2.x
     * @NModuleScope SameAccount
     */
    /** Change align mapping if the list IDs are incorrect */
    var alignMapping = function (align) {
        switch (align) {
            case '1':
                return enum_1.EnumMapAlign.LEFT;
            case '2':
                return enum_1.EnumMapAlign.RIGHT;
            default:
                return enum_1.EnumMapAlign.CENTER;
        }
    };
    /** Attempt to parse dictionary string into an object */
    var parseDict = function (dict) {
        try {
            if (!dict)
                return {};
            return JSON.parse(dict);
        }
        catch (e) {
            (0, log_1.error)('Error parsing dictionary', { dict: dict, error: e });
            return {};
        }
    };
    /** Attempt to parse parser string into a function */
    var parseParser = function (parser) {
        try {
            if (!parser)
                return function (value) { return value; };
            return eval(parser);
        }
        catch (e) {
            (0, log_1.error)('Error parsing parser', { parser: parser, error: e });
            return function (value) { return value; };
        }
    };
    /** Get mapping key object */
    var getMappings = function (id) {
        var mappings = {};
        var search = (0, search_1.create)({
            type: 'customrecord_hck_edi_map',
            filters: [{
                    name: 'custrecord_hck_edi_group',
                    operator: search_1.Operator.ANYOF,
                    values: [id]
                }, {
                    name: 'isinactive',
                    operator: search_1.Operator.IS,
                    values: ['F']
                }],
            columns: [{
                    name: 'custrecord_hck_edi_map_key'
                }, {
                    name: 'custrecord_hck_edi_map_size'
                }, {
                    name: 'custrecord_hck_edi_map_align'
                }, {
                    name: 'custrecord_hck_edi_map_fill_char'
                }, {
                    name: 'custrecord_hck_edi_map_dict'
                }, {
                    name: 'custrecord_hck_edi_map_parse'
                }, {
                    name: 'custrecord_hck_edi_map_default'
                }],
        });
        var resultSet = search.run();
        resultSet.each(function (result) {
            var key = result.getValue('custrecord_hck_edi_map_key');
            if (!mappings[key])
                mappings[key] = {
                    dict: parseDict(result.getValue('custrecord_hck_edi_map_dict')),
                    parse: parseParser(result.getValue('custrecord_hck_edi_map_parse')),
                    size: Number(result.getValue('custrecord_hck_edi_map_size')),
                    align: alignMapping(result.getValue('custrecord_hck_edi_map_align')),
                    fillChar: result.getValue('custrecord_hck_edi_map_fill_char'),
                    default: result.getValue('custrecord_hck_edi_map_default'),
                };
            return true;
        });
        return mappings;
    };
    exports.getMappings = getMappings;
});
