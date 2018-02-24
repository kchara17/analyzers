<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/connect_db.php";

$database = new Database();
$db = $database->connect();

$query = "SELECT * FROM report";
$stmt = $db->prepare($query);
$stmt->execute();
$num = $stmt->rowCount();

if($num>0){
	$reports=array();
	$reports["reports"]=array();

	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		extract($row);
		$a_report=array("reportID" => $reportID,"binID" => $binID,"userID" => $userID,"problem" => $problem,
                    "date" => $date,"fixed" => $fixed, "fix_date" => $fix_date);
		array_push($reports["reports"], $a_report);
	}

	echo json_encode($reports);
}
else{
	echo json_encode(array("message" => "No reports found."));
}

?>
