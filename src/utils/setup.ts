import chalk from "chalk";
import Enquirer from "enquirer";
import { mkdir, writeFile } from "fs/promises";
import { userInfo } from "os";
import { PATHS } from "../constants";
import { exists } from "../filesystem/exists";
import { ConfigData } from "../types";

export async function setup(corrupted?: boolean) {
    if (!(await exists(PATHS.CONFIG))) await mkdir(PATHS.CONFIG);

    const { setup } = await new Enquirer<{ setup: boolean }>().prompt({
        type: "confirm",
        message: corrupted
            ? "Oh no! Your data was corrupted and lost! Do you want to restart?"
            : "It seems that you do not have uwupet set up. Would you like to?",
        name: "setup",
    });

    if (!setup) {
        console.log(chalk.blue("Ok. ● ︿ ●"));

        return process.exit();
    }

    const { username } = await new Enquirer<{ username: string }>().prompt({
        type: "input",
        message: "Enter your username:",
        name: "username",
        initial: userInfo().username,
    });

    const { name } = await new Enquirer<{ name: string }>().prompt({
        type: "input",
        message: "Enter your pet's name:",
        name: "name",
    });

    const upgrades = (await import(PATHS.UPGRADES_JSON)) as ConfigData["upgrades"];

    const config: ConfigData = {
        user: {
            username,
            copper: 0,
            iron: 0,
            gold: 0,
            diamonds: 0,
            emeralds: 0,
            boosters: [],
            inventory: [{ item: "food", rarity: "common" }],
        },
        upgrades,
        pet: {
            name,
            health: 1,
            energy: 1,
            level: 0,
            exp: 0,
        },
    };

    await mkdir(PATHS.DATA_DIRECTORY);

    await writeFile(PATHS.DATA_FILE, JSON.stringify(config));

    return console.log(chalk.green(`Hello ${username}! Welcome to uwupet${corrupted ? " again" : ""}, and make sure to take care of ${name}!`));
}
