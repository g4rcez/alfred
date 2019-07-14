"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ora_1 = __importDefault(require("ora"));
function Spinner(text, color) {
    if (color === void 0) { color = "magenta"; }
    var spinner = ora_1.default(text).start();
    spinner.spinner = "pong";
    spinner.text = text;
    spinner.color = color;
    return spinner;
}
exports.default = Spinner;
