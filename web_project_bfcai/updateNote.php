<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    $nid = $data['Nid'];
    $title = $data['title'];
    $details = $data['details'];
    $color = $data['color'];
    $tags = $data['tags']; 

    $stmt = $conn->prepare("UPDATE notes SET title = ?, details = ?, color = ?, tags = ? WHERE Nid = ?");
    $stmt->bind_param("ssssi", $title, $details, $color, $tags, $nid);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Note updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error updating note"]);
    }

    $stmt->close();
    $conn->close();
}
?>
