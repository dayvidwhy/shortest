<?php include 'pub/scripts/pageload.php';?>
<html>
<head>
	<!--Looking at the source code I see, thanks for being so interested!-->
	<meta charset="utf-8"> 
	<meta name="description" content="Convert your long url into a sub 10 character link.">
	<meta name="keywords" content="url, shortener">
	<meta name="robots" content="index,follow">
	<meta content = "Convert your long url into a sub 10 character link." name="Description">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>dwy shorty</title>
	<link rel='stylesheet' href='pub/style/style.css'/>
</head>
<body>
	<div class="grid-fluid">
		<div class="grid-container">
			<div class="row hero-row">
				<h1 class="center">dwy.io</h1>
			</div>
			<div class="row hero-row">
				<h2 class="center">
					Shorten a Link in a single click
				</h2>
			</div>
			<div class="row hero-row center">
				<input type="text" name="searching" maxlength="124" placeholder="Link to shorten">
				<div class="col-4 offset-4">
					<button id="lets-go">Make it happen</button>
				</div>

			</div>
		</div>
	</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="pub/js/main.js"></script>
</body>
</html>