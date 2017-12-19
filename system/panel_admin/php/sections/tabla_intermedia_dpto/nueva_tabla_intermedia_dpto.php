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
$type_accion='nueva_ti_dpto';

if($type_accion==="nueva_ti_dpto"){

//************************************************************************************************//  
  include "../../conexion.php"; 
  /*
  $operationid =$data->{'Id_Operacion'};
  $idinscripto =$data->{'Id_Inscripto'};
  $status_pago =$data->{'Pago'};
  $detalle =$data->{'Detalle'};
  */
  $id_dpto=4;
  $id_planta=2;
  $id_edificio=6;

  $item="";

  $sql_insert='INSERT INTO tabla_intermedia_dpto (id_tabla, id_dpto, id_planta, id_edificio) VALUES
  (?,?,?,?)';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  $idfirst=NULL; 

  $stmt_insert->bind_param('iiii',$idfirst, $id_dpto, $id_planta, $id_edificio);

  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);

  echo $last_id;

  if($last_id!=0){
    $message="Se guardo una fila en la tabla_intermedia_dpto";
  }else{
    $message="La nueva fila en la tabla_intermedia_dpto no se guardó";
  }

  //***************************************************************************************///

  $item=array('Message' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="nueva_ti_dpto")
   //agregar un json con el error si no se guardó en la BD

?>      