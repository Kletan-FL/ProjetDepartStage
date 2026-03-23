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
     * Retourne un booléen (true si création, false sinon)
     */
    public function create(array $data)
    {
        if (empty($data)) {
            return false;
        }

        $champs = implode(', ', array_keys($data));
        $valeurs = ':' . implode(', :', array_keys($data));
        
        $sql = "INSERT INTO CLIENT ($champs) VALUES ($valeurs)";
        
        $req = $this->conn->prepare($sql);
        return $req->execute($data);
    }

    /**
     * Récupère et retourne un client avec l'id donné
     */
    public function get($id)
    {
        $sql = "SELECT * FROM CLIENT WHERE idC = :id";
        $req = $this->conn->prepare($sql);
        $req->execute(['id' => $id]);
        return $req->fetch();
    }

    /**
     * Récupère tous les clients et les retourne
     */
    public function getAll()
    {
        $sql = "SELECT * FROM CLIENT";
        $req = $this->conn->query($sql);
        return $req->fetchAll();
    }

    /**
     * Modifie un client avec l'id donné
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

        $sql = "UPDATE CLIENT SET $modifs WHERE idC = :id";
        $req = $this->conn->prepare($sql);

        $params = $data;
        $params['id'] = $id;

        return $req->execute($params);
    }

    /**
     * Supprime un client avec l'id donné
     * Retourne un booléen (true si suppression, false sinon)
     */
    public function delete($id)
    {
        $sql = "DELETE FROM CLIENT WHERE idC = :id";
        $req = $this->conn->prepare($sql);
        return $req->execute(['id' => $id]);
    }
}