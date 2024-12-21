<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $tid = isset($_GET['tid']) ? intval($_GET['tid']) : 0;
    
    if ($tid === 0) {
        echo json_encode(['error' => 'Invalid task ID']);
        exit();
    }

    $stmt = $conn->prepare("DELETE FROM tasks WHERE tid = ?");
    $stmt->bind_param("i", $tid);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Task deleted successfully']);
    } else {
        echo json_encode(['error' => 'Failed to delete task: ' . $conn->error]);
    }

    $stmt->close();
}

$conn->close();
?>