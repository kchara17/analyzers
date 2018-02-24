<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/connect_db.php";

$database = new Database();
$db = $database->connect();
$id = isset($_GET["id"]) ? $_GET["id"] : die();

$query = "SELECT * FROM bin WHERE binID = " . $id;
$stmt = $db->prepare($query);
$stmt->execute();
$num = $stmt->rowCount();

if($num>0){
  extract($stmt->fetch(PDO::FETCH_ASSOC));
  $bin=array("binID" => $binID,"type" => $type,"latitude" => $latitude,"longitude" => $longitude,"threshold" => $threshold, "address" => $address);
  echo json_encode($bin);
}
else{
	echo json_encode(array("message" => "No bin found."));
}

?>
