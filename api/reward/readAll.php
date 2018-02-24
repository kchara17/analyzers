<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/connect_db.php";

$database = new Database();
$db = $database->connect();

$query = "SELECT * FROM reward";
$stmt = $db->prepare($query);
$stmt->execute();
$num = $stmt->rowCount();

if($num>0){
	$rewards=array();
	$rewards["rewards"]=array();

	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		extract($row);
		$a_reward=array("rewardID" => $rewardID,"name" => $name,"description" => $description,"code" => $code,
                    "requiredPoints" => $requiredPoints);
		array_push($rewards["rewards"], $a_reward);
	}

	echo json_encode($rewards);
}
else{
	echo json_encode(array("message" => "No rewards found."));
}

?>
