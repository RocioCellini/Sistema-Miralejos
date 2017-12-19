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
$type_accion='editar_ti_dpto';

if($type_accion==="editar_ti_dpto"){

//********************************************************************************************//  
  
  include "../../conexion.php"; 
  /*
  $operationid =$data->{'Id_Operacion'};
  $idinscripto =$data->{'Id_Inscripto'};
  $status_pago =$data->{'Pago'};
  $detalle =$data->{'Detalle'};
  */

  $id_tabla=1;
  $id_dpto=5;
  $id_planta=3;
  $id_edificio=6;

  $item="";

  $result='UPDATE tabla_intermedia_dpto SET id_dpto=?, id_planta=?, id_edificio=? WHERE id_tabla=?';


  $stmt = $conn->prepare($result);

  if($stmt === false) {
                    trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
                    }

  $stmt->bind_param('iiii', $id_dpto, $id_planta, $id_edificio, $id_tabla);

  $stmt->execute();

  $message="Los datos se actualizaron correctamente.";

  //***************************************************************************************///

  $item=array('Message' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="editar_ti_dpto")
   //agregar un json con el error si no se guardó en la BD

?>      
