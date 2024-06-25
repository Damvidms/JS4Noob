<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nickname = $_POST["nickname"];
    $contrasenya = $_POST["contrasenya"];
    $correo = $_POST["correo"];


    $hashContrasenya = password_hash($contrasenya, PASSWORD_DEFAULT);

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "JS4Noob";

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $queryCheckUser = "SELECT * FROM usuario WHERE nickname = '$nickname'";
    $resultCheckUser = $conn->query($queryCheckUser);
    $queryCheckEmail = "SELECT * FROM usuario WHERE correo = '$correo'";
    $resultCheckEmail = $conn->query($queryCheckEmail);

    if ($resultCheckUser->num_rows > 0) {
        echo json_encode(array("success" => false, "message" => "Error: El nombre de usuario ya está en uso."));
    } elseif ($resultCheckEmail->num_rows > 0) {
        echo json_encode(array("success" => false, "message" => "Error: El correo electrónico ya está en uso."));
    } else {
        $query = "INSERT INTO Usuario (nickname, correo, contrasenya ) VALUES ('$nickname', '$correo', '$hashContrasenya')";

        if ($conn->query($query) === TRUE) {
            $_SESSION["nombreUsuario"] = $nickname;
            $id = $conn->insert_id; 
            $_SESSION["id"] = $id;
            echo json_encode(array("success" => true, "message" => "Registro exitoso"));
        } else {
            echo json_encode(array("success" => false, "message" => "Error al insertar datos: " . $conn->error));
        }
    }

    $conn->close();
}
?>