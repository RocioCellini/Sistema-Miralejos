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

if($type_accion==="nuevo_llamado" && isset($_SESSION['Usuario'])){

//************************************************************************************************//	
	include "../../conexion.php";	

  $id_vendedor=$data->{'id_vendedor'};
  $id_cliente=$data->{'id_cliente'};
  $fecha_llamado=$data->{'fecha_llamado'};
  $hora_llamado=$data->{'hora_llamado'};
  $id_edificio=$data->{'id_edificio'};
  $id_planta=$data->{'id_planta'};
  $id_dpto=$data->{'id_dpto'};
  $grado_interes=$data->{'grado_interes'};
  $id_origen_dato=$data->{'id_origen_dato'};
  $fecha_origen_dato=$data->{'fecha_origen_dato'};
  $anotaciones=$data->{'anotaciones'};

  $sql_insert='INSERT INTO llamado (id_llamado, id_vendedor, id_cliente, fecha_llamado, hora_llamado, id_edificio, id_planta, id_dpto, grado_interes, id_origen_dato, fecha_origen_dato, anotaciones) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  $idfirst=NULL; 

  $stmt_insert->bind_param('iiissiiiiiss',$idfirst, $id_vendedor, $id_cliente, $fecha_llamado,      
      $hora_llamado, $id_edificio, $id_planta, $id_dpto, $grado_interes, $id_origen_dato, 
      $fecha_origen_dato, $anotaciones);

  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);

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