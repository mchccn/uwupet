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
