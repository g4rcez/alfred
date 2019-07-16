import Node from "../lang/Node";
import Language, { findLangProject } from "../lang/Language";

const lang: { [key: string]: () => Language } = {
	node: () => new Node()
};

export default async function Version(args: any) {
	const languageUse = findLangProject();
	const execLang = lang[languageUse]();
	await execLang.run(args);
}
