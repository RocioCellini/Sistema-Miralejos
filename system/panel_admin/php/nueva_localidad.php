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
$type_accion='nueva_localidad';

if($type_accion==="nueva_localidad"){

//************************************************************************************************//	
	include "conexion.php";	
	/*
	$operationid =$data->{'Id_Operacion'};
	$idinscripto =$data->{'Id_Inscripto'};
	$status_pago =$data->{'Pago'};
  $detalle =$data->{'Detalle'};
	*/
  $id_localidad=2383;
  $id_provincia=22;
  $nombre='pueblo casas';

  $item="";

  $sql_insert='INSERT INTO localidad (id_localidad, id_provincia, nombre) VALUES (?,?,?)';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  //$idfirst=NULL; 

  $stmt_insert->bind_param('iis',$id_localidad, $id_provincia, $nombre);

  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);

  echo $last_id;

  if($last_id!=0){
    $message="Se guardo una nueva localidad";
  }else{
    $message="La nueva localidad no se guard�";
  }//en este caso el msg no se muestra bien

  //***************************************************************************************///

  $item=array('Message' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="nueva_localidad")
   //agregar un json con el error si no se guard� en la BD

?>      