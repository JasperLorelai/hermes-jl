import KeyvLib from "@keyv/mysql";

export const Keyv = new KeyvLib(process.env.DATABASE);

Keyv.on("error", console.error);
