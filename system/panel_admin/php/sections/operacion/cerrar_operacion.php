<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain");	
session_start();
//if(isset($_SESSION['Id_Usuario'])) {

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

if($type_accion==="cerrar_operacion"){

//************************************************************************************************//	
	include "../../conexion.php";	
	
	$id_cliente =$data->{'id_cliente'};
	$id_vendedor =$data->{'id_vendedor'};
	$fecha_ultimo_llamado =$data->{'fecha_ultimo_llamado'};
  $cant_llamados =$data->{'cant_llamados'};
  $fecha_cierre_operacion =$data->{'fecha_cierre_operacion'};
  $hora_cierre_operacion =$data->{'hora_cierre_operacion'};
  $id_edificio =$data->{'id_edificio'};
  $id_planta =$data->{'id_planta'};
  $id_dpto =$data->{'id_dpto'};
  $observaciones =$data->{'observaciones'}; 

  $sql_insert='INSERT INTO operacion (id_operacion, id_cliente, id_vendedor, fecha_ultimo_llamado, cant_llamados, fecha_cierre_operacion, hora_cierre_operacion, id_edificio, id_planta, id_dpto, observaciones) VALUES (?,?,?,?,?,?,?,?,?,?,?)';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  $idfirst=NULL; 

  $stmt_insert->bind_param('iiisissiiis',$idfirst, $id_cliente, $id_vendedor, $fecha_ultimo_llamado, $cant_llamados, $fecha_cierre_operacion, $hora_cierre_operacion, $id_edificio, $id_planta, $id_dpto, $observaciones);

  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);

  if($last_id!=0){
    $message="Se guardo una nueva operacion";
  }else{
    $message="La nueva operacion no se guardó";
  }

  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="nueva_operacion")

?>      