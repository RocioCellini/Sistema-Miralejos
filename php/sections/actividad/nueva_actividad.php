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

if($type_accion==="nueva_actividad" && isset($_SESSION['Usuario'])){

//************************************************************************************************//	
	include "../../conexion.php";	
	
	$nombre =$data->{'nombre'};

  $sql_insert='INSERT INTO actividad (id_actividad, nombre) VALUES
  (?,?)';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  $idfirst=NULL; 

  $stmt_insert->bind_param('is',$idfirst, $nombre);

  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);

  if($last_id!=0){
    $message="Se guardo una nueva actividad";
  }else{
    $message="La nueva actividad no se guardó";
  }

  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
  } //if($type_accion==="nueva_actividad")
 
?>      