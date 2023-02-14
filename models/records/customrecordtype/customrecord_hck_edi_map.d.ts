import {Record} from "N/record";

export interface ValueParser extends Omit<Record, 'getValue' | 'setValue' | 'getLineCount' | 'getSublistValue' | 'getCurrentSublistValue' | 'setSublistValue' | 'setCurrentSublistValue' | 'findSublistLineWithValue'> {
    getValue(fieldId: 'custrecord_hck_edi_group'): string;
    getValue(options: { fieldId: 'custrecord_hck_edi_group' }): string;
    setValue(fieldId: 'custrecord_hck_edi_group', value: string): this;
    setValue(options: { fieldId: 'custrecord_hck_edi_group', value: string } & Extras): this;
    getValue(fieldId: 'custrecord_hck_edi_map_key'): string;
    getValue(options: { fieldId: 'custrecord_hck_edi_map_key' }): string;
    setValue(fieldId: 'custrecord_hck_edi_map_key', value: string): this;
    setValue(options: { fieldId: 'custrecord_hck_edi_map_key', value: string } & Extras): this;
    getValue(fieldId: 'custrecord_hck_edi_map_size'): number;
    getValue(options: { fieldId: 'custrecord_hck_edi_map_size' }): number;
    setValue(fieldId: 'custrecord_hck_edi_map_size', value: number): this;
    setValue(options: { fieldId: 'custrecord_hck_edi_map_size', value: number } & Extras): this;
    getValue(fieldId: 'custrecord_hck_edi_map_align'): string;
    getValue(options: { fieldId: 'custrecord_hck_edi_map_align' }): string;
    setValue(fieldId: 'custrecord_hck_edi_map_align', value: string): this;
    setValue(options: { fieldId: 'custrecord_hck_edi_map_align', value: string } & Extras): this;
    getValue(fieldId: 'custrecord_hck_edi_map_fill_char'): string;
    getValue(options: { fieldId: 'custrecord_hck_edi_map_fill_char' }): string;
    setValue(fieldId: 'custrecord_hck_edi_map_fill_char', value: string): this;
    setValue(options: { fieldId: 'custrecord_hck_edi_map_fill_char', value: string } & Extras): this;
    getValue(fieldId: 'custrecord_hck_edi_map_default'): string;
    getValue(options: { fieldId: 'custrecord_hck_edi_map_default' }): string;
    setValue(fieldId: 'custrecord_hck_edi_map_default', value: string): this;
    setValue(options: { fieldId: 'custrecord_hck_edi_map_default', value: string } & Extras): this;
    getValue(fieldId: 'custrecord_hck_edi_map_dict'): string;
    getValue(options: { fieldId: 'custrecord_hck_edi_map_dict' }): string;
    setValue(fieldId: 'custrecord_hck_edi_map_dict', value: string): this;
    setValue(options: { fieldId: 'custrecord_hck_edi_map_dict', value: string } & Extras): this;
    getValue(fieldId: 'custrecord_hck_edi_map_parse'): string;
    getValue(options: { fieldId: 'custrecord_hck_edi_map_parse' }): string;
    setValue(fieldId: 'custrecord_hck_edi_map_parse', value: string): this;
    setValue(options: { fieldId: 'custrecord_hck_edi_map_parse', value: string } & Extras): this;
}