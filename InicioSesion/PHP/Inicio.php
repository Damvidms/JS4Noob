<?php
session_start();

// Verificamos si se ha realizado una petición POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nickname = $_POST["username"];
    $contrasenya = $_POST["password"];

    // Almacenamos el nickname en la sesión
    $_SESSION["username"] = $nickname;

    // Configuración de la conexión a la base de datos
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "JS4Noob";

    $conn = new mysqli($servername, $username, $password, $database);

    // Verificamos si hay un error en la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Consulta para buscar el usuario por nickname
    $query = "SELECT * FROM usuario WHERE nickname = '$nickname'";
    $result = $conn->query($query);

    // Verificamos si se encontró un usuario
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $hashContrasenya = $row["contrasenya"];
        $_SESSION["id"] = $row["id"];

        // Verificamos si la contraseña es válida
        if (password_verify($contrasenya, $hashContrasenya)) {
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("success" => false, "message" => "Error: Contraseña incorrecta"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Error: nickname incorrecto"));
    }

    // Cerramos la conexión a la base de datos
    $conn->close();
}
?>