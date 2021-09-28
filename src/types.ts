import { CATEGORIES } from "./constants";

export type JSONType =
    | string
    | number
    | boolean
    | null
    | JSONType[]
    | {
          [key: string]: JSONType;
      };

type BoosterType = "exp" | "coins" | "luck";

type ItemType = "food";

type ItemRarity = "common" | "uncommon" | "rare" | "epic" | "mythic" | "legendary";

type UserUpgrade = {
    name: string;
    description: string;
    cost: `${number}${"c" | "i" | "g" | "d" | "e"}`;
    level: number;
    requirement: number;
};

export type ConfigData = {
    user: {
        username: string;
        copper: number;
        iron: number;
        gold: number;
        diamonds: number;
        emeralds: number;
        boosters: {
            booster: BoosterType;
            duration: number;
        }[];
        inventory: {
            item: ItemType;
            rarity: ItemRarity;
        }[];
    };
    upgrades: {
        forge: {
            copper: UserUpgrade;
            iron: UserUpgrade;
            gold: UserUpgrade;
            diamonds: UserUpgrade;
            emeralds: UserUpgrade;
        };
        pet: {
            health: {
                booster: UserUpgrade;
                regeneration: UserUpgrade;
            };
            energy: {
                stamina: UserUpgrade;
                rejuvenation: UserUpgrade;
            };
            leveling: {
                experience: UserUpgrade;
                rewards: UserUpgrade;
            };
        };
    };
    pet: {
        name: string;
        health: number;
        energy: number;
        level: number;
        exp: number;
    };
};

export interface Command {
    name: string;
    aliases: string[];
    category: typeof CATEGORIES[number];
    usage: string;
    description: string;
    details: string;
    hidden: boolean;
    callback(args: string[], ctx: { data: ConfigData }): Promise<unknown> | unknown;
}
