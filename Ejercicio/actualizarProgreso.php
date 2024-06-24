<?php
// Inicia la sesión para acceder a variables de sesión
session_start();
// Asigna el valor de la variable de sesión "id" a la variable $id
$id = $_SESSION["id"];
// Crea una conexión a la base de datos con los parámetros de conexión
$conn = new mysqli('localhost', 'root', '', 'js4noob');
// Asigna el valor de la variable $_POST['id'] a la variable $id_ejercicio
$id_ejercicio = $_POST['id'];
// Crea una consulta SQL para seleccionar todos los registros de la tabla "progreso" donde 
//el campo "id_usuario" sea igual a $id
$sql = "SELECT * FROM progreso WHERE id_usuario = $id";
// Ejecuta la consulta SQL y asigna el resultado a la variable $result
$result = $conn->query($sql);
// Verifica si hay registros en el resultado de la consulta 
if ($result->num_rows > 0) {
    // Crea una consulta SQL para actualizar el registro de progreso del usuario, cambiando 
    //el campo "id_ejercicio" por $id_ejercicio
    $sql_update = "UPDATE progreso SET id_ejercicio = $id_ejercicio WHERE id_usuario = $id";
    // Ejecuta la consulta SQL de actualización
    $conn->query($sql_update);
} else {
    // Crea una consulta SQL para insertar un nuevo registro de progreso para el usuario
    $sql_insert = "INSERT INTO progreso (id_usuario, id_ejercicio) VALUES ($id, $id_ejercicio)";
    // Ejecuta la consulta SQL de inserción
    $conn->query($sql_insert);
}
// Cierra la conexión a la base de datos
$conn->close();
?>