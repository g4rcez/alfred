import semver from "semver";

export type VersionUpgrade = "patch" | "minor" | "major";
const versions: VersionUpgrade[] = ["patch", "minor", "major"];

const versionUpdate = (version: string, upgrade: VersionUpgrade) => {
	if (semver.valid(version)) {
		const correct = versions.includes(upgrade.toUpperCase() as VersionUpgrade) ? upgrade : "patch";
		console.log("UPGRADE TYPE", upgrade, correct);
		return semver.inc(version, correct as VersionUpgrade);
	}
	return "0.0.0";
};

export default versionUpdate;
