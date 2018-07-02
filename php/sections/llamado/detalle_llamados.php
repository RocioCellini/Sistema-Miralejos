<?php

session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

//$type_accion="detalle_llamados";

if ($type_accion==="detalle_llamados" && isset($_SESSION['Usuario']) ) {

  $id_cliente=$data->{'id_cliente'};    

  include "../../conexion.php";

  //$id_cliente=645;

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
          $id_edificio=$row['id_edificio'];
          $id_planta=$row['id_planta'];
          $id_dpto=$row['id_dpto'];
          $id_inmobiliaria=$row['id_inmobiliaria'];
          $grado_interes=$row['grado_interes'];
          
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

        }while ($row=$rs->fetch_assoc());

         //Vendedor
        //-----------------------------------------------------     
        $result_vend = "SELECT * FROM vendedor WHERE id_vendedor=?";
        $stmt_vend = $conn->prepare($result_vend);

        if($stmt_vend === false) {
            trigger_error('Wrong SQL: ' . $result_vend . ' Error: ' . $conn->error, E_USER_ERROR);
        }

        $stmt_vend->bind_param('i',$id_vendedor); 
          
        $stmt_vend->execute();
        $rs_vend=$stmt_vend->get_result();

        if($row_vend = $rs_vend->fetch_assoc()) {        
           $vendedor=$row_vend['nombre'];           
        }   

        //Inmobiliaria
        //-----------------------------------------------------     
        $result_inmob = "SELECT * FROM inmobiliaria WHERE id_inmobiliaria=?";
        $stmt_inmob = $conn->prepare($result_inmob);

        if($stmt_inmob === false) {
            trigger_error('Wrong SQL: ' . $result_inmob . ' Error: ' . $conn->error, E_USER_ERROR);
        }
        
        $stmt_inmob->bind_param('i',$id_inmobiliaria); 

        $stmt_inmob->execute();
        $rs_inmob=$stmt_inmob->get_result();

        if($row_inmob = $rs_inmob->fetch_assoc()) {        
           $inmobiliaria=$row_inmob['nombre'];
        }   

         $temp=array('contador'=>$contador, 
          'fecha_ult_llamado'=> $fecha_llamado, 
          'nombre_origen_dato'=> $nombre_origen_dato, 
          'fecha_origen_dato'=> $fecha_origen_dato, 
          'id_vendedor'=> $id_vendedor, 
          'vendedor'=> $vendedor, 
          'id_edificio'=> $id_edificio, 
          'id_planta'=> $id_planta, 
          'id_dpto'=> $id_dpto,
          'id_inmobiliaria'=> $id_inmobiliaria,
          'inmobiliaria'=> $inmobiliaria,
          'grado_interes'=> $grado_interes);

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