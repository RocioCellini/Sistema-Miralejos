<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain");	
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

//$type_accion='eliminar_edificio';

if($type_accion==="eliminar_edificio" && isset($_SESSION['Usuario'])){

//************************************************************************************************//	
	include "../../conexion.php";	

	//$id_edificio=2;

	$id_edificio=$data->{'id_edificio'};
	$nombre =$data->{'nombre'};

	$sql='DELETE FROM edificio WHERE id_edificio=?';

	$stmt_delete = $conn->prepare($sql);
	if($stmt_delete === false) {
	trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
	}

	$stmt_delete->bind_param('i',$id_edificio);
	$stmt_delete->execute();

	$stmt_delete->close();

	$message='El edificio " '.$nombre.' " ha sido eliminado correctamente.';

//***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="eliminar_edificio")

?>      