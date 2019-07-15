import { exec } from "child_process";

const $ = (command: string) =>
	new Promise((res, rej) =>
		exec(command, (err, stdout, stderr) => {
			if (err) {
				return rej([false, stderr]);
			}
			return res([true, stdout]);
		})
	);

export default $;
