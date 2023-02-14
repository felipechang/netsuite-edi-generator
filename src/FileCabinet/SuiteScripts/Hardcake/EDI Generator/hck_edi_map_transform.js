(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./enum"], factory);
    }
})(function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformMap = void 0;
    var enum_1 = require("./enum");
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
    var blanks = function (g, c) {
        var r = '';
        for (var i = 0; i < g; i++)
            r += c || ' ';
        return r;
    };
    var shiftPosition = function (input, map) {
        if (input.length >= map.size)
            return input;
        switch (map.align) {
            case enum_1.EnumMapAlign.LEFT:
                return input + blanks(map.size - input.length, map.fillChar);
            case enum_1.EnumMapAlign.RIGHT:
                return blanks(map.size - input.length, map.fillChar) + input;
            default:
                var size1 = Math.floor((map.size - input.length) / 2);
                var size2 = Math.ceil((map.size - input.length) / 2);
                return blanks(size1, map.fillChar) + input + blanks(size2, map.fillChar);
        }
    };
    var transformMap = function (input, map) {
        if (!input && input !== 0)
            input = map.default || '';
        input = input.toString();
        input = map.parse(input);
        if (map.dict && map.dict[input]) {
            input = map.dict[input];
        }
        input = shiftPosition(input, map);
        return input.substring(0, map.size);
    };
    exports.transformMap = transformMap;
});
