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
$type_accion='nueva_operacion';

if($type_accion==="nueva_operacion"){

//************************************************************************************************//	
	include "../../conexion.php";	
	/*
	$operationid =$data->{'Id_Operacion'};
	$idinscripto =$data->{'Id_Inscripto'};
	$status_pago =$data->{'Pago'};
  $detalle =$data->{'Detalle'};
	*/
  $id_cliente=2;
  $id_vendedor=22;
  $fecha_ultimo_llamado='2011-03-14';
  $cant_llamados=5;
  $fecha_cierre_operacion='2011-03-16';
  $hora_cierre_operacion='17:00:01';
  $id_edificio=4;
  $id_planta=3;
  $id_dpto=2;
  $observaciones='todo tranquilo';

  $item="";

  $sql_insert='INSERT INTO operacion (id_operacion, id_cliente, id_vendedor, fecha_ultimo_llamado, cant_llamados, fecha_cierre_operacion, hora_cierre_operacion, id_edificio, id_planta, id_dpto, observaciones) VALUES (?,?,?,?,?,?,?,?,?,?,?)';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  $idfirst=NULL; 

  $stmt_insert->bind_param('iiisissiiis',$idfirst, $id_cliente, $id_vendedor, $fecha_ultimo_llamado, $cant_llamados, $fecha_cierre_operacion, $hora_cierre_operacion, $id_edificio, $id_planta, $id_dpto, $observaciones);

  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);

  echo $last_id;

  if($last_id!=0){
    $message="Se guardo una nueva operacion";
  }else{
    $message="La nueva operacion no se guardó";
  }//en este caso el msg no se muestra bien

  //***************************************************************************************///

  $item=array('Message' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="nueva_operacion")
   //agregar un json con el error si no se guardó en la BD

?>      