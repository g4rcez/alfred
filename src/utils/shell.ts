import { exec } from "child_process";

const $ = (command: string): Promise<[boolean, string]> =>
	new Promise((res, rej) =>
		exec(command, (err, stdout, stderr) => {
			if (err) {
				console.log(stderr, stdout);
				return rej([false, stderr]);
			}
			return res([true, stdout]);
		})
	);

export default $;
