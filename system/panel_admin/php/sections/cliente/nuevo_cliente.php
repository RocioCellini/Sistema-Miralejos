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


if($type_accion==="nuevo_cliente"){

//************************************************************************************************//	
	include "../../conexion.php";	
	

	$nombre=$data->{'nombre'};
  $apellido=$data->{'apellido'};
  $dni =$data->{'dni'};
	$telefono =$data->{'telefono'};
  $email =$data->{'email'};
  $id_provincia=$data->{'id_provincia'};
  $id_localidad=$data->{'id_localidad'};  
	$actividad =$data->{'actividad'};
  $conoce=$data->{'conoce'};
 


  /*$nombre='Rocio';
  $apellido='Cellini';
  $dni=33444444;
  $telefono=3541222;
  $email='rcellini@miralejos.net';
  $id_provincia=3;
  $id_localidad=5;
  $actividad='agropecuario';
  $conoce='si';*/

  $item="";

  $sql_insert='INSERT INTO cliente (id_cliente, nombre, apellido, dni, telefono, email, id_provincia, id_localidad, actividad, conoce) VALUES
  (?,?,?,?,?,?,?,?,?,?)';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  $idfirst=NULL; 

  $stmt_insert->bind_param('issiisiiss',$idfirst, $nombre, $apellido, $dni, $telefono, $email, $id_provincia, $id_localidad, $actividad, $conoce);

  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);

  echo $last_id;

  if($last_id!=0){
    $message="Se guardo un nuevo cliente";
  }else{
    $message="El nuevo cliente no se guardó";
  }

  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="nuevo_cliente")
   //agregar un json con el error si no se guardó en la BD

?>      