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

const getLastCommit = () => $("git log -1 --pretty=%B");

type TaddCommitTPush = {
	onAdd: () => void;
	onCommit: {
		callback?: () => void;
		msg: string;
	};
	onTag: {
		callback?: () => void;
		msg: string;
	};
	onPush: {
		callback?: () => void;
		msg: string;
	};
};
const addCommitTagPush = async (args: TaddCommitTPush) => {
	await add();
	!!args.onAdd && (await args.onAdd());
	await commit(args.onCommit.msg);
	!!args.onCommit.callback && args.onCommit.callback();
	await tag(args.onTag.msg);
	!!args.onTag.callback && args.onTag.callback();
	await push(args.onPush.msg);
	!!args.onPush.callback && args.onPush.callback();
};

export default { add, tag, countStash, commit, push, isGitRepo, getLastCommit, addCommitTagPush };
