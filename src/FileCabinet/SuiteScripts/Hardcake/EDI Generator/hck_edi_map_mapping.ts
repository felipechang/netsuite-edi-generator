import {create, Operator} from "N/search";
import {EnumMapAlign} from "./enum";
import {error} from "N/log";

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
const alignMapping = (align: string): number => {
    switch (align) {
        case '1':
            return EnumMapAlign.LEFT;
        case '2':
            return EnumMapAlign.RIGHT;
        default:
            return EnumMapAlign.CENTER;
    }
}

/** Attempt to parse dictionary string into an object */
const parseDict = (dict: string): { [key: string]: string } => {
    try {
        if (!dict) return {};
        return JSON.parse(dict)
    } catch (e) {
        error('Error parsing dictionary', {dict, error: e});
        return {}
    }
}

/** Attempt to parse parser string into a function */
const parseParser = (parser: string): (value: string) => string => {
    try {
        if (!parser) return (value) => value;
        return eval(parser)
    } catch (e) {
        error('Error parsing parser', {parser, error: e});
        return (value) => value;
    }
}

/** Get mapping key object */
export const getMappings = (id: string): IEdiMap => {
    const mappings: IEdiMap = {};
    const search = create({
        type: 'customrecord_hck_edi_map',
        filters: [{
            name: 'custrecord_hck_edi_group',
            operator: Operator.ANYOF,
            values: [id]
        }, {
            name: 'isinactive',
            operator: Operator.IS,
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
    const resultSet = search.run();
    resultSet.each((result) => {
        const key = result.getValue('custrecord_hck_edi_map_key') as string;
        if (!mappings[key]) mappings[key] = {
            dict: parseDict(result.getValue('custrecord_hck_edi_map_dict') as string),
            parse: parseParser(result.getValue('custrecord_hck_edi_map_parse') as string),
            size: Number(result.getValue('custrecord_hck_edi_map_size')),
            align: alignMapping(result.getValue('custrecord_hck_edi_map_align') as string),
            fillChar: result.getValue('custrecord_hck_edi_map_fill_char') as string,
            default: result.getValue('custrecord_hck_edi_map_default') as string,
        };
        return true;
    });
    return mappings;
}