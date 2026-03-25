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
     * Retourne un booléen (true si création, false sinon)
     */
    public function create(array $data)
    {
        if (empty($data)) {
            return false;
        }

        $champs = implode(', ', array_keys($data));
        $valeurs = ':' . implode(', :', array_keys($data));

        $sql = "INSERT INTO PRESTATION ($champs) VALUES ($valeurs)";

        $req = $this->conn->prepare($sql);
        return $req->execute($data);
    }

    /**
     * Récupère et retourne une prestation avec l'id donné
     */
    public function get($id)
    {
        $sql = "SELECT * FROM PRESTATION WHERE IDP = :id";
        $req = $this->conn->prepare($sql);
        $req->execute(['id' => $id]);
        return $req->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Récupère toutes les prestations et les retourne
     */
    public function getAll()
    {
        $sql = "SELECT * FROM PRESTATION";
        $req = $this->conn->query($sql);
        return $req->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Modifie une prestation avec l'id donné
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

        $sql = "UPDATE PRESTATION SET $modifs WHERE IDP = :id";
        $req = $this->conn->prepare($sql);

        $params = $data;
        $params['id'] = $id;

        return $req->execute($params);
    }

    /**
     * Supprime une prestation avec l'id donné
     * Retourne un booléen (true si suppression, false sinon)
     */
    public function delete($id)
    {
        $sql = "DELETE FROM PRESTATION WHERE IDP = :id";
        $req = $this->conn->prepare($sql);
        return $req->execute(['id' => $id]);
    }

    /**
     * Modifie une prestation avec l'id donné ou le créé s'il n'existe pas
     * Retourne un booléen (true si création/modification, false sinon)
     */
    public function upsert($id, array $data) {
        if (empty($data)) {
            return false;
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
            $champs = implode(', ', array_keys($data));
            $valeurs = ':' . implode(', :', array_keys($data));
            
            $sqlInsert = "INSERT INTO PRESTATION ($champs) VALUES ($valeurs)";
            
            $reqInsert = $this->conn->prepare($sqlInsert);
            return $reqInsert->execute($data);
        }

        /**
         * Si la prestation existe : UPDATE
         */
        $modifs = [];
        foreach ($data as $col => $value) {
            $modifs[] = "$col = :$col";
        }
        $modifs = implode(', ', $modifs);

        $sqlUpdate = "UPDATE PRESTATION SET $modifs WHERE IDP = :id";
        $reqUpdate = $this->conn->prepare($sqlUpdate);

        $params = $data;
        $params['id'] = $id;

        return $reqUpdate->execute($params);
    }
}