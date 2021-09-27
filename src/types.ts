export type JSONType =
    | string
    | number
    | boolean
    | null
    | JSONType[]
    | {
          [key: string]: JSONType;
      };

export type ConfigData = {
    user: {
        username: string;
    };
    pet: {
        name: string;
        level: number;
        exp: number;
    };
};

export interface Command {
    name: string;
    aliases: string[];
    category: string;
    usage: string;
    description: string;
    details: string;
    hidden: boolean;
    callback(args: string[]): Promise<unknown> | unknown;
}
