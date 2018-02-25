<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/connect_db.php";

$database = new Database();
$db = $database->connect();

$query = "SELECT reportID, b.binID binID, problem, date, type, latitude, longitude, address, type FROM report r JOIN bin b on r.binID = b.binID WHERE fixed = 0";
$stmt = $db->prepare($query);
$stmt->execute();
$num = $stmt->rowCount();

if($num>0){
	$reports=array();
	$reports["reports"]=array();

	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		extract($row);
		$a_report=array("reportID" => $reportID,"binID" => $binID, "problem" => $problem, "type" => $type,
                    "date" => $date,"latitude" => $latitude, "longitude" => $longitude, "address" => $address);
		array_push($reports["reports"], $a_report);
	}

	echo json_encode($reports);
}
else{
	echo json_encode(array("message" => "No reports found."));
}

?>
