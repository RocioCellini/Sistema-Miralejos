<?php

session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

//$type_accion="ver_historial";

if ($type_accion==="ver_historial" && isset($_SESSION['Usuario'])) {

  $id_cliente=$data->{'id_cliente'};

	include "../../conexion.php";

  //$id_cliente=1;

  if($id_cliente!=="") {  

      $result = 'SELECT * FROM llamado WHERE id_cliente=?';

      $stmt = $conn->prepare($result);

      if($stmt===false) {
      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
      } 

      $stmt->bind_param('i',$id_cliente); 

      $stmt->execute(); 

      $rs=$stmt->get_result(); 

      if($row=$rs->fetch_assoc()){

         $response = array();

         do{  
            
            $temp=array('id_cliente'=>utf8_encode($row['id_cliente']),
                  'id_llamado'=>utf8_encode($row['id_llamado']),
                  'id_vendedor'=>utf8_encode($row['id_vendedor']),
                  'fecha_llamado'=>utf8_encode($row['fecha_llamado']),
                  'hora_llamado'=>utf8_encode($row['hora_llamado']),
                  'id_edificio'=>utf8_encode($row['id_edificio']),
                  'id_planta'=>utf8_encode($row['id_planta']),
                  'id_dpto'=>utf8_encode($row['id_dpto']),
                  'grado_interes'=>utf8_encode($row['grado_interes']),
                  'id_origen_dato'=>utf8_encode($row['id_origen_dato']),
                  'fecha_origen_dato'=>utf8_encode($row['fecha_origen_dato']),
                  'anotaciones'=>utf8_encode($row['anotaciones'])
                            );

            $response[]=$temp;
          
          } while ($row=$rs->fetch_assoc());

       } else { 
          $mensaje=array('Mensaje'=>utf8_encode("El cliente seleccionado no tiene llamados"));
          $response[]=$mensaje;
       } 

      //***************************************************************************************///

      $item=array('Respuesta' => $response);
      $json = json_encode($item);
      echo $json;  

    }


}//if ($type_accion==="ver_historial") 

?>		