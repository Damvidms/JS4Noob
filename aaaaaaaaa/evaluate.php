<?php
// Conectar a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "js4noob";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: ". $conn->connect_error);
}

// Obtener ejercicio de la base de datos
$exerciseId = 1; // Id del ejercicio de suma
$sql = "SELECT * FROM exercises WHERE id = $exerciseId";
$result = $conn->query($sql);
$exercise = $result->fetch_assoc();

// Evaluar la función del usuario
$userFunctionCode = $_POST['functionCode'];
$inputValues = explode(',', $exercise['input_values']);
$result = eval("return $userFunctionCode(". implode(', ', $inputValues). ");");

// Verificar si la función se evaluó correctamente
if ($result === $exercise['expected_output']) {
  $evaluation = "Bien";
} else {
  $evaluation = "Mal";
}

// Devolver resultado
echo json_encode(['evaluation' => $evaluation]);

$conn->close();
?>