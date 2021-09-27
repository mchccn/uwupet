import { homedir } from "os";
import { join } from "path";

export const CATEGORIES = ["utility"] as const;

export const PATHS = {
    CONFIG: join(homedir(), ".config"),
    DATA_DIRECTORY: join(homedir(), ".config", "uwupet"),
    DATA_FILE: join(homedir(), ".config", "uwupet", "data.json"),
    BACKUPS: join(homedir(), ".config", "uwupet", "backups"),
    COMMAND_HISTORY: join(homedir(), ".config", "uwupet", "history"),
    HOME: homedir(),
} as const;
