<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");


include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    $tid = $data['tid'];
    $name = $data['name'];
    $details = $data['details'];
    $subtasks = $data['subtasks'];
    $color = $data['color'];

    $stmt = $conn->prepare("UPDATE tasks SET name = ?, details = ?, subtasks = ?, color = ? WHERE tid = ?");
    $stmt->bind_param("ssssi", $name, $details, $subtasks, $color, $tid);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Task updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error updating task"]);
    }

    $stmt->close();
    $conn->close();
}
?>
