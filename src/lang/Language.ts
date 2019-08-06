import fs from "fs";
import { VersionUpgrade } from "../utils/versionUpdate";
import Node from "./Node";

export type VersionArguments = {
	update: VersionUpgrade;
	msg: string;
	noLastCommit: boolean;
};

export type UpgradeReturn = {
	tag: string;
	success: boolean;
	newVersion: string;
	previousVersion: string;
};

export default interface Language {
	onAdd(): Promise<string>;
	getVersion(): Promise<string>;
	getConfigFile(): Promise<string>;
	onTag(tag: string): Promise<string>;
	checkGitRepository(): Promise<boolean>;
	onCommit(msg: string): Promise<string>;
	onPush(remote: string): Promise<string>;
	upgrade(args: VersionArguments): Promise<UpgradeReturn>;
}

const e = fs.existsSync;

export const findLangProject = () => {
	const currDir = process.cwd();
	if (Node.pathConfigFile) {
		return "node";
	}
	return "default";
};
