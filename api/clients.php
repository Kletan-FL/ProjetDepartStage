<?php

$model = new Client($conn);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($model->getAll());
    exit;
}