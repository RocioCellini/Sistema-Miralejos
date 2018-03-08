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

//$type_accion="nuevo_origen";

if($type_accion==="nuevo_origen"){

//************************************************************************************************//	
	include "../../conexion.php";	
	
	$origen_dato =$data->{'origen_dato'};
  //$origen_dato="Letrero";

  $sql_insert='INSERT INTO origen_dato (id_origen_dato, origen_dato) VALUES ( ?,? )';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  $idfirst=NULL; 

  //echo($origen_dato);

  $stmt_insert->bind_param('is',$idfirst, $origen_dato);

  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);

  if( $last_id!=0 ) {
   
    $message="Se guardo un nuevo origen";
  
  }else{
  
    $message="El nuevo origen no se guardó";
  
  }

  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
  } //if($type_accion==="nuevo_edificio")

?>      