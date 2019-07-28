import path from "path";
import fs from "fs";

const pathJson = () => path.join(process.cwd(), "package.json");

export const getPackageJson = () => fs.readFileSync(pathJson(), "utf-8").toString();

export const setPackageJson = (data: string) => fs.writeFileSync(pathJson(), data, "utf-8");
