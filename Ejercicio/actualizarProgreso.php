<?php
session_start();
$id = $_SESSION["id"];
$conn = new mysqli('localhost', 'root', '', 'js4noob');
$id_ejercicio = $_POST['id'];
$sql = "SELECT * FROM progreso WHERE id_usuario = $id";
$result = $conn->query($sql);
// Si hay resultados
if ($result->num_rows > 0) {
    $sql_update = "UPDATE progreso SET id_ejercicio = $id_ejercicio WHERE id_usuario = $id";
    $conn->query($sql_update);
} else {
    $sql_insert = "INSERT INTO progreso (id_usuario, id_ejercicio) VALUES ($id, $id_ejercicio)";
    $conn->query($sql_insert);
}
$conn->close();
?>