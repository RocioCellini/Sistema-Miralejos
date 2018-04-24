<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain"); 
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);


$type_accion=$data->{'type_accion'};
//$type_accion='editar_edificio';

if($type_accion==="editar_edificio" && isset($_SESSION['Usuario'])){

    //***************************************************************************************//
    
    include "../../conexion.php"; 

    $id_edificio=$data->{'id_edificio'};
    $nombre=$data->{'nombre'};

    /*
    $id_edificio=1;
    $nombre='M14';  
    */

    $item="";

    $result='UPDATE edificio SET nombre=? WHERE id_edificio=?';

    $stmt = $conn->prepare($result);

    if($stmt === false) {
                      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
                      }

    $stmt->bind_param('si', $nombre, $id_edificio);

    $stmt->execute();

    $message="Los datos se actualizaron correctamente.";

    //***************************************************************************************//

    $item=array('Mensaje' => utf8_encode($message));
    $json = json_encode($item);
    echo $json;
              
    } //if($type_accion==="editar_edificio")

?>      