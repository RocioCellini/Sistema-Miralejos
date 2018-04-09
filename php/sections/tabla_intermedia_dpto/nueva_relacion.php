<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain"); 

session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);


$type_accion=$data->{'type_accion'};

//$type_accion="nueva_relacion";

if($type_accion==="nueva_relacion" && isset($_SESSION['Usuario'])){

//************************************************************************************************//  
  include "../../conexion.php"; 
  
  $id_dpto =$data->{'id_dpto'};
  $id_planta =$data->{'id_planta'};
  $id_edificio =$data->{'id_edificio'};

/*
  $id_dpto=1;
  $id_planta=5;
  $id_edificio=7;
*/

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

  if($last_id!=0){
    $message="Se guardo una nueva relación";
  }else{
    $message="La relación no se guardó";
  }

  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="nueva_ti_relacion")

?>      