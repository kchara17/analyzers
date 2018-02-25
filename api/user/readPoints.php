<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/connect_db.php";

$database = new Database();
$db = $database->connect();
$id = isset($_GET["id"]) ? $_GET["id"] : NULL;
if ($id==NULL){
  echo json_encode(array("message" => "1"));
  return;
}

$query = "SELECT points FROM user WHERE userID = " . $id;
$stmt = $db->prepare($query);
$stmt->execute();
$num = $stmt->rowCount();

if($num>0){
  extract($stmt->fetch(PDO::FETCH_ASSOC));
  echo json_encode(array("message" => "0", "points" => $points));
}
else{
	echo json_encode(array("message" => "1"));
}

?>
