<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain"); 
session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);


$type_accion=$data->{'type_accion'};
//$type_accion='editar_llamado';

if($type_accion==="editar_llamado" && isset($_SESSION['Usuario'])){

//********************************************************************************************//  
  
  include "../../conexion.php"; 
  
  $id_llamado =$data->{'id_llamado'};
  $id_vendedor =$data->{'id_vendedor'};
  $id_cliente =$data->{'id_cliente'};
  $fecha_llamado =$data->{'fecha_llamado'};
  $hora_llamado =$data->{'hora_llamado'};
  $id_edificio =$data->{'id_edificio'};
  $id_planta =$data->{'id_planta'};
  $id_dpto =$data->{'id_dpto'};
  $grado_interes =$data->{'grado_interes'};
  $id_origen_dato =$data->{'id_origen_dato'};
  $fecha_origen_dato =$data->{'fecha_origen_dato'};
  $anotaciones =$data->{'anotaciones'};

 /*
  $id_llamado=2;
  $id_vendedor=1;
  $id_cliente=1;
  $fecha_llamado='2016-03-14';
  $hora_llamado='18:00:01';
  $id_edificio=1;
  $id_planta=2;
  $id_dpto=2;
  $grado_interes=4;
  $nombre_origen_dato='oficina';
  $fecha_origen_dato='2016-02-14';
  $anotaciones='respondi� bien';
 */

  $item="";

  $result='UPDATE llamado SET id_vendedor=?, id_cliente=?, fecha_llamado=?, hora_llamado=?, id_edificio=?, id_planta=?, id_dpto=?, grado_interes=?, id_origen_dato=?, fecha_origen_dato=?, anotaciones=? WHERE id_llamado=?';


  $stmt = $conn->prepare($result);

  if($stmt === false) {
                    trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
                    }

  $stmt->bind_param('iissiiiiissi', $id_vendedor, $id_cliente, $fecha_llamado,      
      $hora_llamado, $id_edificio, $id_planta, $id_dpto, $grado_interes, $id_origen_dato, 
      $fecha_origen_dato, $anotaciones, $id_llamado);

  $stmt->execute();

  $message="Los datos se actualizaron correctamente.";

  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
   } //if($type_accion==="editar_llamado")
   //agregar un json con el error si no se guard� en la BD

?>      