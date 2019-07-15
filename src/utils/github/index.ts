import $ from "../shell";

const add = async () => await $("git add .");

const countStash = async () => {
	try {
		const stdout = await $("git status --porcelain");
		return stdout;
	} catch (error) {
		return [false, ""];
	}
};

const commit = async (msg: string) => await $(`git commit -m "${msg}"`);

const tag = async (version: string, prefixOnCommit = "v") => await $(`git tag ${prefixOnCommit}${version}`);

const push = async (target: string) => await $(`git push origin ${target}`);

export default { add, tag, countStash, commit, push };
