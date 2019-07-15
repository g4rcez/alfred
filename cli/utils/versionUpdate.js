"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var semver_1 = __importDefault(require("semver"));
var versionUpdate = function (version, upgrade) { return semver_1.default.inc(version, upgrade, { loose: false }); };
exports.default = versionUpdate;
