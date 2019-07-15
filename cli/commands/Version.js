"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var versionUpdate_1 = __importDefault(require("../utils/versionUpdate"));
var files_1 = require("../utils/files");
function Version(mode) {
    if (mode === void 0) { mode = "patch"; }
    var version = JSON.parse(files_1.getPackageJson()).version;
    console.log(versionUpdate_1.default(version, mode));
    return versionUpdate_1.default(version, mode);
}
exports.default = Version;
