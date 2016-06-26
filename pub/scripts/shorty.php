<?php
//get the post variable sent to us
$longLink = $_POST['link'];
//make sure it contains http, otherwise add it
if (!strrpos($longLink, 'http')) {
	$longLink = 'http://'.$longLink;
}
//are we linking to ourselves?
$pos = strrpos($longLink, "dwy.io");
if ($pos === false) {
	include('db_conf.php');
	include('db_conn.php');
	$db = new MySQLDatabase();
	$db->connect(DB_USERNAME, DB_PASSWORD, DB_DATABASE);
	//insert it into our database
	$stmt = $db->link->prepare("INSERT INTO links (`link_url`) VALUES (?)");
	$stmt->bind_param("s", $longLink);
	$stmt->execute();
	$newID = $stmt->insert_id;
	$parsedID = toBase($newID);
	//return json data to browser with link
	$arr = array('link' => $parsedID, 'status' => 1);
	echo json_encode($arr);
	$stmt->close();
	$db->disconnect();
} else {
	//don't link to ourselves
	echo json_encode(array('status' => 0));
}

//convert ID int in base10 to base62
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