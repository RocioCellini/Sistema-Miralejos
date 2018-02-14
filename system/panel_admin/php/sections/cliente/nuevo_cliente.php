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

//$type_accion="nuevo_cliente";

if ($type_accion==="nuevo_cliente") {

//************************************************************************************************//	
	include "../../conexion.php";	
	
	$nombre=$data->{'nombre'};
  $apellido=$data->{'apellido'};
  $dni =$data->{'dni'};
	$telefono1 =$data->{'telefono1'};
  $telefono2 =$data->{'telefono2'};
  $email =$data->{'email'};
  $id_provincia=$data->{'id_provincia'};
  $id_localidad=$data->{'id_localidad'};  
	$actividad =$data->{'actividad'};
  $conoce=$data->{'conoce'};

/*
  $nombre="mariana";
  $apellido="colidio";
  $dni =3345566;
  $telefono1 =455664;
  $telefono2 =344567;
  $email ="mariana@gmail.com";
  $id_provincia=1;
  $id_localidad=26;  
  $actividad ="escribana";
  $conoce=1;
 */
  $sql_insert='INSERT INTO cliente (id_cliente, nombre, apellido, dni, telefono1, telefono2, email, id_provincia, id_localidad, actividad, conoce) VALUES
  (?,?,?,?,?,?,?,?,?,?,?)';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  $idfirst=NULL; 

  $stmt_insert->bind_param('issiiisiiss',$idfirst, $nombre, $apellido, $dni, $telefono1, $telefono2, $email, $id_provincia, $id_localidad, $actividad, $conoce);

  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);


  if($last_id!=0){
    $message="Se guardo un nuevo cliente";
  }else{
    $message="El nuevo cliente no se guard�";
  }

  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="nuevo_cliente")

?>      