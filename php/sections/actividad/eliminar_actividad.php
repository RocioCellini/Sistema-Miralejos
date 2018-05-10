<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain");	
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);


$type_accion=$data->{'type_accion'};

//$type_accion='eliminar_act';

if($type_accion==="eliminar_act" && isset($_SESSION['Usuario'])){

//************************************************************************************************//	
	include "../../conexion.php";	

	$id_actividad=$data->{'id_actividad'};
	$nombre=$data->{'nombre'};

	$sql='DELETE FROM actividad WHERE id_actividad=?';

	$stmt_delete = $conn->prepare($sql);
	if($stmt_delete === false) {
	trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
	}


	$stmt_delete->bind_param('i',$id_actividad);
	$stmt_delete->execute();

	$stmt_delete->close();

	$message='La actividad " '.$nombre.' " ha sido eliminada correctamente.';

//***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="eliminar_actividad")

?>      