import versionUpdate, { VersionUpgrade } from "../utils/versionUpdate";
import { getPackageJson, setPackageJson } from "../utils/files";
import Git from "../utils/github";
export default function Version(mode: VersionUpgrade = "patch") {
	return Git.countStash().then((e: any) => {
		const content = e[1];
		if (content === "") {
			const packageJson = JSON.parse(getPackageJson());
			const newVersion = versionUpdate(packageJson.version, mode) as string;
			setPackageJson(JSON.stringify({ ...packageJson, version: newVersion }, null, 1));
			const message = `Update to version: ${newVersion}`;
			Promise.all([Git.add(), Git.commit(message), Git.tag(newVersion, "v"), Git.push(newVersion)])
				.then((e) => console.log(e))
				.catch((e) => console.log("ERROR", e));
		}
		console.log("Commita os arquivos aí");
	});
}
