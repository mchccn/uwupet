import chalk from "chalk";
import { readdir, readFile } from "fs/promises";
import { join, sep } from "path";
import { PATHS } from "../constants";
import { ConfigData } from "../types";
import { setup } from "./setup";

export async function config(): Promise<ConfigData> {
    const raw = await readFile(PATHS.DATA_FILE, "utf8");

    try {
        const data = JSON.parse(raw);

        return data;
    } catch {
        console.log(chalk.red(`Corrupted data, reading backups...`));

        const backup = (await readdir(PATHS.BACKUPS, "utf8")).sort(
            (a, b) => Number(b.split(sep).reverse()[0].split(".")[0]) - Number(a.split(sep).reverse()[0].split(".")[0])
        )[0];

        if (!backup) {
            console.log(chalk.red(`No backups found!`));

            await setup(true);

            try {
                return JSON.parse(await readFile(PATHS.DATA_FILE, "utf8"));
            } catch {
                console.log(chalk.red(`Fatal: data could not be read.`));

                return process.exit(1);
            }
        }

        try {
            return JSON.parse(await readFile(join(PATHS.BACKUPS, backup), "utf8"));
        } catch {
            console.log(chalk.red(`Fatal: data could not be read.`));

            return process.exit(1);
        }
    }
}
