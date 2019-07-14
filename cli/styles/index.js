"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
exports.default = {
    light: chalk_1.default.bold.visible,
    warn: chalk_1.default.bold.yellow,
    danger: chalk_1.default.bold.red,
    mark: chalk_1.default.bold.visible.underline
};
