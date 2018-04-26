<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain"); 
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};
//$type_accion='editar_act';

if($type_accion==="editar_act" && isset($_SESSION['Usuario'])){

    //************************************************************************************//  
    
    include "../../conexion.php"; 

    $id_actividad=$data->{'id_actividad'};
    $nombre=$data->{'nombre'}; 
    /*
    $id_actividad=3;
    $nombre='agrimensor';
      */

    $item="";

    $result='UPDATE actividad SET nombre=? WHERE id_actividad=?';

    $stmt = $conn->prepare($result);

    if($stmt === false) {
                      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
                      }

    $stmt->bind_param('si', $nombre, $id_actividad);

    $stmt->execute();

    $message="Los datos se actualizaron correctamente.";

    //***************************************************************************************///

    $item=array('Mensaje' => utf8_encode($message));
    $json = json_encode($item);
    echo $json;
              
    } //if($type_accion==="editar_act")

?>      