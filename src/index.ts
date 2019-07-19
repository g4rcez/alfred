#!/usr/bin/env node
import cli from "commander";
import Version from "./commands/Version";
import Tags from "./commands/Tags";
const program = new cli.Command();
program.version("0.0.1");
program
	.command("version")
	.alias("v")
	.description("Update version of package.json and git tag version")
	.option("-u, --update <release>", "Get the new version based on patch | minor | major", "patch")
	.option("-m, --msg <message>", "Message on commit")
	.option("-n, --nolastcommit <boolean>", "Commit with last commit message", false)
	.action(Version);

program
	.command("tags")
	.alias("t")
	.action(Tags);

program.parse(process.argv);
