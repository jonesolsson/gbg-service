<?php

require 'db_settings.php';

$ApiId = '503581d0-2006-451b-8aa2-ff956a45a253';

$link = connection();

$data = file_get_contents("php://input");
$data = json_decode($data, TRUE);

//Post data
$userId = $data['userId'];

function getUserStations($userId) {
  $link = connection();
  $query = "SELECT * FROM favourite_stations WHERE user_id='$userId'";
  $result = mysqli_query($link, $query);
  $arr = [];

  while($row = mysqli_fetch_assoc($result)) {
    $arr[] = $row;
  }

  return $arr;

}

function Curl($url, $returnTransfer) {
  $curl = curl_init();
  curl_setopt_array($curl, Array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => $returnTransfer
  ));
  $response = curl_exec($curl);
  curl_close($curl);
  //return json_decode($response);
  return $response;
}

$stations = [];

foreach(getUserStations($userId) as $station) {
    $stations[] =  $station['stations_id'];
}

$test = [];

foreach($stations as $stationId) {
  $test[] = Curl(
    'http://data.goteborg.se/StyrOchStall/v0.1/GetBikeStation/' . $stationId . '/' . $ApiId . '?format=json',
    true
  );
}

echo json_encode($test);
