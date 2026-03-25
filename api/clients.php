<?php

$model = new Client($conn);

/**
 * Récupération de l'URL
 */
$uri = $_SERVER['REQUEST_URI'];

/**
 * Récupération de l'id s'il est donné
 */
$id = null;

if (preg_match('#^/api/clients/(\d+)$#', $uri, $matches)) {
    $id = $matches[1];
}

/**
 * Récupération de l'input JSON (pour la création ou modification)
 */
$input = json_decode(file_get_contents('php://input'), true);

/**
 * Cas GET : Récupérer les tous les clients ou un seul avec un id
 */
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if ($id !== null) {
        echo json_encode($model->get($id));
        exit;
    }

    echo json_encode($model->getAll());
    exit;
}

/**
 * Cas POST : Créer un client
 */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo json_encode($model->create($input));
    exit;
}

/**
 * Cas PUT : Modifier un client
 */
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && $id !== null) {
    echo json_encode($model->update($id, $input));
    exit;
}

/**
 * Cas DELETE : Supprimer un client
 */
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $id !== null) {
    echo json_encode($model->delete($id));
    exit;
}

/**
 * Erreur si route non trouvée
 */
http_response_code(404);
echo json_encode(['Erreur' => 'Route inexistante']);