(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "N/file"], factory);
    }
})(function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loadTemplate = void 0;
    var file_1 = require("N/file");
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
    var loadTemplate = function (id) {
        var template = '';
        try {
            template = (0, file_1.load)({ id: id }).getContents();
        }
        catch (e) {
            template = '';
        }
        return template;
    };
    exports.loadTemplate = loadTemplate;
});
