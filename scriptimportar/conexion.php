<?php
//datos para establecer la conexion con la base de mysql.

$DBServer = 'localhost'; // e.g 'localhost' or '192.168.1.100'
$DBUser   = 'rocio-miralejos';
$DBPass   = 'xbjppTexycItFhIg';
$DBName   = 'sistema_miralejos';

$conn = new mysqli($DBServer, $DBUser, $DBPass, $DBName);

if ($conn->connect_error) {
  trigger_error('Database connection failed: '  . $conn->connect_error, E_USER_ERROR);
} 


?>