import {load} from "N/file";

/**
 * Module file
 *
 * WARNING:
 * TypeScript generated file, do not edit directly
 * source files are located in the repository
 *
 * @project: EDI Generator
 * @description: Manages the template file loading
 *
 * @copyright 01/11/2023 Hardcake
 * @author Felipe Chang felipechang@hardcake.org
 *
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 */

/** Attempt to load template contents */
export const loadTemplate = (id: string): string => {
    let template = '';
    try {
        template = load({id}).getContents();
    } catch (e) {
        template = '';
    }
    return template;
}

