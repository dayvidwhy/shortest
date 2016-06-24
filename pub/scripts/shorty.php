<?php
	include('db_conf.php');
	include('db_conn.php');
	$db = new MySQLDatabase();
	$db->connect(DB_USERNAME, DB_PASSWORD, DB_DATABASE);
	$longLink = $_POST['link'];
	$sql = "INSERT INTO links (link_url) VALUES (\"".$longLink."\")";
	$result = mysqli_query($db->link, $sql);
	$newID = $db->link->insert_id;
	$parsedID = convertIdToURL($newID);
	$arr = array('link' => $parsedID);
	echo json_encode($arr);
	$db->disconnect();

	function convertIdToURL($id) {
		$digits = array();
		while ($id > 0) {
			$rem = $id % 62;
			array_push($digits, $rem);
			$id = $id / 62;
		}
	}
?>