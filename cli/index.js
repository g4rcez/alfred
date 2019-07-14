"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var Github_1 = __importDefault(require("./commands/Github"));
var program = new commander_1.default.Command();
program.version("0.0.1");
program.command("git <user> [fields]").action(Github_1.default);
program.parse(process.argv);
