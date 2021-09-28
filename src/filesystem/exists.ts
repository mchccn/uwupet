import { access } from "fs/promises";

export async function exists(path: string) {
    return access(path)
        .then(() => true)
        .catch(() => false);
}
