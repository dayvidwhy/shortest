<?php

/* Database Information */
include('pub/db/db_conf.php');
include('pub/db/db_conn.php');

/* The URI caught by index.php */
$link = $_SERVER['REQUEST_URI'];

// Were we linked to a shortened url?
if (validate_link($link)) {
	$url = get_long_url($link);
	// Perform the redirect.
	header("Location: ".$url);
}

/*
* Execute the query on the short link and return the actual URL.
*/
function get_long_url($link) {
	$db = new MySQLDatabase();
	$db->connect(DB_USERNAME, DB_PASSWORD, DB_DATABASE);
	// Lookup the url we were sent.
	$stmt = $db->link->prepare("SELECT link_url FROM links WHERE (link_id = ?)");
	$linkAsBase = (int) toBase10(explode('/',$link)[1]);
	$stmt->bind_param("i", $linkAsBase);
	$stmt->execute();
	$stmt->store_result();
	mysqli_stmt_bind_result($stmt, $url);
	mysqli_stmt_fetch($stmt);
	$stmt->close();
	$db->disconnect();
	return $url;
}

/*
* Convert the shortened URL from base 62 back to base 10.
*
* Returns a base 10 integer.
*/
function toBase10($num, $b=62) {
	$base = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$limit = strlen($num);
	$result = strpos($base, $num[0]);
	for ($i=1; $i < $limit; $i++) {
		$result = $b * $result + strpos($base, $num[$i]);
	}
	return $result;
}

/*
* Checks to see if the URI is just a '/', anything else
* is a link we can assume is shortened. Requests to the pub
* directory won't get caught here because of the .htaccess
*/
function validate_link($link) {
	if ($link == '/' || $link == '/favicon.ico' || $link == '/index.php') {
		error_log($link);
		error_log('false');
		return false;
	}
	return true;
}

?>