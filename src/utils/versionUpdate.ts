import semver from "semver";

export type VersionUpgrade = "patch" | "minor" | "major";

const versionUpdate = (version: string, upgrade: VersionUpgrade) => semver.inc(version, upgrade, { loose: false });

export default versionUpdate;
