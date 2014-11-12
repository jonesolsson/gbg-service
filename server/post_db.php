<?php

//Api
$ApiId = '503581d0-2006-451b-8aa2-ff956a45a253';

//In Data
$data = file_get_contents("php://input");
$data = json_decode($data, TRUE);

function Curl($url, $returnTransfer) {
  $curl = curl_init();
  curl_setopt_array($curl, Array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => $returnTransfer
  ));
  $response = curl_exec($curl);
  curl_close($curl);
  echo $response;
}


if($data['lat'] && $data['long']) {
  Curl(
    //'http://data.goteborg.se/StyrOchStall/v0.1/GetBikeStations/' . $ApiId .'?latitude=' . $data['lat'] . '&longitude=' . $data['long'] .'&radius=500&format=json',
    'http://data.goteborg.se/SelfServiceBicycleService/v1.0/Stations/' . $ApiId . '?getclosingperiods=true&latitude=' . $data['lat'] . '&longitude=' . $data['long'] . '&radius=' . $data['rad'] . '&format=json',
    true
  );
}
