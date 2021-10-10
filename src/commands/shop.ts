import { Command } from "../types";

const command: Command = {
    name: "shop",
    aliases: ["market"],
    usage: "[[page | category] | 'search' <query>]",
    category: "economy",
    description: "View the shop.",
    details: "Scout the shop! Search the shop using page numbers, categories, or a search query!",
    hidden: false,
    async callback(args, { data }) {
        if (!args.length) {
        }

        data;
    },
};

export default command;
