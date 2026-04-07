import Database from "better-sqlite3";

/**
 * Initialise la connexion à la base SQLite utilisée par l'application.
 */
const db = new Database("database/database.db");

/** Active la gestion des clés étrangères (désactivée par défaut dans SQLite) */
db.pragma("foreign_keys = ON");

export default db;
