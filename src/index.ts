import cli from "commander";
import Version from "./commands/Version";

const program = new cli.Command();
program.version("0.0.1");
program
	.command("version [dir]")
	.alias("v")
	.option("-u, --update", "Get the new version based on patch | dev | stable", "dev")
	.action(Version);

program.parse(process.argv);
