import KeyvLib from "keyv";
import KeyvLibMysql from "@keyv/mysql";

export const Keyv = new KeyvLib("", {store: new KeyvLibMysql(process.env.DATABASE)});

Keyv.on("error", console.error);
