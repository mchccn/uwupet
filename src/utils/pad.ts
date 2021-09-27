import chalk from "chalk";

export function pad(string: string, seperator = chalk.dim(`›`)) {
    return string
        .split("\n")
        .map((line) => `   ${seperator} ${line}`)
        .join("\n");
}
