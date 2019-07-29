import fs from "fs";
import { join } from "path";

const { readFileSync: read, writeFileSync: write } = fs;

const pathJson = () => join(process.cwd(), "package.json");

export const getPackageJson = () => read(pathJson(), "utf-8").toString();

export const setPackageJson = (data: string) => setFile(pathJson(), data);

export const setFile = (path: string, data: Object) => write(path, JSON.stringify(data, null, 4), "utf-8");
