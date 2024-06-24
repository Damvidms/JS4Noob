<?php
$conn = new mysqli('localhost', 'root', '', 'js4noob');
$sql = "SELECT * FROM Teoria";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $teorias = array();
    while ($teoria = $result->fetch_assoc()) {
        $teorias[] = array(
            'id' => $teoria['id'],
            'titulo' => $teoria['titulo'],
            'descripcion' => $teoria['descripcion'],
        );
    }
    echo json_encode($teorias);
} else {
    http_response_code(500);
    echo json_encode(array('error' => 'No hay ejercicios disponibles'));
}
$conn->close();
?>