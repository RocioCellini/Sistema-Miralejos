<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain");	
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);


$type_accion=$data->{'type_accion'};

//$type_accion='eliminar_llamado';

if($type_accion==="eliminar_llamado" && isset($_SESSION['Usuario'])){

//************************************************************************************************//	
	include "../../conexion.php";	

	//$id_llamado=2;

	$id_llamado=$data->{'id_llamado'};

	$sql='DELETE FROM llamado WHERE id_llamado=?';

	$stmt_delete = $conn->prepare($sql);
	if($stmt_delete === false) {
	trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
	}


	$stmt_delete->bind_param('i',$id_llamado);
	$stmt_delete->execute();

	$stmt_delete->close();

	$message="El llamado ha sido eliminado correctamente.";

//***************************************************************************************///

	$item=array('Mensaje' => utf8_encode($message));
	$json = json_encode($item);
	echo $json;
            
   } //if($type_accion==="eliminar_llamado")

?>      