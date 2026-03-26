<?php
try {
    $conn = new PDO('sqlite:' . __DIR__ . '/database/database.sqlite');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $conn->exec("PRAGMA foreign_keys = ON;");
    
} catch (PDOException $e) {
    http_response_code(500);
        
    echo json_encode([
        'Erreur' => 'Erreur DB',
        'Details' => $e->getMessage()
    ]);

    die();
}