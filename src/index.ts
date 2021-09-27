import chalk from "chalk";
import Enquirer from "enquirer";
import { join } from "path";
import { PATHS } from "./constants";
import { exists } from "./filesystem/exists";
import { config } from "./utils/config";
import { delay } from "./utils/delay";
import { load } from "./utils/loader";
import { setup } from "./utils/setup";

export default async function uwupet() {
    if (!(await exists(join(PATHS.DATA_DIRECTORY)))) await setup();

    process.on("exit", () => {
        console.log(chalk.dim(`Come back soon! (^ _ ^)/`));
    });

    process.on("unhandledRejection", (error) => {
        if (!error) return;

        return console.error(error);
    });

    console.log(chalk.yellow(`Reading data...`));

    await delay(Math.random() * 100 + 200);

    const data = await config();

    const commands = await load();

    console.clear();

    (async function repl(): Promise<void> {
        const input = (
            await new Enquirer<{ ["​"]: string }>().prompt({
                type: "input",
                message: "",
                name: "​",
                validate(string) {
                    return (
                        [...commands.keys(), ...[...commands.entries()].flatMap(([, { aliases }]) => aliases)].includes(string.split(/\s+/)[0].toLowerCase()) ||
                        string.trim().length === 0
                    );
                },
            })
        )["​"];

        if (input.trim().length) {
            const [name, ...args] = input.split(/\s+/);

            const command = (commands.get(name) ?? [...commands.entries()].find(([, { aliases }]) => aliases.includes(name))?.[1])!;

            await command.callback(args, { data });
        }

        return repl();
    })();
}
