<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");


include 'db.php';

$result = $conn->query("SELECT * FROM notes");

$notes = [];
while ($row = $result->fetch_assoc()) {
    $notes[] = $row; 
}

echo json_encode($notes);

$conn->close();
?>
