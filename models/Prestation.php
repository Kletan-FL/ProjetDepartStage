<?php

class Prestation
{
    private $conn;

    public function __construct(PDO $conn)
    {
        $this->conn = $conn;
    }

    /**
     * Créé une nouvelle prestation avec les données fournies
     * Retourne l'ID de la prestation créée
     */
    public function create(array $data)
    {
        if (empty($data)) {
            return ['Erreur' => 'Aucune donnée fournie'];
        }
        try {

            $champs = implode(', ', array_keys($data));
            $valeurs = ':' . implode(', :', array_keys($data));

            $sql = "INSERT INTO PRESTATION ($champs) VALUES ($valeurs)";

            $req = $this->conn->prepare($sql);
            $req->execute($data);
            return ['ID' => $this->conn->lastInsertId()];

        } catch (PDOException $e) {

            return [
                'Erreur' => 'Erreur DB',
                'Details' => $e->getMessage()
            ];

        }
    }

    /**
     * Récupère et retourne une prestation avec l'id donné
     * Retourne un tableau si prestation existante ou false sinon
     */
    public function get($id)
    {
        $sql = "SELECT * FROM PRESTATION WHERE IDP = :id";
        $req = $this->conn->prepare($sql);
        $req->execute(['id' => $id]);
        
        return $req->fetch();
    }

    /**
     * Récupère toutes les prestations
     * Retourne un tableau (éventuellement vide si pas de prestations)
     */
    public function getAll()
    {
        $sql = "SELECT * FROM PRESTATION";
        $req = $this->conn->query($sql);
        
        return $req->fetchAll();
    }

    /**
     * Modifie une prestation avec l'id donné
     * Retourne le nombre de lignes modifiées
     */
    public function update($id, array $data)
    {
        if (empty($data)) {
            return ['Erreur' => 'Aucune donnée fournie'];
        }

        try {

            $modifs = [];
            foreach ($data as $col => $value) {
                $modifs[] = "$col = :$col";
            }
            $modifs = implode(', ', $modifs);

            $sql = "UPDATE PRESTATION SET $modifs WHERE IDP = :id";
            $req = $this->conn->prepare($sql);

            $params = $data;
            $params['id'] = $id;

            $req->execute($params);

            return ['Lignes modifiees' => $req->rowCount()];

        } catch (PDOException $e) {

            return [
                'Erreur' => 'Erreur DB',
                'Details' => $e->getMessage()
            ];

        }
    }

    /**
     * Supprime une prestation avec l'id donné
     * Retourne un booléen (true si suppression, false sinon)
     */
    public function delete($id)
    {
        $sql = "DELETE FROM PRESTATION WHERE IDP = :id";
        $req = $this->conn->prepare($sql);
        $req->execute(['id' => $id]);

        return $req->rowCount() > 0; // False si la prestation à supprimer n'existe pas
    }

    /**
     * Modifie une prestation avec l'id donné ou la créée si elle n'existe pas
     * En cas de création, retourne l'ID de la prestation créée
     * En cas de modification, retourne le nombre de lignes modifiées
     */
    public function upsert($id, array $data) {
        if (empty($data)) {
            return ['Erreur' => 'Aucune donnée fournie'];
        }

        /**
         * Equivalent du GET
         */
        $sqlGet = "SELECT * FROM PRESTATION WHERE IDP = :id";
        $reqGet = $this->conn->prepare($sqlGet);
        $reqGet->execute(['id' => $id]);
        $existe = $reqGet->fetch();

        /**
         * Si la prestation n'existe pas : INSERT
         */
        if (!$existe) {
            try {

                $champs = implode(', ', array_keys($data));
                $valeurs = ':' . implode(', :', array_keys($data));
                
                $sql = "INSERT INTO PRESTATION ($champs) VALUES ($valeurs)";
                
                $req = $this->conn->prepare($sql);
                $req->execute($data);
                return ['ID' => $this->conn->lastInsertId()];

                } catch (PDOException $e) {

                return [
                    'Erreur' => 'Erreur DB',
                    'Details' => $e->getMessage()
                ];
            }
        }

        /**
         * Si la prestation existe : UPDATE
         */
        try {
            
            $modifs = [];
            foreach ($data as $col => $value) {
                $modifs[] = "$col = :$col";
            }
            $modifs = implode(', ', $modifs);

            $sql = "UPDATE PRESTATION SET $modifs WHERE IDP = :id";
            $req = $this->conn->prepare($sql);

            $params = $data;
            $params['id'] = $id;
            
            $req->execute($params);

            return ['Lignes modifiees' => $req->rowCount()];

        } catch (PDOException $e) {

            return [
                'Erreur' => 'Erreur DB',
                'Details' => $e->getMessage()
            ];

        }
    }
}