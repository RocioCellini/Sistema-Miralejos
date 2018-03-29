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
$type_accion='editar_operacion';

if($type_accion==="editar_operacion"){

//********************************************************************************************//  
  
  include "../../conexion.php"; 
  /*
  $operationid =$data->{'Id_Operacion'};
  $idinscripto =$data->{'Id_Inscripto'};
  $status_pago =$data->{'Pago'};
  $detalle =$data->{'Detalle'};
  */
  $id_operacion=1;
  $id_cliente=3;
  $id_vendedor=2;
  $fecha_ultimo_llamado='2015-03-14';
  $cant_llamados=5;
  $fecha_cierre_operacion='2015-04-16';
  $hora_cierre_operacion='16:00:01';
  $id_edificio=3;
  $id_planta=2;
  $id_dpto=1;
  $observaciones='excelente';

  $item="";

  $result='UPDATE operacion SET id_cliente=?, id_vendedor=?, fecha_ultimo_llamado=?, cant_llamados=?, fecha_cierre_operacion=?, hora_cierre_operacion=?, id_edificio=?, id_planta=?, id_dpto=?, observaciones=? WHERE id_operacion=?';


  $stmt = $conn->prepare($result);

  if($stmt === false) {
                    trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
                    }

  $stmt->bind_param('iisissiiisi', $id_cliente, $id_vendedor, $fecha_ultimo_llamado, $cant_llamados, $fecha_cierre_operacion, $hora_cierre_operacion, $id_edificio, $id_planta, $id_dpto, $observaciones, $id_operacion);

  $stmt->execute();

  $message="Los datos se actualizaron correctamente.";

  //***************************************************************************************///

  $item=array('Message' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="editar_operacion")
   //agregar un json con el error si no se guardó en la BD

?>      