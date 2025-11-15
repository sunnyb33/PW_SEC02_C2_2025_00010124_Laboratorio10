import bycript from "bcrypt"
import { HASH_COMPLEXITY } from "../../keys/keys.js"

export const generateHash = async (password) => {
    const passwordOriginal = password;
    const saltRounds = HASH_COMPLEXITY;

    const hash = await bycript.hash(passwordOriginal, saltRounds);
    return hash;
}