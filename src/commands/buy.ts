import { Command } from "../types";

const command: Command = {
    name: "buy",
    aliases: ["purchase"],
    usage: "<item> [count]",
    category: "economy",
    description: "Buy something from the shop.",
    details: "To purchase multiple items at once, supply an item count after the item name.",
    hidden: false,
    async callback(args, { data }) {
        if (!args.length) {
        }

        data;
    },
};

export default command;
