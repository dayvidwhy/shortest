<?php
$link = $_SERVER['REQUEST_URI'];
if ($link != '/' ) {
	include('scripts/db_conf.php');
	include('scripts/db_conn.php');
	$db = new MySQLDatabase();
	$db->connect(DB_USERNAME, DB_PASSWORD, DB_DATABASE);
	$sql = "SELECT link_url FROM links WHERE (link_id = 2)";
	$result = mysqli_query($db->link, $sql);
	while($row = $result->fetch_assoc()) {
		echo $row['link_url'];
		$url = $row['link_url'];
	}
	header("Location: ".$url);
	$db->disconnect();
}
?>
<html>
<head>
	<!--Looking at the source code I see, thanks for being so interested!-->
	<meta charset="utf-8"> 
	<meta name="description" content="I'm Feeling Stacky! When you can't be bothered searching stack overflow yourself, just yolo it.">
	<meta name="keywords" content="im, feeling, stacky">
	<meta name="robots" content="index,follow">
	<meta content = "I'm Feeling Stacky! When you can't be bothered searching stack overflow yourself, just yolo it." name="Description">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>dwy shorty</title>
	<link rel='stylesheet' href='pub/style/style.css'/>
</head>
<body>
	<div class="grid-fluid">
		<div class="grid-container">
			<div class="row">
				<h1 class="center">PHP Url Shortener</h1>
			</div>
			<div class="row">
				<div class="col-8 offset-2">
					<h3 class="center">Link to shorten</h3>
				</div>
			</div>
			<div class="row">
				<div class="col-8 offset-2">
					<input type="text" name="searching" maxlength="124" placeholder="Link to shorten.">
					<button id="lets-go">Clicky</button>
				</div>
			</div>
			<div class="row">
				<div id="short-link">
					hey
				</div>
			</div>

		</div>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="pub/js/main.js"></script>
</body>
</html>