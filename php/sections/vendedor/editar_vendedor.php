<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain"); 
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};
//$type_accion='editar_vendedor';

if($type_accion==="editar_vendedor" && isset($_SESSION['Usuario'])){

//********************************************************************************************//  
  
  include "../../conexion.php"; 

  $id_vendedor =$data->{'id_vendedor'};
  $nombre =$data->{'nombre'};
  $email =$data->{'email'};
 /*
  $id_vendedor=2;
  $nombre='Pablo';
  $email='pperlo@miralejos.net';
 */
  $item="";

  $result='UPDATE vendedor SET nombre=?, email=? WHERE id_vendedor=?';


  $stmt = $conn->prepare($result);

  if($stmt === false) {
                    trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
                    }

  $stmt->bind_param('ssi', $nombre, $email, $id_vendedor);

  $stmt->execute();

  $message="Los datos se actualizaron correctamente.";

  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
  } //Fin if($type_accion)

?>      
