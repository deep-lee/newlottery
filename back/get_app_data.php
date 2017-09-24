<?php

// ini_set('display_errors', true);
// error_reporting(E_ALL);

include 'conn.php';
include 'util.php';
include 'session.php';

$returnData = array();

if (check_user_login_out_of_time() == false) {
  $returnData['rt_code'] = -2;
} else {
  $limit = $_GET['limit'];
  $offset = $_GET['offset'];
  $search_text = $_GET['search_text'];

  // echo $limit." ".$offset." ".$search_text." ".$start_index;

  $sql = "";
  if ($search_text == '') {
    $sql = "select * from lottery limit $offset,$limit";
  } else {
    $sql = "select * from lottery where url like '%".$search_text."%' or
            appid like '%".$search_text."%' or
            comment like '%".$search_text."%' limit $offset,$limit";
  }

  // echo $sql;

  $result = mysql_query($sql);

  //循环从数据集取出数据
  $i = 0;
  while( $row = mysql_fetch_array($result) ){
    $rows[$i] = $row;
    $i = $i + 1;
  }

  // get total rows

  $sql_total_rows = "select count(*) as total from lottery";
  if ($search_text == '') {
    $sql_total_rows = "select count(*) as total from lottery";
  } else {
    $sql_total_rows = "select count(*) as total from lottery
            where url like '%".$search_text."%' or
            appid like '%".$search_text."%' or
            comment like '%".$search_text."%' limit $offset,$limit";
  }

  $result_total_rows = mysql_query($sql_total_rows);
  $row_total = mysql_fetch_array($result_total_rows);

  $result = array('total' => $row_total['total'],
                  'rows' => $rows);
  $returnData['rt_data'] = $result;
  $returnData['rt_code'] = 1;
}

$json = json_encode($returnData);

echo $json;
