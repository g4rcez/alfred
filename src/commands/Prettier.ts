import { getPackageJson, setPackageJson, setFile } from "../utils/files";
import $ from "../utils/shell";
import path from "path";
//@ts-ignore
import prettierrc from "../assets/.prettierrc.json";

const formatString = `prettier --write \"{.,src/**}/*.{js,jsx,ts,tsx}\"`;
const scriptString = "prettier";

export default async function Prettier() {
	const pkg = JSON.parse(await getPackageJson());
	const { scripts, devDependencies } = pkg;
	if (scripts.hasOwnProperty(scriptString)) {
		try {
			if (!devDependencies.hasOwnProperty("prettier")) {
				await $("npm i prettier --save-dev");
			}
			await $("npm run prettier");
		} catch (error) {
			console.log(error);
		}
	} else {
		const newScripts = { ...scripts, [scriptString]: formatString };
		await setPackageJson({ ...pkg, scripts: newScripts });
		await setFile(path.join(process.cwd(), ".prettierrc"), prettierrc);
	}
}
