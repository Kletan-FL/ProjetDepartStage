import fs from "fs";
import Database from "better-sqlite3";

/**
 * Script d'initialisation de la base SQLite.
 *
 * ! Uniquement à utiliser lors de la première installation ou pour réinitialiser la base.
 */
const schema = fs.readFileSync("./database/schema.sql", "utf8");

// Création/connexion à la base SQLite
const db = new Database("./database/database.db");

// Exécution du script SQL (création des tables, contraintes, etc)
db.exec(schema);

console.log("Base initialisée !");
