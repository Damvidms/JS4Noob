<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nickname = $_POST["username"];
    $contrasenya = $_POST["password"];

    $_SESSION["username"] = $nickname;

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "JS4Noob";

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $query = "SELECT * FROM usuario WHERE nickname = '$nickname'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        $hashContrasenya = $row["contrasenya"];
        $_SESSION["id"] = $row["id"];

        if (password_verify($contrasenya, $hashContrasenya)) {

            echo json_encode(array("success" => true));

        } else {
            echo json_encode(array("success" => false, "message" => "Error: Contraseña incorrecta"));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Error: nickname incorrecto"));
    }

    $conn->close();
}
?>