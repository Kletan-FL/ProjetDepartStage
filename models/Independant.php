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
     * Retourne un booléen (true si création, false sinon)
     */
    public function create(array $data)
    {
        if (empty($data)) {
            return false;
        }

        $champs = implode(', ', array_keys($data));
        $valeurs = ':' . implode(', :', array_keys($data));
        
        $sql = "INSERT INTO INDEPENDANT ($champs) VALUES ($valeurs)";
        
        $req = $this->conn->prepare($sql);
        return $req->execute($data);
    }

    /**
     * Récupère et retourne un indépendant avec l'id donné
     */
    public function get($id)
    {
        $sql = "SELECT * FROM INDEPENDANT WHERE IDI = :id";
        $req = $this->conn->prepare($sql);
        $req->execute(['id' => $id]);
        return $req->fetch();
    }

    /**
     * Récupère tous les indépendants et les retourne
     */
    public function getAll()
    {
        $sql = "SELECT * FROM INDEPENDANT";
        $req = $this->conn->query($sql);
        return $req->fetchAll();
    }

    /**
     * Modifie un indépendant avec l'id donné
     * Retourne un booléen (true si modification, false sinon)
     */
    public function update($id, array $data)
    {
        if (empty($data)) {
            return false;
        }

        $modifs = [];
        foreach ($data as $col => $value) {
            $modifs[] = "$col = :$col";
        }
        $modifs = implode(', ', $modifs);

        $sql = "UPDATE INDEPENDANT SET $modifs WHERE IDI = :id";
        $req = $this->conn->prepare($sql);

        $params = $data;
        $params['id'] = $id;

        return $req->execute($params);
    }

    /**
     * Supprime un indépendant avec l'id donné
     * Retourne un booléen (true si suppression, false sinon)
     */
    public function delete($id)
    {
        $sql = "DELETE FROM INDEPENDANT WHERE IDI = :id";
        $req = $this->conn->prepare($sql);
        return $req->execute(['id' => $id]);
    }

    /**
     * Modifie un indépendant avec l'id donné ou le créé s'il n'existe pas
     * Retourne un booléen (true si création/modification, false sinon)
     */
    public function upsert($id, array $data) {
        if (empty($data)) {
            return false;
        }

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
            $champs = implode(', ', array_keys($data));
            $valeurs = ':' . implode(', :', array_keys($data));
            
            $sqlInsert = "INSERT INTO INDEPENDANT ($champs) VALUES ($valeurs)";
            
            $reqInsert = $this->conn->prepare($sqlInsert);
            return $reqInsert->execute($data);
        }

        /**
         * Si l'indépendant existe : UPDATE
         */
        $modifs = [];
        foreach ($data as $col => $value) {
            $modifs[] = "$col = :$col";
        }
        $modifs = implode(', ', $modifs);

        $sqlUpdate = "UPDATE INDEPENDANT SET $modifs WHERE IDI = :id";
        $reqUpdate = $this->conn->prepare($sqlUpdate);

        $params = $data;
        $params['id'] = $id;

        return $reqUpdate->execute($params);
    }
}