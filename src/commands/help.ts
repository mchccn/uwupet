import { Command } from "../types";
import { load } from "../utils/loader";

const command: Command = {
    name: "help",
    aliases: ["h", "?", "man", "manual"],
    usage: "[command]",
    category: "utility",
    description: "The ubiquitous help command.",
    details: "Get stuck? Use this command for a full reference!",
    hidden: false,
    async callback([name]) {
        if (!name) {
            const commands = await load();

            const command = commands.get(name);

            return;
        }

        return;
    },
};

export default command;
