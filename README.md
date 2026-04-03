# Projet : "Client_portage" (2 Semaines)

## Contexte

Ce projet a été réalisé dans le cadre d’un stage et a pour objectif l’apprentissage et la mise en pratique de nouvelles technologies.

## Propriété intellectuelle

Le code source de ce projet est partagé à des fins exclusivement éducatives

Les éléments graphiques présents dans le dossier `/public`
(logos, illustrations, icônes, images) sont la propriété exclusive de Ethan Joussein © 2026.
Toute reproduction, modification, distribution ou utilisation de ces assets,
sans autorisation écrite préalable, est strictement interdite.

## Objectif du projet

Construire un module de gestion d'annuaire clients pour notre activité de portage salarial.

---

## SEMAINE 1 : Le Backend (Architecture Backend en PHP)

### Spécifications Techniques :

- **Langage :** PHP natif (sans framework comme Laravel).
- **Base de données :** SQLite (un simple fichier). (Extenstion dans VSCode disponible).
- **Format d'échange :** JSON.

### Tes livrables :

1. **La Base de données :** Un fichier `database.sqlite` avec par exemple une table `clients` (id, nom, siret, ville, tjm_estime…).
2. **Les fichiers d’API CRUD classique**
   1. **Create, Read, Updtate, Delete**. (Se renseigner sur les méthodes HTTP adapté: POST, GET, etc …).
   2. Prendre en compte les cas d’erreurs courant avec le code d’erreur associé : Client Not Found, etc...
3. **Test :** Utiliser l’outil Postman pour tester les APIs.

---

## SEMAINE 2 : Migration en NextJS + FrontEnd (1 semaine)

### Objectif : Transposer le travail de la semaine 1 vers NextJs

Tu vas construire un outil interne pour gérer les clients, les indépendants et les missions. L'objectif est de comprendre comment on enregistre des informations et comment on les ressort pour les afficher dans NextJs à partir d’une base SQLite.

### Phase 1 : SQL Manuel & Next.js

- **Techno :** Next.js 16, TypeScript, SQLite (via `better-sqlite3`).
- **La Base :** Le fichier `database.db`.
- **L'Affichage :**
  - Crée une page qui liste tous les clients enregistrés (idem pour les 2 autres tables).
  - Possibilité de cliquer sur un client de la liste et d’afficher ses infos.
- **L'Ajout :** Crée un formulaire pour ajouter un client.

### Phase 2 : Passage à l'ORM

- Une fois que tout fonctionne, on remplacera tes requêtes SQL "écrites à la main" par un outil pro (un **ORM**) qui facilite le travail.
- BONUS: Gestion et passage en asynchrone en utilisant la bibliothèque classique de sqlite.
