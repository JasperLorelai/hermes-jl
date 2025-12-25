import mysql2 from "mysql2";
import {Sequelize} from "sequelize-typescript";

import MemberCount from "@/handles/db/MemberCount";

const uri = process.env.DATABASE_CONSTANCE;
if (!uri) throw new Error("Missing database URI");

const sequelize = new Sequelize(uri, {
    dialectModule: mysql2,
    logging: process.env.NODE_ENV === "production" ? false : console.log,
});

sequelize.addModels([
    MemberCount,
]);

try {
    sequelize.authenticate().then();
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

export default class SequelizeConstance {
    
    private static hasSynced = false;
    
    static async ensureSync() {
        if (this.hasSynced) return;
        await sequelize.sync();
        this.hasSynced = true;
    }

}
