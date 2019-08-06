import fs from "fs";
import { join } from "path";

const { readFileSync: read, writeFileSync: write } = fs;

export const pathPackageJson = () => join(process.cwd(), "package.json");

export const getPackageJson = () => read(pathPackageJson(), "utf-8").toString();

export const setPackageJson = (data: Object) => setFile(pathPackageJson(), data);

export const setFile = (path: string, data: Object) => write(path, JSON.stringify(data, null, 4), "utf-8");
