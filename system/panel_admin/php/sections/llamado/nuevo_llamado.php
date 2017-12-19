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
$type_accion='nuevo_llamado';

if($type_accion==="nuevo_llamado"){

//************************************************************************************************//	
	include "conexion.php";	
	/*
	$operationid =$data->{'Id_Operacion'};
	$idinscripto =$data->{'Id_Inscripto'};
	$status_pago =$data->{'Pago'};
  $detalle =$data->{'Detalle'};
	*/

  /*
  $id_vendedor=2;
  $id_cliente=3;
  $fecha_llamado='2011-03-14';
  $hora_llamado='17:00:01';
  $id_edificio=2;
  $id_planta=1;
  $id_dpto=5;
  $grado_interes=2;
  $nombre_origen_dato='letrero';
  $fecha_origen_dato='2017-06-14';
  $anotaciones='respondió en forma cortante';
  */
  
  $item="";

  $sql_insert='INSERT INTO llamado (id_llamado, id_vendedor, id_cliente, fecha_llamado, hora_llamado, id_edificio, id_planta, id_dpto, grado_interes, nombre_origen_dato, fecha_origen_dato, anotaciones) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  $idfirst=NULL; 

  $stmt_insert->bind_param('iiissiiiisss',$idfirst, $id_vendedor, $id_cliente, $fecha_llamado,      
      $hora_llamado, $id_edificio, $id_planta, $id_dpto, $grado_interes, $nombre_origen_dato, 
      $fecha_origen_dato, $anotaciones);

  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);

  echo $last_id;

  if($last_id!=0){
    $message="Se guardo un nuevo llamado";
  }else{
    $message="El nuevo llamado no se guardó";
  }

  //***************************************************************************************///

  $item=array('Message' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="nuevo_llamado")
   //agregar un json con el error si no se guardó en la BD

?>      