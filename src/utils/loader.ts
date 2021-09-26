import { readdir } from "fs/promises";
import { join } from "path";
import { Command } from "../types";

const cached = new Map<string, Command>();

export async function load() {
    if ([...cached.keys()].length) return cached;

    const dir = join(__dirname, "..", "commands");

    const files = await readdir(dir);

    const imported = (await Promise.all(files.map((file) => import(join(dir, file))))).map((value) => value.default) as Command[];

    const map = new Map(imported.map((command) => [command.name, command]));

    [...map.entries()].map(([name, command]) => cached.set(name, command));

    return map;
}
