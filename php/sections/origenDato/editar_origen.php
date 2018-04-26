<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain"); 
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

//$type_accion='editar_origen';

if($type_accion==="editar_origen" && isset($_SESSION['Usuario'])){

    //************************************************************************************//  
    
    include "../../conexion.php"; 
   
    $id_origen_dato=$data->{'id_origen_dato'};
    $origen_dato=$data->{'origen_dato'}; 
     /*
    $id_origen_dato=2;
    $origen_dato='Oficina';
      */

    $item="";

    $result='UPDATE origen_dato SET origen_dato=? WHERE id_origen_dato=?';

    $stmt = $conn->prepare($result);

    if($stmt === false) {
                      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
                      }

    $stmt->bind_param('si', $origen_dato, $id_origen_dato);

    $stmt->execute();

    $message="Los datos se actualizaron correctamente.";

    //***************************************************************************************///

    $item=array('Mensaje' => utf8_encode($message));
    $json = json_encode($item);
    echo $json;
              
    } //if($type_accion==="editar_origen")

?>      