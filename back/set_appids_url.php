<?php

include 'conn.php';
include 'session.php';

$returnData = array();

if (check_user_login_out_of_time() == false) {
  $returnData['rt_code'] = -2;
} else {
  if (isset($_GET['appids']) &&
      isset($_GET['show_url'])) {
    $appids = $_GET['appids'];
    $show_url = $_GET['show_url'];
    $sql = "update lottery set url = '$show_url' where appid in (".$appids.")";
    $result = mysql_query($sql);
    if ($result == false) {
      $returnData['rt_code'] = 0;
    } else {
      $returnData['rt_code'] = 1;
    }
  } else {
    $returnData['rt_code'] = -1;
  }
}

$json = json_encode($returnData);

echo $json;
