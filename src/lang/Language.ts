import { VersionUpgrade } from "../utils/versionUpdate";
import path from "path";
import fs from "fs";
export type VersionArguments = {
	update: VersionUpgrade;
	msg: string;
	noLastCommit: boolean;
};

export default interface Language {
	run(args: VersionArguments): Promise<void>;
	checkGitRepo(): Promise<boolean>;
}

const e = fs.existsSync;
export const findLangProject = () => {
	const currDir = process.cwd();
	if (e(path.join(currDir, "package.json"))) {
		return "node";
	}
	return "";
};
