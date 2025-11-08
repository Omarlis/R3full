<?php
include 'conexion.php'; 
echo "Conexión";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$nombre = $_POST["nombre"];
$email = $_POST["email"];

$nombre = $conn->real_escape_string($nombre);
$email = $conn->real_escape_string($email);

$sql = "INSERT INTO b13_36891377_reciclaje_2025 (nombre, email) VALUES ('$nombre', '$email')"; 

if ($conn->query($sql) === TRUE) {
echo "Datos insertados correctamente en ByetHost";
} else {
echo "Error: " . $sql . "<br>" . $conn->error;
}
}

$conn->close();
?>