<?php

$model = new Independant($conn);

/**
 * Récupération de l'URL
 */
$uri = $_SERVER['REQUEST_URI'];

/**
 * Récupération de l'id
 */
$id = null;

if (preg_match('#^/api/prestations/(\d+)$#', $uri, $matches)) {
    $id = (int)$matches[1];
}

/** 
 * Récupération du JSON
 */
$input = json_decode(file_get_contents('php://input'), true);

/**
 * Cas GET : Récupérer les toutes les prestations ou une seule avec un id
 */
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if ($id !== null) {
        $prestation = $model->get($id);

        if ($prestation === false) {
            http_response_code(404);
            echo json_encode(['Erreur' => 'Prestation not found']);
            exit;
        }

        http_response_code(200);
        echo json_encode($prestation);
        exit;
    }

    http_response_code(200);
    echo json_encode($model->getAll());
    exit;
}

/**
 * Cas POST : Créer une prestation
 */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!$input) {
        http_response_code(400);
        echo json_encode(['Erreur' => 'JSON invalide']);
        exit;
    }

    $resultat = $model->create($input);

    if (isset($resultat['Erreur'])) {
        http_response_code(500); // 500 parce que Pb DB ou 400 parce que Bad Request?
        echo json_encode($resultat);
        exit;
    }

    http_response_code(201);
    echo json_encode($resultat);
    exit;
}

/**
 * Cas PUT : Modifier une prestation
 */
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && $id !== null) {

    if (!$input) {
        http_response_code(400);
        echo json_encode(['Erreur' => 'JSON invalide']);
        exit;
    }

    $resultat = $model->update($id, $input);

    if (isset($resultat['Erreur'])) {
        http_response_code(500); // 500 parce que Pb DB ou 400 parce que Bad Request?
        echo json_encode($resultat);
        exit;
    }

    if ($resultat['Lignes modifiees'] === 0) {
        http_response_code(404);
        echo json_encode(['Erreur' => 'Prestation not found']);
        exit;
    }

    http_response_code(200);
    echo json_encode($resultat);
    exit;
}

/**
 * Cas DELETE : Supprimer une prestation
 */
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $id !== null) {

    $supprime = $model->delete($id);

    if (!$supprime) {
        http_response_code(404);
        echo json_encode(['Erreur' => 'Prestation not found']);
        exit;
    }

    http_response_code(200);
    echo json_encode(['Suppression' => true]);
    exit;
}

/**
 * Erreur si route non trouvée
 */
http_response_code(404);
echo json_encode(['Erreur' => 'Route inexistante']);