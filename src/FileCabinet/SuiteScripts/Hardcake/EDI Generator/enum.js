(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EnumMapAlign = void 0;
    var EnumMapAlign;
    (function (EnumMapAlign) {
        EnumMapAlign[EnumMapAlign["LEFT"] = 0] = "LEFT";
        EnumMapAlign[EnumMapAlign["RIGHT"] = 1] = "RIGHT";
        EnumMapAlign[EnumMapAlign["CENTER"] = 2] = "CENTER";
    })(EnumMapAlign = exports.EnumMapAlign || (exports.EnumMapAlign = {}));
});
