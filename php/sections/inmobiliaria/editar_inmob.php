<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain"); 
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};
//$type_accion='editar_inmob';

if($type_accion==="editar_inmob" && isset($_SESSION['Usuario'])){

//********************************************************************************************//  
  
  include "../../conexion.php"; 

  $id_inmobiliaria =$data->{'id_inmobiliaria'};
  $nombre =$data->{'nombre'};

 /*
  $id_inmobiliaria=2;
  $nombre='Prueba';
 */
  $item="";

  $result='UPDATE inmobiliaria SET nombre=? WHERE id_inmobiliaria=?';


  $stmt = $conn->prepare($result);

  if($stmt === false) {
                    trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
                    }

  $stmt->bind_param('si', $nombre, $id_inmobiliaria);

  $stmt->execute();

  $message="Los datos se actualizaron correctamente.";

  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
  } //Fin if($type_accion)

?>      
