<?php

class Client
{
    private $conn;

    public function __construct(PDO $conn)
    {
        $this->conn = $conn;
    }

    /**
     * Créé un nouveau client avec les données fournies
     * Retourne l'ID du client créé
     */
    public function create(array $data)
    {

        try {

            $champs = implode(', ', array_keys($data));
            $valeurs = ':' . implode(', :', array_keys($data));
            
            $sql = "INSERT INTO CLIENT ($champs) VALUES ($valeurs)";
            
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
     * Récupère un client avec l'id donné
     * Retourne un tableau si client existant ou false sinon
     */
    public function get($id)
    {
        $sql = "SELECT * FROM CLIENT WHERE IDC = :id";
        $req = $this->conn->prepare($sql);
        $req->execute(['id' => $id]);
        
        return $req->fetch() ;
    }

    /**
     * Récupère tous les clients
     * Retourne un tableau (éventuellement vide si pas de clients)
     */
    public function getAll()
    {
        $sql = "SELECT * FROM CLIENT";
        $req = $this->conn->query($sql);

        return $req->fetchAll();
    }

    /**
     * Modifie un client avec l'id donné
     * Retourne le nombre de lignes modifiées
     */
    public function update($id, array $data)
    {
        try {
            
            $modifs = [];
            foreach ($data as $col => $value) {
                $modifs[] = "$col = :$col";
            }
            $modifs = implode(', ', $modifs);

            $sql = "UPDATE CLIENT SET $modifs WHERE IDC = :id";
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
     * Supprime un client avec l'id donné
     * Retourne un booléen (true si suppression, false sinon)
     */
    public function delete($id)
    {
        $sql = "DELETE FROM CLIENT WHERE IDC = :id";
        $req = $this->conn->prepare($sql);
        $req->execute(['id' => $id]);

        return $req->rowCount() > 0; // False si le client à supprimer n'existe pas
    }

    /**
     * Modifie un client avec l'id donné ou le créé s'il n'existe pas
     * En cas de création, retourne l'ID du client créé
     * En cas de modification, retourne le nombre de lignes modifiées
     */
    public function upsert($id, array $data) {

        /**
         * Equivalent du GET
         */
        $sqlGet = "SELECT * FROM CLIENT WHERE IDC = :id";
        $reqGet = $this->conn->prepare($sqlGet);
        $reqGet->execute(['id' => $id]);
        $existe = $reqGet->fetch();

        /**
         * Si le client n'existe pas : INSERT
         */
        if (!$existe) {
            try {

                $champs = implode(', ', array_keys($data));
                $valeurs = ':' . implode(', :', array_keys($data));
                
                $sql = "INSERT INTO CLIENT ($champs) VALUES ($valeurs)";
                
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
         * Si le client existe : UPDATE
         */
        try {
            
            $modifs = [];
            foreach ($data as $col => $value) {
                $modifs[] = "$col = :$col";
            }
            $modifs = implode(', ', $modifs);

            $sql = "UPDATE CLIENT SET $modifs WHERE IDC = :id";
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