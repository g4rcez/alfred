"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var versionUpdate_1 = __importDefault(require("../utils/versionUpdate"));
var files_1 = require("../utils/files");
var github_1 = __importDefault(require("../utils/github"));
function Version(mode) {
    if (mode === void 0) { mode = "patch"; }
    return github_1.default.countStash().then(function (e) {
        var content = e[1];
        if (content === "") {
            var packageJson = JSON.parse(files_1.getPackageJson());
            var newVersion = versionUpdate_1.default(packageJson.version, mode);
            files_1.setPackageJson(JSON.stringify(__assign({}, packageJson, { version: newVersion }), null, 1));
            var message = "Update to version: " + newVersion;
            Promise.all([github_1.default.add(), github_1.default.commit(message), github_1.default.tag(newVersion, "v"), github_1.default.push(newVersion)]);
        }
        console.log("Commita os arquivos aí");
    });
}
exports.default = Version;
