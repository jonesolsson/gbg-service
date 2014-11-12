<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

function connection() {

  //Connection Settings
  $host = 'localhost';
  $db_user = 'root';
  $db_password = 'root';
  $db_name = 'gbg_service';

  $link = mysqli_connect($host, $db_user, $db_password, $db_name);
  if(!$link) {
    print 'ERROR!';
  } else {
    return $link;
  }
}
