<?php
try {
    $conn = new PDO('sqlite:' . __DIR__ . '/database/database.sqlite');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur DB : " . $e->getMessage();
    die();
}