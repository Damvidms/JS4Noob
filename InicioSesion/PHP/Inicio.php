<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nickname = $_POST["username"];
    $contrasenya = $_POST["password"];

    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "JS4Noob";

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $query = "SELECT * FROM Usuarios WHERE nickname = '$nickname'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        $hashContrasenya = $row["Contraseña"];

        if (password_verify($contrasenya, $hashContrasenya)) {


            $_SESSION["nombreUsuario"] = $row["Nombre"];
            if ($row["Admin"] == 1) {
                header("Location: ../../../AdminDashboard/AdminDashboard.html");
                exit();
            } else {
                header("Location: ../../../Code/content/HTML/content.html");
                exit();
            }

        } else {
            echo "Error: Contraseña incorrecta.";
        }
    } else {
        echo "Error: Correo electrónico no encontrado.";
    }

    $conn->close();
}
?>