<?php
class MySQLDatabase {
	var $link;
	function connect($user, $password, $database) {
		$this->link = mysqli_connect(DB_HOSTNAME, $user, $password);
		if (!$this->link) {
			die('not connected : ' . mysqli_error($this->link));
		}
		$db = mysqli_select_db($this->link, $database);
		if (!$db) {
			die('Cannot use : ' . mysqli_error($this->link));
		}
		return $this->link;
	}
	function disconnect() {
		mysqli_close($this->link);
	}
}
?>

