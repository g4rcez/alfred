import Node from "../lang/Node";
import Language, { findLangProject } from "../lang/Language";
import log from "signale";
import Git from "../utils/github";
import { capitalize, readableString, trueTrim } from "sidekicker/lib/strings";
import pipe from "../utils/pipe";

const str = pipe(
	capitalize,
	trueTrim,
	readableString
);

const language: { [key: string]: () => Language } = {
	node: () => new Node()
};

export default async function Version(args: any) {
	const languageUse = findLangProject();
	const lang = language[languageUse]();
	const { msg, nolastcommit } = args;
	if (await lang.checkGitRepo()) {
		const e: any = await Git.countStash();
		if (e[1] === "") {
			const upgrade = await lang.upgrade(args);
			if (upgrade.success) {
				const lastCommit = await Git.getLastCommit();
				const tagUpdate = `[From: ${upgrade.previousVersion}, To: ${
					upgrade.tag
				}]`;
				const useLastCommit = !!!nolastcommit
					? `${lastCommit[1]} ${tagUpdate}`
					: `${msg}: ${tagUpdate}`;
				const outputMessage = str(useLastCommit);
				const addMessage = await lang.onAdd();
				log.info(addMessage);
				console.log(addMessage);
				await lang.onCommit(outputMessage);
				log.success(outputMessage);
				await lang.onTag(upgrade.tag);
				log.info(`New tag: ${upgrade.tag}`);
				const push = await lang.onPush(upgrade.tag);
				log.complete(push);
			} else {
				log.error("Commit your stashed files");
				return;
			}
		}
	}
}
