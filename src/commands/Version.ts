import versionUpdate, { VersionUpgrade } from "../utils/versionUpdate";
import { getPackageJson, setPackageJson } from "../utils/files";
import Git from "../utils/github";
export default async function Version(args: any) {
	const mode = args.update;
	const msg = args.msg;
	try {
		const e: any = await Git.countStash();
		const content = e[1];
		if (content === "") {
			const packageJson = JSON.parse(getPackageJson());
			const newVersion = versionUpdate(packageJson.version, mode) as string;
			setPackageJson(JSON.stringify({ ...packageJson, version: newVersion }, null, 1));
			const tagVersion = `v${newVersion}`;
			const message = !!msg ? `${msg} - ${newVersion}` : `Update to: ${tagVersion}`;
			if (Git.isGitRepo) {
				await Git.add();
				await Git.commit(message);
				await Git.tag(tagVersion);
				await Git.push(tagVersion);
			}
		} else {
			console.log("Commita os arquivos aí");
		}
	} catch (error) {}
}
