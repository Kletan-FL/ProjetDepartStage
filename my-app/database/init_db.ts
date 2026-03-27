import fs from "fs";
import Database from "better-sqlite3";

const schema = fs.readFileSync("./database/schema.sql", "utf8");

const db = new Database("./database/database.db");

db.exec(schema);

console.log("Base initialisée !");