import chalk from "chalk";
import { CATEGORIES } from "../constants";
import { Command } from "../types";
import { load } from "../utils/loader";
import { pad } from "../utils/pad";

const command: Command = {
    name: "help",
    aliases: ["h", "?", "man", "manual"],
    usage: "[command]",
    category: "utility",
    description: "The ubiquitous help command.",
    details: "Get stuck? Use this command for a full reference!\nUse 'help [command]' to receive more information about a command.",
    hidden: false,
    async callback([name]) {
        const commands = await load();

        if (name) {
            const command = commands.get(name);

            if (!command) return console.log(chalk.redBright(`   › That command doesn't exist!`));

            return console.log(
                pad(`\

${chalk.bold.dim.green(command.category)}
${chalk.bold.cyan(command.name)} ${chalk.dim.cyanBright(command.usage)}
${chalk.dim.white(command.description)}
${chalk.white(command.details)}
${chalk.dim.green(command.aliases.sort().join(", "))}
\
`)
            );
        }

        const categorized = [...commands.values()].sort((a, b) => CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category));

        return console.log(
            pad(
                `\n` +
                    categorized
                        .map(
                            (command, index, array) =>
                                `${array[index - 1]?.category !== command.category ? `${chalk.bold.green(command.category)}\n` : ""}${chalk.cyan(
                                    command.name
                                )} ${chalk.dim.cyanBright(command.usage)}`
                        )
                        .join("\n") +
                    `\n`
            )
        );
    },
};

export default command;
