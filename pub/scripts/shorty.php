<?php
include('db_conf.php');
include('db_conn.php');
$db = new MySQLDatabase();
$db->connect(DB_USERNAME, DB_PASSWORD, DB_DATABASE);
$stmt = $db->link->prepare("INSERT INTO links (`link_url`) VALUES (?)");
$stmt->bind_param("s", $longLink);
$longLink = $_POST['link'];
$stmt->execute();
$newID = $stmt->insert_id;
$parsedID = toBase($newID);
$arr = array('link' => $parsedID);
echo json_encode($arr);
$stmt->close();
$db->disconnect();

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