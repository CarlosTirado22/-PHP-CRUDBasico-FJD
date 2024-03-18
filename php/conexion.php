<?php 


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "prueba-tecnica";

$conexion = new mysqli($servername, $username, $password, $dbname);
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");

?>