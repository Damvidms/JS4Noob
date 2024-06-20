<?php
// Conexión a la base de datos
$conn = new mysqli('localhost', 'root', '', 'js4noob');

// Consulta SQL para seleccionar un ejercicio aleatorio
$sql = "SELECT * FROM ejercicio WHERE id = 1";
$result = $conn->query($sql);

// Si hay resultados
if ($result->num_rows > 0) {
    // Obtener el ejercicio
    $exercise = $result->fetch_assoc();

    // Devolver el ejercicio en formato JSON
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
    // Si no hay ejercicios, devolver un error
    http_response_code(500);
    echo json_encode(array('error' => 'No hay ejercicios disponibles'));
}

$conn->close();
?>