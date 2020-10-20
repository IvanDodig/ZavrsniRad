<?php

header('Content-Type: application/json');

define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'eduroam');

$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}


$query = "SELECT client, DATE(STR_TO_DATE(vrijeme, '%a %b %e %H:%i:%s %Y'))as date, COUNT(*) as broj FROM auth WHERE loginSucces LIKE '%Login OK%' GROUP BY client, DATE(STR_TO_DATE(vrijeme, '%a %b %e %H:%i:%s %Y'))";

$result = $mysqli->query($query);

$data = array();
foreach ($result as $row) {
	$data[] = $row;
}

$result->close();

$mysqli->close();

print json_encode($data);