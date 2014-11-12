<?php

require 'db_settings.php';

$link = connection();

$data = file_get_contents("php://input");
$data = json_decode($data, TRUE);
$statId = $data['stationsId'];

$query = "INSERT INTO favourite_stations (stations_id) VALUES ($statId)";
mysqli_query($link, $query);

echo $data['stationsId'];
