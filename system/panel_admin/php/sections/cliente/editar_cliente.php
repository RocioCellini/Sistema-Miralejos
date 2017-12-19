<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain"); 
session_start();
//if(isset($_SESSION['Id_Usuario'])) {

$json = file_get_contents('php://input');
$data=json_decode($json);


//$type_accion=$data->{'type_accion'};
$type_accion='editar_cliente';

if($type_accion==="editar_cliente"){

//********************************************************************************************//  
  
  include "conexion.php"; 
  /*
  $operationid =$data->{'Id_Operacion'};
  $idinscripto =$data->{'Id_Inscripto'};
  $status_pago =$data->{'Pago'};
  $detalle =$data->{'Detalle'};
  */
  $id_cliente=1;
  $nombre='Maria';
  $apellido='Cellini';
  $dni=555;
  $telefono=54545;
  $email='maria@miralejos.net';
  $id_provincia=3;
  $id_localidad=5;
  $actividad='abogada';
  $conoce='si';

  $item="";

  $result='UPDATE cliente SET nombre=?, apellido=?, dni=?, telefono=?, email=?, id_provincia=?, id_localidad=?, actividad=?, conoce=? WHERE id_cliente=?';


  $stmt = $conn->prepare($result);

  if($stmt === false) {
                    trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
                    }

  $stmt->bind_param('ssiisiissi', $nombre, $apellido, $dni, $telefono, $email, $id_provincia, $id_localidad, $actividad, $conoce, $id_cliente);

  $stmt->execute();

  $message="Los datos se actualizaron correctamente.";

  //***************************************************************************************///

  $item=array('Message' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="editar_cliente")
   //agregar un json con el error si no se guardó en la BD

?>      