<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain");	
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

//$type_accion='eliminar_origen';

if($type_accion==="eliminar_origen" && isset($_SESSION['Usuario'])){

//************************************************************************************************//	
	include "../../conexion.php";	

	$id_origen_dato=$data->{'id_origen_dato'};
	$origen_dato =$data->{'origen_dato'};

	$sql='DELETE FROM origen_dato WHERE id_origen_dato=?';

	$stmt_delete = $conn->prepare($sql);
	if($stmt_delete === false) {
	trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
	}


	$stmt_delete->bind_param('i',$id_origen_dato);
	$stmt_delete->execute();

	$stmt_delete->close();

	$message='El origen del dato " '.$origen_dato.' " ha sido eliminado correctamente.';

//***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="eliminar_origen")

?>      