import semver from "semver";
import $ from "../utils/shell";
export default async function Tags() {
	const [exitCodeCondition, stdout] = await $("git tag");
	const tags = stdout.split("\n").filter(Boolean);
	tags.sort((v1: string, v2: string) => {
		if (semver.valid(v1) && semver.valid(v2)) {
			if (semver.eq(v1, v2)) {
				return 0;
			}
			if (semver.gte(v1, v2)) {
				return 1;
			}
			return -1;
		}
		return -1;
	});
	console.log(tags.join("\n"));
}
