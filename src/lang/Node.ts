import { getPackageJson, setPackageJson, pathPackageJson } from "../utils/files";
import Git from "../utils/github";
import versionUpdate from "../utils/versionUpdate";
import Language from "./Language";
import log from "signale";
import $ from "../utils/shell";
export default class Node implements Language {
	public static pathConfigFile = pathPackageJson();
	private currVersion: string = "";
	private newVersion: string = "";

	public async onAdd(): Promise<string> {
		await Git.add();
		return "Add package.json";
	}

	public async getVersion(): Promise<string> {
		const pkg = await this.getConfigFile();
		const json = JSON.parse(pkg);
		return json.version;
	}

	public async getConfigFile(): Promise<string> {
		return await getPackageJson();
	}

	public async checkGitRepository(): Promise<boolean> {
		return Git.isGitRepository();
	}
	public async onCommit(msg: string): Promise<string> {
		await Git.commit(msg);
		return msg;
	}

	public async onTag(tag: string): Promise<string> {
		await Git.tag(tag);
		return tag;
	}

	public async onPush(remote: string): Promise<string> {
		await Git.push(remote);
		return `Pushed to remote ${remote}`;
	}

	public async upgrade(args: any) {
		try {
			const mode = args.update;
			this.currVersion = await this.getVersion();
			this.newVersion = versionUpdate(this.currVersion, mode) as string;
			const tagVersion = `v${this.newVersion}`;
			const success = await $(`npm version ${mode}`);
			if (success[0]) {
				return {
					autoGenerateTag: true,
					success: true,
					tag: tagVersion,
					newVersion: this.newVersion,
					previousVersion: this.currVersion
				};
			}
		} catch (error) {
			log.fatal(error);
		}
		return {
			autoGenerateTag: false,
			tag: "",
			success: false,
			newVersion: this.newVersion,
			previousVersion: this.currVersion
		};
	}
}
