<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $nid = $data['Nid'];

    $stmt = $conn->prepare("DELETE FROM notes WHERE Nid = ?");
    $stmt->bind_param("i", $nid);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Note deleted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error deleting note"]);
    }

    $stmt->close();
    $conn->close();
}
?>
