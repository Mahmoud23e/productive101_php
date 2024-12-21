<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");


include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $title = $data['title'];
    $details = $data['details'];
    $color = $data['color'];
    $tags = $data['tags']; 

    $stmt = $conn->prepare("INSERT INTO notes (title, details, color, tags) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $title, $details, $color, $tags);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Note added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error adding note"]);
    }

    $stmt->close();
    $conn->close();
}
?>
