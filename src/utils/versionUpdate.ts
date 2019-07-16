import semver from "semver";

export type VersionUpgrade = "patch" | "minor" | "major";
const versions = ["patch", "minor", "major"];
const versionUpdate = (version: string, upgrade: VersionUpgrade) => {
	const correct = versions.includes(version) ? version : "patch";
	return semver.inc(correct, upgrade, { loose: false });
};

export default versionUpdate;
