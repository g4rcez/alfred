import Language from "./Language";
import Spinner from "../styles/spinner";
import { getPackageJson, setPackageJson } from "../utils/files";
import versionUpdate from "../utils/versionUpdate";
import Git from "../utils/github";
import colors from "../styles/colors";

export default class Node implements Language {
	public async checkGitRepo(): Promise<boolean> {
		return true;
	}
	public async run(args: any) {
		const mode = args.update || "patch";
		const { msg, nolastcommit } = args;
		const spin = Spinner("Doing some stuff");
		spin.start();
		try {
			const e: any = await Git.countStash();
			if (e[1] === "") {
				const packageJson = JSON.parse(getPackageJson());
				const currVersion = packageJson.version;
				const newVersion = versionUpdate(currVersion, mode) as string;
				const tagVersion = `v${newVersion}`;
				setPackageJson(JSON.stringify({ ...packageJson, version: newVersion }, null, 4));
				const lastCommit = await Git.getLastCommit();
				const useLastCommit = nolastcommit ? `${lastCommit}: ${tagVersion}` : `${tagVersion}`;
				const message = !!msg ? `${msg} - ${newVersion}` : useLastCommit;
				spin.text = `${colors.warn("Upgrade")} Upgrade from ${currVersion} to ${newVersion}`;
				Git.addCommitTagPush({
					onAdd: () => {
						spin.text = `${colors.success("Add")} Add Package.json`;
					},
					onCommit: {
						callback: () => {
							spin.text = `${colors.success("Commit")} ${message}`;
						},
						msg: message
					},
					onPush: {
						callback: () => {
							spin.stop();
							console.log("\n", colors.success("Done"));
						},
						msg: tagVersion
					},
					onTag: {
						callback: () => {
							spin.text = `${colors.success("Commit & Tag")} ${message} - [${tagVersion}]`;
						},
						msg: tagVersion
					}
				});
				return;
			} else {
				spin.stop();
				console.log(colors.danger("WARN"), "Commit the stashed files");
				return;
			}
		} catch (error) {
			console.log(colors.danger("ERRO"), error);
		}
	}
}
