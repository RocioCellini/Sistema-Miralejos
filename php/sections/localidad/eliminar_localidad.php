<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain");	
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);


//$type_accion=$data->{'type_accion'};


$type_accion='eliminar_localidad';

if($type_accion==="eliminar_localidad" && isset($_SESSION['Usuario'])){

//************************************************************************************************//	
	include "../../conexion.php";	

	$id_localidad=2383;

	$sql='DELETE FROM localidad WHERE id_localidad=?';

	$stmt_delete = $conn->prepare($sql);
	if($stmt_delete === false) {
	trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
	}


	$stmt_delete->bind_param('i',$id_localidad);
	$stmt_delete->execute();

	//echo $stmt->affected_rows;
	$stmt_delete->close();

	$message="La localidad ha sido eliminado correctamente.";

//***************************************************************************************///

  $item=array('Message' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="eliminar_localidad")
   //agregar un json con el error si no se guardó en la BD

?>      