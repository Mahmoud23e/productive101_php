<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $name = $data['name'];
    $details = $data['details'];
    $subtasks = $data['subtasks'];
    $color = $data['color'];

    $stmt = $conn->prepare("INSERT INTO tasks (name, details, subtasks, color) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $details, $subtasks, $color);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Task added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error adding task"]);
    }

    $stmt->close();
    $conn->close();
}
?>
