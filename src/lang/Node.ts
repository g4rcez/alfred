import Language from "./Language";
import Spinner from "../styles/spinner";
import { getPackageJson, setPackageJson } from "../utils/files";
import versionUpdate from "../utils/versionUpdate";
import Git from "../utils/github";
import colors from "../styles/colors";

export default class Node implements Language {
	public async run(args: any) {
		const mode = args.update || "patch";
		const msg = args.msg;
		const spin = Spinner("Doing some stuff");
		spin.start();
		try {
			const e: any = await Git.countStash();
			if (e[1] === "") {
				const packageJson = JSON.parse(getPackageJson());
				const newVersion = versionUpdate(packageJson.version, mode) as string;
				setPackageJson(JSON.stringify({ ...packageJson, version: newVersion }, null, 4));
				const tagVersion = `v${newVersion}`;
				const message = !!msg ? `${msg} - ${newVersion}` : `Update to: ${tagVersion}`;
				if (Git.isGitRepo()) {
					spin.text = `${colors.warn("Upgrade")} Upgrade from ${packageJson.version} to ${newVersion}`;
					await Git.add();
					spin.text = `${colors.success("Add")} Add Package.json`;
					await Git.commit(message);
					spin.text = `${colors.success("Commit")} ${message}`;
					await Git.tag(tagVersion);
					spin.text = `${colors.success("Commit & Tag")} ${message} - [${tagVersion}]`;
					await Git.push(tagVersion);
					spin.stop();
					console.log("\n", colors.success("Done"));
					return;
				}
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
