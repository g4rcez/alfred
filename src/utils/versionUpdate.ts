import semver from "semver";

export type VersionUpgrade = "patch" | "minor" | "major";
const versions = ["patch", "minor", "major"];
const versionUpdate = (version: string, upgrade: VersionUpgrade) => {
	const correct = versions.includes(version) ? version : "patch";
	const v = semver.inc(correct, upgrade, { loose: false });
	console.log("VERSION CORRECT V", version, correct, v);
	return v;
};

export default versionUpdate;
