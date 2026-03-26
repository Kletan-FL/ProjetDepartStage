<?php
require_once __DIR__ . '/../connect.php';

$sql = file_get_contents(__DIR__ . '/../database/schema.sql');
$conn->exec($sql);

echo "Base initialisée !";