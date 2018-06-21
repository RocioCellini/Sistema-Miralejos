<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain");	
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

//$type_accion=$data->{'type_accion'};  && isset($_SESSION['Usuario'])

$type_accion="nuevo_llamado";

if($type_accion==="nuevo_llamado"){

//************************************************************************************************//	
	include "../../conexion.php";	
/*
  $id_vendedor=$data->{'id_vendedor'};
  $id_cliente=$data->{'id_cliente'};
  $fecha_llamado=$data->{'fecha_llamado'};
  $hora_llamado=$data->{'hora_llamado'};
  $id_edificio=$data->{'id_edificio'};
  $id_planta=$data->{'id_planta'};
  $id_dpto=$data->{'id_dpto'};
  $id_inmobiliaria=$data->{'id_inmobiliaria'};
  $id_cierre_operacion=$data->{'id_cierre_operacion'};
  $fecha_cierre_operacion=$data->{'fecha_cierre_operacion'};  
  $grado_interes=$data->{'grado_interes'};
  $id_origen_dato=$data->{'id_origen_dato'};
  $fecha_origen_dato=$data->{'fecha_origen_dato'};
  $anotaciones=$data->{'anotaciones'};
*/

  $id_vendedor=1;
  $id_cliente=1;
  $fecha_llamado="21/06/2018";
  $hora_llamado="04:00:00";
  $id_edificio=5;
  $id_planta=1;
  $id_dpto=1;
  $id_inmobiliaria=1;
  $id_cierre_operacion=1;
  $fecha_cierre_operacion="28/06/2018";  
  $grado_interes=2;
  $id_origen_dato=4;
  $fecha_origen_dato="22/06/2018";
  $anotaciones="dxrsgrg";


  $sql_insert='INSERT INTO llamado (id_llamado, id_vendedor, id_cliente, fecha_llamado, hora_llamado, id_edificio, id_planta, id_dpto, id_inmobiliaria, id_cierre_operacion, fecha_cierre_operacion, grado_interes, id_origen_dato, fecha_origen_dato, anotaciones) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  $idfirst=NULL; 

  $stmt_insert->bind_param('iiissiiiiisiiss',$idfirst, $id_vendedor, $id_cliente, $fecha_llamado,      
      $hora_llamado, $id_edificio, $id_planta, $id_dpto, $id_inmobiliaria, $id_cierre_operacion, 
      $fecha_cierre_operacion, $grado_interes, $id_origen_dato, 
      $fecha_origen_dato, $anotaciones);

  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);

  echo($last_id)."</br>"; 

  /*mysqli_insert_id() : devuelve el valor de el campo AUTO_INCREMENT que fué actualizado por la consulta anterior. Devuelve cero si no hubo una consulta previa en la conexión o si la consulta no actualiza un valor AUTO_INCREMENT.*/

  if($last_id!=0){
    $message="Se guardo un nuevo llamado";
  }else{
    $message="El nuevo llamado no se guardó";
  }


  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="nuevo_llamado")

?>      