"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
exports.getPackageJson = function () { return fs_1.default.readFileSync(path_1.default.join(process.cwd(), "package.json"), "utf-8").toString(); };
