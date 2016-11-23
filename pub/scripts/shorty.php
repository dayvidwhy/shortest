<?php
session_start();
// Get the post variable sent to us
$longLink = $_POST['link'];
// Make sure it contains http, otherwise add it
$posi = strrpos($longLink, "http");
if ($posi === false) {
	$longLink = 'http://'.$longLink;
}

/*
* Replace dwy.io with base domain of url shortener to stop
* Prevent circular links.
*/
$pos = strrpos($longLink, "dwy.io");
if ($pos === false) {

	// Load Database scripts.
	include('../db/db_conf.php');
	include('../db/db_conn.php');
	$db = new MySQLDatabase();
	$db->connect(DB_USERNAME, DB_PASSWORD, DB_DATABASE);

	// Insert it into our database.
	$stmt = $db->link->prepare("INSERT INTO links (`link_url`) VALUES (?)");
	$stmt->bind_param("s", $longLink);
	$stmt->execute();
	$newID = $stmt->insert_id;
	$parsedID = toBase($newID);

	// Return json data to browser with link.
	echo json_encode(array('link' => $parsedID, 'status' => 1));
	$stmt->close();
	$db->disconnect();
} else {
	// Don't link to ourselves
	echo json_encode(array('link' => 'NULL', 'status' => 0));
}

// TODO: Use class to store link.
class ShortLink {
	var $link;

	function validate() {
		return true;
	}

	function __constructor($link) {
		$this->link = $link;
	}

	function __toString() {
		return;
	}
}

/*
* Convert back to base 62.
*/
function toBase($num, $b=62) {
	$base='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$r = $num  % $b ;
	$res = $base[$r];
	$q = floor($num/$b);
	while ($q) {
		$r = $q % $b;
		$q =floor($q/$b);
		$res = $base[$r].$res;
	}
	return $res;
}


?>