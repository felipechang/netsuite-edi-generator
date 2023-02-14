import {EnumMapAlign} from "./enum";

/**
 * Module file
 *
 * WARNING:
 * TypeScript generated file, do not edit directly
 * source files are located in the repository
 *
 * @project: EDI Generator
 * @description: Transforms EDI values into a formatted string
 *
 * @copyright 01/11/2023 Hardcake
 * @author Felipe Chang felipechang@hardcake.org
 *
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 */

/** Add blanks to string */
const blanks = (g: number, c: string): string => {
    let r = '';
    for (let i = 0; i < g; i++) r += c || ' ';
    return r;
}

/** Shift text position */
const shiftPosition = (input: string, map: IEdiMapValues) => {
    if (input.length >= map.size) return input;
    switch (map.align) {
        case EnumMapAlign.LEFT:
            return input + blanks(map.size - input.length, map.fillChar);
        case EnumMapAlign.RIGHT:
            return blanks(map.size - input.length, map.fillChar) + input;
        default:
            const size1 = Math.floor((map.size - input.length) / 2);
            const size2 = Math.ceil((map.size - input.length) / 2);
            return blanks(size1, map.fillChar) + input + blanks(size2, map.fillChar);
    }
}

/** Transform value according to configuration */
export const transformMap = (input: IEdiMapInputValue, map: IEdiMapValues): string => {
    if (!input && input !== 0) input = map.default || '';
    input = input.toString();
    input = map.parse(input);
    if (map.dict && map.dict[input]) {
        input = map.dict[input];
    }
    input = shiftPosition(input, map);
    return input.substring(0, map.size);
}