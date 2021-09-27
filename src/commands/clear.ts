import { Command } from "../types";

const command: Command = {
    name: "clear",
    aliases: ["clean", "purge"],
    usage: "",
    category: "utility",
    description: "Clears the terminal.",
    details: "If you need to clean up the screen, use this command!",
    hidden: false,
    async callback() {
        return console.clear();
    },
};

export default command;
