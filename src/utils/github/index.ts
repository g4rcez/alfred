import $ from "../shell";
import fs from "fs";
import path from "path";

const add = async () => await $("git add .");

const countStash = async () => {
	try {
		return await $("git status --porcelain");
	} catch (error) {
		return [false, error];
	}
};

const commit = async (msg: string) => {
	try {
		const ok = await $(`git commit -m '${msg}'`);
		return [true, "Just push"];
	} catch (error) {
		return [false, error];
	}
};

const tag = async (version: string) => await $(`git tag ${version}`);

const push = async (target: string) => await $(`git push origin ${target}`);

const isGitRepository = () => fs.existsSync(path.join(process.cwd(), ".git"));

const getLastCommit = () => $("git log -1 --pretty=%B");

const remoteUrl = () => $("git config --get remote.origin.url");

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

export default {
	add,
	tag,
	countStash,
	commit,
	push,
	isGitRepository,
	getLastCommit,
	addCommitTagPush,
	remoteUrl
};
