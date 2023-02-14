(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./hck_edi_map_file", "./hck_edi_map_mapping", "./hck_edi_map_transform"], factory);
    }
})(function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onRequest = void 0;
    var hck_edi_map_file_1 = require("./hck_edi_map_file");
    var hck_edi_map_mapping_1 = require("./hck_edi_map_mapping");
    var hck_edi_map_transform_1 = require("./hck_edi_map_transform");
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
    var formatError = function (error) { return JSON.stringify({ error: error, output: '' }); };
    /** onRequest event handler */
    var onRequest = function (context) {
        var _a;
        // Parse input
        if (!context.request.body)
            return context.response.write(formatError('Body is empty'));
        var values = JSON.parse(context.request.body);
        if (!values.group)
            return context.response.write(formatError('Group value missing'));
        if (!values.template)
            return context.response.write(formatError('Template value missing'));
        if (!values.values)
            return context.response.write(formatError('Values object missing'));
        if (!values.lines || values.lines.length === 0)
            return context.response.write(formatError('Lines array missing'));
        var separator = values.separator || '\r';
        // Attempt to load template
        var template = (0, hck_edi_map_file_1.loadTemplate)(values.template);
        if (!template)
            return context.response.write(formatError('Template not found'));
        // Search value group to get mappings
        var mappings = (0, hck_edi_map_mapping_1.getMappings)(values.group);
        if (Object.keys(mappings).length === 0)
            return context.response.write(formatError('No mappings found'));
        // Split template into header, body, and footer
        var header = (_a = template.split(separator), _a[0]), body = _a[1], footer = _a[2];
        // Process values
        for (var key in mappings) {
            if (!values.values.hasOwnProperty(key))
                continue;
            var val = (0, hck_edi_map_transform_1.transformMap)(values.values[key], mappings[key]);
            var keyRegEx = new RegExp("\\$".concat(key, "\\$"), "g");
            header = header.replace(keyRegEx, val);
            body = body.replace(keyRegEx, val);
            footer = footer.replace(keyRegEx, val);
        }
        // Process lines
        var output = [header];
        for (var i = 0; i < values.lines.length; i++) {
            var line = values.lines[i];
            var sBody = body.slice();
            for (var subKey in line) {
                var keyRegEx = new RegExp("\\$".concat(subKey, "\\$"), "g");
                if (!mappings.hasOwnProperty(subKey))
                    continue;
                sBody = sBody.replace(keyRegEx, (0, hck_edi_map_transform_1.transformMap)(line[subKey], mappings[subKey]));
            }
            output.push(sBody);
        }
        output.push(footer);
        // return template
        context.response.write(JSON.stringify({ error: '', output: output.join(separator) }));
    };
    exports.onRequest = onRequest;
});
