/**
 * Type declaration file
 *
 * WARNING:
 * TypeScript generated file, do not edit directly
 * source files are located in the repository
 *
 * @project: EDI Generator
 * @description: Input types for EDI Generator
 *
 * @copyright 01/11/2023 Hardcake
 * @author Felipe Chang felipechang@hardcake.org
 *
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 */

type IEdiMapInputValue = string | number | null;

interface IEdiMapInputValues {
    [key: string]: IEdiMapInputValue;
}

interface IEdiMapInput {
    template: string;
    separator: string;
    group: string;
    values: IEdiMapInputValues;
    lines: IEdiMapInputValues[];
}

interface IEdiMap {
    [key: string]: IEdiMapValues;
}

interface IEdiMapValues {
    dict: { [key: string]: string };
    size: number;
    align: number;
    fillChar: string;
    default: string;
    parse: (value: string) => string;
}