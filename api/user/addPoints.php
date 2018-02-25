<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once "../config/connect_db.php";

$database = new Database();
$db = $database->connect();
$data = json_decode(file_get_contents("php://input"));

$userID = $data->userID;
$points = $data->points;

$query = "SELECT points p FROM user WHERE userID = " . $userID;
$stmt = $db->prepare($query);
if ($stmt->execute()){
	extract($stmt->fetch(PDO::FETCH_ASSOC));
	$points += $p;
	$query = "UPDATE user SET points = '" . $points . "' WHERE userID =" . $userID;
	$stmt = $db->prepare($query);
	if ($stmt->execute()!=NULL){
		echo json_encode(array("message" => "0", "points" => $points));
	}
	else{
		echo json_encode(array("message" => "1"));
	}
}
else{
	echo json_encode(array("message" => "1"));
}

?>
