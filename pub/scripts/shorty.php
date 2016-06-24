<?php
	include('db_conf.php');
	include('db_conn.php');
	$db = new MySQLDatabase();
	$db->connect(DB_USERNAME, DB_PASSWORD, DB_DATABASE);
	$longLink = $_POST['link'];
	$sql = "INSERT INTO links (link_url) VALUES (\"".$longLink."\")";
	$result = mysqli_query($db->link, $sql);
	$newID = $db->link->insert_id;
	$arr = array('link' => $longLink, 'id' => $newID, 'result' => $result);
	echo json_encode($arr);
	$db->disconnect();	
?>