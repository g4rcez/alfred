import { homedir } from "os";
import path from "path";
//@ts-ignore
import GitHub from "github-api";

const configFile = ".snookerrc";

export const configFileFullPath = path.join(homedir(), configFile);

export const auth = () => new GitHub();
