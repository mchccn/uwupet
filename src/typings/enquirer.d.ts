import "enquirer";

declare module "enquirer" {
    type PromptOptions = Exclude<Parameters<import("enquirer")["prompt"]>[0], Function | any[]> & {
        history?: {
            store?: import("data-store");
            autosave?: boolean;
        };
    };
}
