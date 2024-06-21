<?php
session_start();
$id = $_SESSION["id"];
$conn = new mysqli('localhost', 'root', '', 'js4noob');
$id = $_GET['id'];
$sql = "SELECT * FROM progreso WHERE id_usuario = $id";
$result = $conn->query($sql);
// Si hay resultados
if ($result->num_rows > 0) {

} else {

}
$conn->close();
?>