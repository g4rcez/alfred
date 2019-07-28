import { VersionUpgrade } from "../utils/versionUpdate";
import path from "path";
import fs from "fs";
export type VersionArguments = {
	update: VersionUpgrade;
	msg: string;
	noLastCommit: boolean;
};

export default interface Language {
	checkGitRepo(): Promise<boolean>;
	getVersion(): Promise<string>;
	getConfigFile(): Promise<string>;
	upgrade(
		args: VersionArguments
	): Promise<{
		tag: string;
		success: boolean;
		newVersion: string;
		previousVersion: string;
	}>;
	onAdd(): Promise<string>;
	onCommit(msg: string): Promise<string>;
	onTag(tag: string): Promise<string>;
	onPush(remote: string): Promise<string>;
}

const e = fs.existsSync;

export const findLangProject = () => {
	const currDir = process.cwd();
	if (e(path.join(currDir, "package.json"))) {
		return "node";
	}
	return "";
};
