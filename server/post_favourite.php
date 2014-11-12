<?php

require 'db_settings.php';

$link = connection();

$data = file_get_contents("php://input");
$data = json_decode($data, TRUE);

//Post data
$statId = $data['stationsId'];
$userId = $data['userId'];

function getUserStations($statId, $userId) {
  $link = connection();
  $query = "SELECT * FROM favourite_stations WHERE stations_id=$statId AND user_id='$userId'";
  $result = mysqli_query($link, $query);
  $arr = [];

  while($row = mysqli_fetch_assoc($result)) {
    $arr[] = $row;
  }

  return $arr;

}

if(count(getUserStations($statId, $userId)) === 0) {

  $query = "INSERT INTO favourite_stations (stations_id, user_id) VALUES ($statId, '$userId')";
  mysqli_query($link, $query);

  echo $data['stationsId'];

} else {
  echo 'Finns redan sparad';
}
