<?php

	$con = mysql_connect("202.61.86.219", "root", "hpidc@126");
	//设置字符集为utf8
	mysql_query("SET NAMES 'utf8'");

	if (!$con){
		die(mysql_error());
	}

	mysql_select_db("mydbtest", $con);
?>
