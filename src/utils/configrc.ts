import fs from "fs";
import path from "path";
import os from "os";

// ToDo: write a parser to get configurations from file
/*
    Pattern of config file
    [email] awesomeemail@gmail.com:$3cr379455w0rd



*/
const getHome = () => path.resolve(os.homedir());
const getConfigFile = () => path.join(getHome(), ".awesomeclirc");

const parse = () => {
	const rcFile = fs.readFileSync(getConfigFile());
};

export default { getHome, getConfigFile };
