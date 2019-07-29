import ora, { Color } from "ora";

export default function Spinner(text: string, color: Color = "magenta") {
	const spinner = ora(text).start();
	spinner.spinner = "shark";
	spinner.text = text;
	spinner.color = color;
	return spinner;
}
