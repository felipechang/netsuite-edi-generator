import {EntryPoints} from 'N/types';
import {loadTemplate} from './hck_edi_map_file';
import {getMappings} from './hck_edi_map_mapping';
import {transformMap} from './hck_edi_map_transform';

/**
 * Suitelet script file
 *
 * WARNING:
 * TypeScript generated file, do not edit directly
 * source files are located in the repository
 *
 * @project: EDI Generator
 * @description: Suitelet receives a configuration object with values and returns EDI formatted text
 *
 * @copyright 01/11/2023 Hardcake
 * @author Felipe Chang felipechang@hardcake.org
 *
 * @NScriptName hck_edi_map_suitelet
 * @NScriptId customscript_hck_edi_map
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 * @NScriptType Suitelet
 */

const formatError = (error: string): string => JSON.stringify({error, output: ''});

/** onRequest event handler */
export let onRequest: EntryPoints.Suitelet.onRequest = (context: EntryPoints.Suitelet.onRequestContext) => {

    // Parse input
    if (!context.request.body) return context.response.write(formatError('Body is empty'));
    const values = JSON.parse(context.request.body) as IEdiMapInput;
    if (!values.group) return context.response.write(formatError('Group value missing'));
    if (!values.template) return context.response.write(formatError('Template value missing'));
    if (!values.values) return context.response.write(formatError('Values object missing'));
    if (!values.lines || values.lines.length === 0) return context.response.write(formatError('Lines array missing'));
    const separator = values.separator || '\r';

    // Attempt to load template
    const template = loadTemplate(values.template);
    if (!template) return context.response.write(formatError('Template not found'));

    // Search value group to get mappings
    const mappings = getMappings(values.group);
    if (Object.keys(mappings).length === 0) return context.response.write(formatError('No mappings found'));

    // Split template into header, body, and footer
    let [header, body, footer] = template.split(separator);

    // Process values
    for (const key in mappings) {
        if (!values.values.hasOwnProperty(key)) continue;
        const val = transformMap(values.values[key], mappings[key]);
        const keyRegEx = new RegExp(`\\$${key}\\$`, "g");
        if(header) header = header.replace(keyRegEx, val);
        if(body) body = body.replace(keyRegEx, val);
        if(footer) footer = footer.replace(keyRegEx, val);
    }

    // Process lines
    let output: string[] = [header];
    for (let i = 0; i < values.lines.length; i++) {
        const line = values.lines[i];
        let sBody = body.slice();
        for (const subKey in line) {
            const keyRegEx = new RegExp(`\\$${subKey}\\$`, "g");
            if (!mappings.hasOwnProperty(subKey)) continue;
            sBody = sBody.replace(keyRegEx, transformMap(line[subKey], mappings[subKey]))
        }
        output.push(sBody);
    }
    if(footer) output.push(footer);

    // return template
    context.response.write(JSON.stringify({error: '', output: output.join(separator)}));
};
