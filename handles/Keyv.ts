import KeyvLib from "keyv";
import KeyvLibMySQL from "@keyv/mysql";

export const Keyv = new KeyvLib({store: new KeyvLibMySQL(process.env.DATABASE)});

Keyv.on("error", console.error);
