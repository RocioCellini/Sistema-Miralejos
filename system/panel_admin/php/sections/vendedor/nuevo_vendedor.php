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
$type_accion='nuevo_vendedor';

if($type_accion==="nuevo_vendedor"){

//************************************************************************************************//	
	include "../../conexion.php";	
	
	$nombre =$data->{'nombre'};
	$email =$data->{'email'};

	
 

  $sql_insert='INSERT INTO vendedor (id_vendedor, nombre, email) VALUES
  (?,?,?)';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  $idfirst=NULL; 
  $stmt_insert->bind_param('iss',$idfirst, $nombre, $email);


  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);

 

  if($last_id!=0){
    $data_responde="Se guardo un nuevo vendedor";
  }else{
    $data_responde="El nuevo vendedor no se guardó";
  }



  //***************************************************************************************///
  $arr2=array('MessageComment'=>$data_responde);
  
  $json = json_encode($arr2);
  echo $json;
     
   } //if($type_accion==="nuevo_vendedor")
   //agregar un json con el error si no se guardó en la BD

?>      