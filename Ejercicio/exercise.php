<?php
$conn = new mysqli('localhost', 'root', '', 'js4noob');
$id = $_POST['id'];
$sql = "SELECT * FROM ejercicio WHERE id = $id";
$result = $conn->query($sql);
// Si hay resultados
if ($result->num_rows > 0) {
    $exercise = $result->fetch_assoc();
    $response = array(
        'seccion' => $exercise['seccion'],
        'descripcion' => $exercise['descripcion'],
        'funcName' => $exercise['funcName'],
        'inputParams' => json_decode($exercise['inputParams'], true),
        'inputValues' => json_decode($exercise['inputValues'], true),
        'expectedOutput' => $exercise['expectedOutput'],
    );
    echo json_encode($response);
} else {
    http_response_code(500);
    echo json_encode(array('error' => 'No hay ejercicios disponibles'));
}
$conn->close();
?>