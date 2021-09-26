import { mkdir } from "fs/promises";
import { join } from "path";
import { PATHS } from "./constants";
import { exists } from "./filesystem/exists";
import Enquirer from "enquirer"
import chalk from "chalk";

(async () => {
    if (!(await exists(join(PATHS.DATA_DIRECTORY)))) {
        if (!(await exists(PATHS.CONFIG))) {
            await mkdir(PATHS.CONFIG);
        }

        await mkdir(join(PATHS.DATA_DIRECTORY));

        console.log(chalk.blue(`It appears that you have not setup uwuwpet yet, would you like to?`));
    }
})().catch(console.error)
