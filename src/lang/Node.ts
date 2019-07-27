import { getPackageJson, setPackageJson } from "../utils/files";
import Git from "../utils/github";
import versionUpdate from "../utils/versionUpdate";
import Language from "./Language";

export default class Node implements Language {
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
		return "Pushed to remote " + remote;
	}

	public async upgrade(args: any) {
		try {
			const packageJson = JSON.parse(await this.getConfigFile());
			this.currVersion = await this.getVersion();
			this.newVersion = versionUpdate(this.currVersion, args.mode) as string;
			const tagVersion = `v${this.newVersion}`;
			await setPackageJson(
				JSON.stringify({ ...packageJson, version: this.newVersion }, null, 4)
			);
			return {
				success: true,
				tag: tagVersion,
				newVersion: this.newVersion,
				previousVersion: this.currVersion
			};
		} catch (error) {
			return {
				tag: "",
				success: false,
				newVersion: this.newVersion,
				previousVersion: this.currVersion
			};
		}
	}

	private currVersion: string = "";

	private newVersion: string = "";

	public async onAdd(): Promise<string> {
		await Git.add();
		return "Add package.json";
	}

	public async getVersion(): Promise<string> {
		const pkg = await this.getConfigFile();
		return JSON.parse(pkg).version;
	}

	public async getConfigFile(): Promise<string> {
		return await getPackageJson();
	}

	public async checkGitRepo(): Promise<boolean> {
		return Git.isGitRepo();
	}
}
