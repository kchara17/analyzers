<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once "../config/connect_db.php";

$database = new Database();
$db = $database->connect();
$data = json_decode(file_get_contents("php://input"));

$binID = $data->binID;
$userID = $data->userID;
$problem = $data->problem;
$date = date("Y-m-d h:i:s");
$id=NULL;


$query = "INSERT INTO report (reportID ,binID, userID, problem, date)
				  VALUES (NULL, :binID, :userID, :problem, :date)";
$stmt = $db->prepare($query);
$stmt->bindParam(':binID',$binID);
$stmt->bindParam(':userID',$userID);
$stmt->bindParam(':problem',$problem);
$stmt->bindParam(':date',$date);
if ($stmt->execute()!=NULL){
	$query = "SELECT reportID id FROM report WHERE date = :date AND userID = :userID";
	$stmt = $db->prepare($query);
	$stmt->bindParam(':date',$date);
	$stmt->bindParam(':userID',$userID);
	$stmt->execute();
	$row = $stmt->fetch(PDO::FETCH_ASSOC);
	$id = $row["id"];
}

if ($id!=NULL){
	echo json_encode(array("message" => "0", "reportID" => $id));
}
else{
	echo json_encode(array("message" => "1"));
}

?>
