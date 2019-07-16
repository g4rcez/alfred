import versionUpdate, { VersionUpgrade } from "../utils/versionUpdate";
import { getPackageJson, setPackageJson } from "../utils/files";
import Git from "../utils/github";
import colors from "../styles/colors";
import Spinner from "../styles/spinner";
import { setTimeout } from "timers";
export default async function Version(args: any) {
	const mode = args.update || "patch";
	const msg = args.msg;
	const spin = Spinner("Doing some stuff");
	spin.start();
	setTimeout(async () => {
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
					spin.text = `${colors.success("Tag")} GenerateTag: ${tagVersion}`;
					await Git.push(tagVersion);
					console.log(colors.success("Done"));
				}
			} else {
				console.log(colors.danger("WARN"), "Commit the stashed files");
			}
		} catch (error) {
			console.log(colors.danger("ERRO"), error);
		}
		spin.text = `${colors.danger("WARN")} Commit your stash files`;
		spin.stop();
	}, 5000);
}
