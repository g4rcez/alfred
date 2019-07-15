import versionUpdate, { VersionUpgrade } from "../utils/versionUpdate";
import { getPackageJson } from "../utils/files";
export default function Version(mode: VersionUpgrade = "patch") {
	const { version } = JSON.parse(getPackageJson());
	console.log(versionUpdate(version, mode));
	return versionUpdate(version, mode);
}
