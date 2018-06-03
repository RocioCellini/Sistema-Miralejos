<?php

session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

//$type_accion="detalle_llamados";

if ($type_accion==="detalle_llamados" && isset($_SESSION['Usuario']) ) {

  $id_cliente=$data->{'id_cliente'};    

  include "../../conexion.php";

  //$id_cliente=3;

  if($id_cliente!=="") {  

      $result = 'SELECT * FROM llamado WHERE id_cliente=?';

      $stmt = $conn->prepare($result);

      if($stmt===false) {
      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
      }

      $stmt->bind_param('i',$id_cliente); 

      $stmt->execute(); 

      $rs=$stmt->get_result(); 

      $contador=0;

      if($row=$rs->fetch_assoc()){

        $response = array();
        $nombre_origen_dato="";

        do{
          $contador++;
          $fecha_llamado=$row['fecha_llamado'];     
          $id_origen_dato=$row['id_origen_dato'];
          $fecha_origen_dato=$row['fecha_origen_dato'];
          $id_vendedor=$row['id_vendedor'];
          
          $result_orig = 'SELECT * FROM origen_dato WHERE id_origen_dato=?';

          $stmt_orig = $conn->prepare($result_orig);

          if($stmt_orig===false) {
          trigger_error('Wrong SQL: ' . $result_orig . ' Error: ' . $conn->error, E_USER_ERROR);
          }

          $stmt_orig->bind_param('i',$id_origen_dato); 

          $stmt_orig->execute(); 

          $rs_orig=$stmt_orig->get_result(); 

          if($row_orig=$rs_orig->fetch_assoc()){

            $nombre_origen_dato=$row_orig['origen_dato'];

          }

          $result_plan = 'SELECT * FROM planilla_de_venta WHERE id_cliente=?';

          $stmt_plan = $conn->prepare($result_plan);

          if($stmt_plan===false) {
          trigger_error('Wrong SQL: ' . $result_plan . ' Error: ' . $conn->error, E_USER_ERROR);
          }

          $stmt_plan->bind_param('i',$id_cliente); 

          $stmt_plan->execute(); 

          $rs_plan=$stmt_plan->get_result(); 

          if($row_plan=$rs_plan->fetch_assoc()){

            $id_inmobiliaria=$row_plan['id_inmobiliaria'];
            $id_edificio=$row_plan['id_edificio'];
            $id_planta=$row_plan['id_planta'];
            $id_dpto=$row_plan['id_dpto'];

          }
        

        }while ($row=$rs->fetch_assoc());

         $temp=array('contador'=>$contador, 
          'fecha_ult_llamado'=> $fecha_llamado, 
          'nombre_origen_dato'=> $nombre_origen_dato, 
          'fecha_origen_dato'=> $fecha_origen_dato, 
          'id_vendedor'=> $id_vendedor, 
          'id_inmobiliaria'=> $id_inmobiliaria,
          'id_edificio'=> $id_edificio, 
          'id_planta'=> $id_planta, 
          'id_dpto'=> $id_dpto);

            $response[]=$temp;   

       } else { 
          $mensaje=array('Mensaje'=>utf8_encode("0"));
          $response[]=$mensaje;
       } 

      //***************************************************************************************///

      $item=array('Respuesta' => $response);
      $json = json_encode($item);
      echo $json;  

    }

}//if ($type_accion==="detalle_llamados") 

?>    