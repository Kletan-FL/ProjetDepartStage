<?php

/**
 * Dépendances (connexion PDO et modèles) 
 */
require_once 'connect.php';
require_once 'models/Independant.php';
require_once 'models/Prestation.php';
require_once 'models/Client.php';

/**
 * Récupération de l'URL
 */
$uri = $_SERVER['REQUEST_URI'];

/**
 * Redirection vers le fichier API correspondant ou Erreur si non trouvée
 */
if (str_starts_with($uri, '/api/independants')) {
    require 'api/independants.php';
    exit;
}

if (str_starts_with($uri, '/api/prestations')) {
    require 'api/prestations.php';
    exit;
}

if (str_starts_with($uri, '/api/clients')) {
    require 'api/clients.php';
    exit;
}

http_response_code(404);
echo json_encode(['Erreur' => 'Route inexistante']);