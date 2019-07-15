import versionUpdate, { VersionUpgrade } from "../utils/versionUpdate";
import { getPackageJson, setPackageJson } from "../utils/files";
import Git from "../utils/github";
export default async function Version(mode: VersionUpgrade = "patch") {
	try {
		const e: any = await Git.countStash();
		const content = e[1];
		if (content === "") {
			const packageJson = JSON.parse(getPackageJson());
			const newVersion = versionUpdate(packageJson.version, mode) as string;
			setPackageJson(JSON.stringify({ ...packageJson, version: newVersion }, null, 1));
			const message = `Update to version: ${newVersion}`;
			await Git.add();
			await Git.commit(message);
			await Git.tag(newVersion, "v");
			await Git.push(newVersion);
		} else {
			console.log("Commita os arquivos aí");
		}
	} catch (error) {}
}
