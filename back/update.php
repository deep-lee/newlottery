<?php

include 'conn.php';
include 'session.php';

$returnData = array();
if (check_user_login_out_of_time() == false) {
  $returnData['rt_code'] = -2;
} else {
  if (isset($_GET['id']) &&
      isset($_GET['url']) &&
      isset($_GET['appid']) &&
      isset($_GET['type']) &&
      isset($_GET['show']) &&
      isset($_GET['comment'])) {
    $id = $_GET['id'];
    $url = $_GET['url'];
    $appid = $_GET['appid'];
    $type = $_GET['type'];
    $show = $_GET['show'];
    $comment = $_GET['comment'];
    date_default_timezone_set('Asia/Shanghai');
    $updateAt = date('Y-m-d H:i:s');

    // echo $id." ".$url." ".$appid." ".$type." ".$show." ".comment." ".$updateAt;

    $sql = "update lottery set url = '$url', appid='$appid', type='$type',
            show_url=$show, comment='$comment', updateAt='$updateAt'
            where id=$id";

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

echo json_encode($returnData);
