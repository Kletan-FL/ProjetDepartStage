<?php

class Independant
{
    private $conn;

    public function __construct(PDO $conn)
    {
        $this->conn = $conn;
    }

    /**
     * Créé un nouvel indépendant avec les données fournies
     * Retourne l'ID de l'indépendant créé
     */
    public function create(array $data)
    {

        try  {
        
            $champs = implode(', ', array_keys($data));
            $valeurs = ':' . implode(', :', array_keys($data));
            
            $sql = "INSERT INTO INDEPENDANT ($champs) VALUES ($valeurs)";
            
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
     * Récupère un indépendant avec l'id donné
     * Retourne un tableau si indépendant existant ou false sinon
     */
    public function get($id)
    {
        $sql = "SELECT * FROM INDEPENDANT WHERE IDI = :id";
        $req = $this->conn->prepare($sql);
        $req->execute(['id' => $id]);

        return $req->fetch();
    }

    /**
     * Récupère tous les indépendants
     * Retourne un tableau (éventuellement vide si pas d'indépendants)
     */
    public function getAll()
    {
        $sql = "SELECT * FROM INDEPENDANT";
        $req = $this->conn->query($sql);

        return $req->fetchAll();
    }

    /**
     * Modifie un indépendant avec l'id donné
     * Retourne le nombre de lignes modifiées
     */
    public function update($id, array $data)
    {

        try  {

            $modifs = [];
            foreach ($data as $col => $value) {
                $modifs[] = "$col = :$col";
            }
            $modifs = implode(', ', $modifs);

            $sql = "UPDATE INDEPENDANT SET $modifs WHERE IDI = :id";
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
     * Supprime un indépendant avec l'id donné
     * Retourne un booléen (true si suppression, false sinon)
     */
    public function delete($id)
    {
        $sql = "DELETE FROM INDEPENDANT WHERE IDI = :id";
        $req = $this->conn->prepare($sql);
        $req->execute(['id' => $id]);

        return $req->rowCount() > 0; // False si l'indépendant à supprimer n'existe pas
    }

    /**
     * Modifie un indépendant avec l'id donné ou le créé s'il n'existe pas
     * En cas de création, retourne l'ID de l'indépendant créé
     * En cas de modification, retourne le nombre de lignes modifiées
     */
    public function upsert($id, array $data) {

        /**
         * Equivalent du GET
         */
        $sqlGet = "SELECT * FROM INDEPENDANT WHERE IDI = :id";
        $reqGet = $this->conn->prepare($sqlGet);
        $reqGet->execute(['id' => $id]);
        $existe = $reqGet->fetch();

        /**
         * Si l'indépendant n'existe pas : INSERT
         */
        if (!$existe) {
            try {

                $champs = implode(', ', array_keys($data));
                $valeurs = ':' . implode(', :', array_keys($data));
                
                $sql = "INSERT INTO INDEPENDANT ($champs) VALUES ($valeurs)";
                
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
         * Si l'indépendant existe : UPDATE
         */
        try {
            
            $modifs = [];
            foreach ($data as $col => $value) {
                $modifs[] = "$col = :$col";
            }
            $modifs = implode(', ', $modifs);

            $sql = "UPDATE INDEPENDANT SET $modifs WHERE IDI = :id";
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