#!/usr/bin/node
import cli from "commander";
import Version from "./commands/Version";
import Tags from "./commands/Tags";
import Prettier from "./commands/Prettier";

const program = new cli.Command();

program
	.version("0.0.1")
	.allowUnknownOption(false)
	.description("Util package for git actions on your repositories")
	.usage("upgrade | tags")
	.name("alfred");

program
	.command("upgrade")
	.alias("u")
	.description("Update version of program and git tag version")
	.option("-u, --update <release>", "Get the new version based on patch | minor | major", "patch")
	.option("-m, --msg <message>", "Message on commit")
	.option("-n, --nolastcommit <boolean>", "Commit with last commit message", false)
	.action(Version);

program
	.command("tag")
	.alias("tags")
	.alias("t")
	.description("Get sorted versions of tags by semantic version rules")
	.action(Tags);

program
	.command("prettier")
	.alias("pretty")
	.alias("p")
	.description("Create a prettier script for your project or apply exist prettier script")
	.action(Prettier);

if (process.argv.length === 2) {
	program.help();
	process.exit(1);
}

program.parse(process.argv);
