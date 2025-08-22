import mysql2 from "mysql2";
import {Sequelize} from "sequelize-typescript";

import {MiniScriptE} from "@/handles/db/MemberChartData";

const uri = process.env.DATABASE;
if (!uri) throw new Error("Missing database URI");

const sequelize = new Sequelize(uri, {
    dialectModule: mysql2,
    logging: process.env.NODE_ENV === "production" ? false : console.log,
});

sequelize.addModels([
    MiniScriptE,
]);

try {
    sequelize.authenticate().then();
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

export default sequelize;

let hasSynced = false;
export async function ensureSequelizeSync() {
    if (hasSynced) return;
    await sequelize.sync();
    hasSynced = true;
}
