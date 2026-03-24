-- Création des tables

-- Activation des clés étrangères car SQLite ne le fait pas par défaut
PRAGMA foreign_keys = ON;

-- Suppression des tables si elles existent
DROP TABLE IF EXISTS PRESTATION;
DROP TABLE IF EXISTS CLIENT;
DROP TABLE IF EXISTS INDEPENDANT;

-- Table Client
-- Représente les entreprises clientes qui commandent des prestations
CREATE TABLE CLIENT (
    IDC INTEGER PRIMARY KEY AUTOINCREMENT, -- Identifiant unique du client
    NOM TEXT, -- Nom de l'entreprise cliente
    SIRET TEXT, -- Numéro SIRET
    VILLE TEXT, -- Ville du siège social
    DOMAINE TEXT, -- Secteur d'activité
    ADRESSE TEXT -- Adresse postale
);

-- Table Indépendant
-- Représente les freelances réalisant les prestations
CREATE TABLE INDEPENDANT (
    IDI INTEGER PRIMARY KEY AUTOINCREMENT, -- Identifiant unique du freelance
    NOM TEXT, -- Nom de famille
    PRENOM TEXT, -- Prénom
    EMAIL TEXT, -- Adresse mail
    TELEPHONE TEXT, -- Numéro de téléphone
    TJM_SOUHAITE REAL -- Tarif journalier souhaité
);

-- Table Prestation
-- Table reliant un client et un indépendant via une prestation
CREATE TABLE PRESTATION (
    IDP INTEGER PRIMARY KEY AUTOINCREMENT, -- Identifiant unique de la prestation
    IDC INTEGER NOT NULL, -- Référence vers le client
    IDI INTEGER NOT NULL, -- Référence vers l'indépendant
    INTITULE TEXT, -- Titre de la prestation
    DESCRIPTION TEXT, -- Description détaillée
    DATE_DEBUT TEXT,  -- Date de début (YYYY-MM-DD)
    DATE_FIN TEXT, -- Date de fin (YYYY-MM-DD)
    TJM_FINAL REAL, -- Tarif journalier final
    FOREIGN KEY (IDC) REFERENCES CLIENT(IDC),
    FOREIGN KEY (IDI) REFERENCES INDEPENDANT(IDI)
);

-- Données de départ

INSERT INTO CLIENT (NOM, SIRET, VILLE, DOMAINE, TJM_ESTIME, ADRESSE)
VALUES ('EntrepriseRandom', '12345678900000', 'Toulouse', 'Informatique', '1 Rue Nomderue');

INSERT INTO INDEPENDANT (NOM, PRENOM, EMAIL, TELEPHONE, TJM_SOUHAITE)
VALUES ('Delance', 'Jeanne', 'jeanne.delance@mail.com', '0606060606', 500);

INSERT INTO PRESTATION (IDC, IDI, INTITULE, DESCRIPTION, DATE_DEBUT, DATE_FIN, TJM_FINAL)
VALUES (1, 1, 'Développement API', 'Création d’une API en PHP', '2026-01-01', '2026-02-01', 500);