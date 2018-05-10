<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain");	
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

//$type_accion='eliminar_localidad';

if($type_accion==="eliminar_localidad" && isset($_SESSION['Usuario'])){

//************************************************************************************************//	
	include "../../conexion.php";	

	//$id_localidad=2383;

	$id_localidad=$data->{'id_localidad'};
	$nombre=$data->{'nombre'};

	$sql='DELETE FROM localidad WHERE id_localidad=?';

	$stmt_delete = $conn->prepare($sql);
	if($stmt_delete === false) {
	trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
	}

	$stmt_delete->bind_param('i',$id_localidad);
	$stmt_delete->execute();

	$stmt_delete->close();

	$message='La localidad " '.$nombre.' " ha sido eliminado correctamente.';

//***************************************************************************************///

    $item=array('Mensaje' => utf8_encode($message));
    $json = json_encode($item);
    echo $json;
            
   } //if($type_accion==="eliminar_localidad")

?>      