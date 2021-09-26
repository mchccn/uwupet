import chalk from "chalk";
import Store from "data-store";
import Enquirer, { PromptOptions } from "enquirer";
import { join } from "path";
import { PATHS } from "./constants";
import { exists } from "./filesystem/exists";
import { config } from "./utils/config";
import { delay } from "./utils/delay";
import { setup } from "./utils/setup";

export default async function uwupet() {
    if (!(await exists(join(PATHS.DATA_DIRECTORY)))) await setup();

    process.on("exit", () => {
        console.log(chalk.dim(`Come back soon! (^ _ ^)/`));
    });

    console.log(chalk.yellow(`Reading data...`));

    await delay(Math.random() * 100 + 200);

    const data = await config();

    console.clear();

    const command = (
        await new Enquirer<{ ["​"]: string }>().prompt({
            type: "input",
            message: "",
            name: "​",
            history: {
                store: new Store({ path: join(PATHS.COMMAND_HISTORY, `${data.user.username}.json`) }),
                autosave: true,
            },
        } as PromptOptions)
    )["​"];

    console.log(command);
}
