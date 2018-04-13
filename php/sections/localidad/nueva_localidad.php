<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain"); 
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

//$type_accion="nueva_localidad";

if($type_accion==="nueva_localidad" && isset($_SESSION['Usuario'])){

//*******************************************************************************************//  
  include "../../conexion.php"; 
  
  $id_provincia =$data->{'id_provincia'};
  $nombre =$data->{'nombre'};

 // $id_provincia=22; 
 // $nombre="Casas";


  $sql_insert='INSERT INTO localidad (id_localidad, id_provincia, nombre) VALUES
  (?,?,?)';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  $idfirst=NULL; 

  $stmt_insert->bind_param('iis',$idfirst, $id_provincia, $nombre);

  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);

  if($last_id!=0){
    $message="Se guardo una nueva localidad";
  }else{
    $message="La nueva localidad no se guard�";
  }

  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
  } //if($type_accion==="nueva_localidad")
 
?>      

