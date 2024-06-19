<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "js4noob"; // Nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Connection failed: ". $conn->connect_error);
}

$sql = "SELECT id, seccion, descripcion, funcName, input, output FROM ejercicio WHERE id = 1"; // Ajusta según sea necesario
$result = $conn->query($sql);
if ($result->num_rows > 0) {

    $row = $result->fetch_assoc();

    if (!empty($row['input']) &&!empty($row['output'])) {

        $exercise = array(

            'id' => $row['id'],
            'seccion' => $row['seccion'],
            'descripcion' => $row['descripcion'],
            'funcName' => $row['funcName'],
            'input' => json_encode($row['input']), // Codificar input como JSON
            'output' => $row['output'],
            'testCases' => array(
                array('input' => json_encode($row['input']), 'output' => $row['output']) // Codificar input como JSON
            )
        );
    } else {
        $exercise = array("error" => "No exercise found or empty test cases");
    }
    echo json_encode($exercise); // Devolver objeto exercise como JSON
} else {
    echo json_encode(array("error" => "No exercise found"));
}
?>