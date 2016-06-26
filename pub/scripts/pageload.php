<?php
$link = $_SERVER['REQUEST_URI'];

if ($link != '/' ) {
	include('pub/scripts/db_conf.php');
	include('pub/scripts/db_conn.php');
	$db = new MySQLDatabase();
	$db->connect(DB_USERNAME, DB_PASSWORD, DB_DATABASE);
	$stmt = $db->link->prepare("SELECT link_url FROM links WHERE (link_id = ?)");
	$stmt->bind_param("i", $linkStuff);
	$linkStuff = (int)to10(explode('/',$link)[1]);
	$stmt->execute();
	$stmt->store_result();
	mysqli_stmt_bind_result($stmt, $url);
	mysqli_stmt_fetch($stmt);
	$stmt->close();
	$db->disconnect();
	header("Location: ".$url);
}

function to10($num, $b=62) {
	$base='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$limit = strlen($num);
	$res=strpos($base,$num[0]);
	for($i=1;$i<$limit;$i++) {
		$res = $b * $res + strpos($base,$num[$i]);
	}
	return $res;
}
?>