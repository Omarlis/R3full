<?php
include 'conexion.php'; // Incluir el archivo de conexión

if ($_SERVER["REQUEST_METHOD"] == "POST") {
$nombre = $_POST["nombre"];
$email = $_POST["email"];

// Escapar caracteres especiales para prevenir inyección SQL
$nombre = $conn->real_escape_string($nombre);
$email = $conn->real_escape_string($email);

$sql = "INSERT INTO usuarios (nombre, email) VALUES ('$nombre', '$email')"; //Reemplaza "tu_tabla"

if ($conn->query($sql) === TRUE) {
echo "Datos insertados correctamente en ByetHost";
} else {
echo "Error: " . $sql . "<br>" . $conn->error;
}
}

$conn->close();
?>