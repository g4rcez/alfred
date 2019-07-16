import $ from "../shell";
import fs from "fs";
import path from "path";

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

const tag = async (version: string) => await $(`git tag ${version}`);

const push = async (target: string) => await $(`git push origin ${target}`);

const isGitRepo = () => fs.existsSync(path.join(process.cwd(), ".git"));

export default { add, tag, countStash, commit, push, isGitRepo };
