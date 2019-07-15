import path from "path";
import fs from "fs";
export const getPackageJson = () => fs.readFileSync(path.join(process.cwd(), "package.json"), "utf-8").toString();
