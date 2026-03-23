# Projet : "Client_portage" (2 Semaines)

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