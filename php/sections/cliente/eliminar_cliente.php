<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain");	
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);


$type_accion=$data->{'type_accion'};
//$type_accion='eliminar_cliente';


if($type_accion==="eliminar_cliente" && isset($_SESSION['Usuario']) ) {

//************************************************************************************************//	
	include "../../conexion.php";	

	//$id_cliente=26;

	$id_cliente=$data->{'id_cliente'};
	$nombre =$data->{'nombre'};
    $apellido =$data->{'apellido'};
    $nombre_completo=$apellido.", ".$nombre;


	$sql='DELETE FROM cliente WHERE id_cliente=?';

	$stmt_delete = $conn->prepare($sql);

	if($stmt_delete === false) {
	trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
	}

	$stmt_delete->bind_param('i',$id_cliente);
	$stmt_delete->execute();

	$stmt_delete->close();

	$message="El cliente ".$nombre_completo." ha sido eliminado correctamente.";

//***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="eliminar_cliente")
   //agregar un json con el error si no se guardó en la BD

?>      