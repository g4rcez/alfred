import semver from "semver";

export type VersionUpgrade = "patch" | "minor" | "major";
const versions: VersionUpgrade[] = ["patch", "minor", "major"];

const versionUpdate = (version: string, upgrade: VersionUpgrade) => {
	if (semver.valid(version)) {
		const correct = versions.includes(upgrade.toUpperCase() as VersionUpgrade) ? upgrade : "patch";
		return semver.inc(version, correct as VersionUpgrade, { loose: false });
	}
	return "0.0.0";
};

export default versionUpdate;
