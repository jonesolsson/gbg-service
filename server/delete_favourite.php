<?php

require 'db_settings.php';

$link = connection();

$data = file_get_contents("php://input");
$data = json_decode($data, TRUE);

//Post data
$userId = $data['userId'];
$statId = $data['stationsId'];

$query = "DELETE FROM favourite_stations WHERE stations_id=$statId AND user_id='$userId'";
mysqli_query($link, $query);

echo $statId;
