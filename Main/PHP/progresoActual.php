<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "js4noob";

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $id = $_SESSION["id"];

    $query = "SELECT * FROM progreso where id_usuario = $id";
    $result = $conn->query($query);

    if ($result && $result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        echo json_encode(array("error" => "No se encontro progreso"));
    }

    $conn->close();
}
?>