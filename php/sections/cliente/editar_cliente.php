<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain"); 
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

//$type_accion='editar_cliente';

if($type_accion==="editar_cliente" && isset($_SESSION['Usuario'])){

//********************************************************************************************//  
  
  include "../../conexion.php"; 
  
  $id_cliente =$data->{'id_cliente'};
  $nombre =$data->{'nombre'};
  $apellido =$data->{'apellido'};
  $id_tipo_cliente=$data->{'id_tipo_cliente'};
  $dni =$data->{'dni'};
  $telefono1 =$data->{'telefono1'};
  $telefono2 =$data->{'telefono2'};
  $email =$data->{'email'};
  $id_provincia =$data->{'id_provincia'};
  $id_localidad =$data->{'id_localidad'};
  $id_actividad =$data->{'id_actividad'};
  $conoce =$data->{'conoce'};
  
  /*
  $id_cliente=1;
  $nombre='Maria';
  $apellido='Cellini';
  $dni=555;
  $telefono1=4554545;
  $telefono2=4354545;
  $email='maria@miralejos.net';
  $id_provincia=3;
  $id_localidad=5;
  $id_actividad=2;
  $conoce='si';
*/
  $item="";

  $result='UPDATE cliente SET nombre=?, apellido=?, id_tipo_cliente=?, dni=?, telefono1=?, telefono2=?, email=?, id_provincia=?, id_localidad=?, id_actividad=?, conoce=? WHERE id_cliente=?';


  $stmt = $conn->prepare($result);

  if($stmt === false) {
                    trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
                    }

  $stmt->bind_param('ssiiiisiiisi', $nombre, $apellido, $id_tipo_cliente, $dni, $telefono1, $telefono2, $email, $id_provincia, $id_localidad, $id_actividad, $conoce, $id_cliente);

  $stmt->execute();

  $message="Los datos se actualizaron correctamente.";

  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;

  } //Fin if($type_accion)

?>      