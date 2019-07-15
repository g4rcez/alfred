import versionUpdate, { VersionUpgrade } from "../utils/versionUpdate";
import { getPackageJson } from "../utils/files";
import Git from "../utils/github";
export default function Version(mode: VersionUpgrade = "patch") {
	const { version } = JSON.parse(getPackageJson());
	console.log(versionUpdate(version, mode));
	Git.countStash().then((e) => {
		console.log(e);
		return versionUpdate(version, mode);
	});
}
