<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain"); 
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};
//$type_accion='editar_localidad';


if($type_accion==="editar_localidad" && isset($_SESSION['Usuario'])){

//********************************************************************************************//  
  
  include "../../conexion.php"; 
  
  $id_localidad =$data->{'id_localidad'};
  $id_provincia =$data->{'id_provincia'};
  $nombre =$data->{'nombre'};

  /*
  $id_localidad=1;
  $id_provincia=1;
  $nombre='25 de Mayo';
  */

  $item="";

  $result='UPDATE localidad SET id_provincia=?, nombre=? WHERE id_localidad=?';

  $stmt = $conn->prepare($result);

  if($stmt === false) {
                    trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
                    }

  $stmt->bind_param('isi', $id_provincia, $nombre, $id_localidad);

  $stmt->execute();

  $message="Los datos se actualizaron correctamente.";

  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="editar_localidad")

?>      