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

//$type_accion="nueva_fila";

if($type_accion==="nueva_fila" && isset($_SESSION['Usuario'])){
  
	include "../../conexion.php";		
	
  $id_cliente=$data->{'id_cliente'};   
  $id_vendedor=$data->{'id_vendedor'};
  $id_inmobiliaria=$data->{'id_inmobiliaria'};

  $sql_insert='INSERT INTO planilla_de_venta (id_planilla, id_cliente, id_vendedor, id_inmobiliaria) VALUES  (?,?,?,?)';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  $idfirst=NULL; 

  $stmt_insert->bind_param('iiii',$idfirst, $id_cliente, $id_vendedor, $id_inmobiliaria);

  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);

  if($last_id!=0){
    $message="Se guardo una nueva fila en la planilla";
  }else{
    $message="La nueva fila no se guardó";
  }

  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
  } //if($type_accion==="agregar_datos")
 
?>      