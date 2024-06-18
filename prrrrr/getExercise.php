<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "js4noob"; // Nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, seccion, descripcion, funcName, input, output FROM ejercicio WHERE id = 5"; // Ajusta según sea necesario
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Obtener datos del ejercicio
    $row = $result->fetch_assoc();

    // Construir objeto exercise para devolver como JSON
    $exercise = array(
        'id' => $row['id'],
        'seccion' => $row['seccion'],
        'descripcion' => $row['descripcion'],
        'funcName' => $row['funcName'],
        'input' => $row['input'], // Asumiendo que input ya está en formato JSON válido como una cadena
        'output' => $row['output'],
        'testCases' => array(
            array(
                'input' => $row['input'],
                'output' => $row['output']
            )
        )
    );

    echo json_encode($exercise); // Devolver objeto exercise como JSON
} else {
    echo json_encode(array("error" => "No exercise found"));
}

$conn->close();
?>