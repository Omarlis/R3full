<?php
// Datos de conexión a la base de datos
$hostname = "sql306.byethost13.com";
$username = "b13_36891377";  
$password = "";     
$database = "b13_36891377_reciclaje_2025"; 


// Crear la conexión
$conexion = new mysqli($hostname, $username, $password, $database);
echo "Conexión11";
if ($conexion->connect_error) {
    echo "Conexión no exitosa a la base de datos.";
    die("Error de conexión: " . $conexion->connect_error);
}

echo "Conexión exitosa a la base de datos.";
?>
    