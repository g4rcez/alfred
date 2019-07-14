import cli from "commander";
import Github from "./commands/Github";

const program = new cli.Command();
program.version("0.0.1");
program.command("git <user> [fields]").action(Github);

program.parse(process.argv);