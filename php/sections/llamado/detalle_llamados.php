<?php

$json = file_get_contents('php://input');
$data=json_decode($json);

//$type_accion=$data->{'type_accion'};

$type_accion="detalle_llamados";

if ($type_accion==="detalle_llamados") {

 // $id_cliente=$data->{'id_cliente'};
    

  include "../../conexion.php";

  $id_cliente=3;

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

        do{
          $contador++;
          $fecha_llamado=$row['fecha_llamado'];     
          $nombre_origen_dato=$row['nombre_origen_dato'];
          $fecha_origen_dato=$row['fecha_origen_dato'];

        }while ($row=$rs->fetch_assoc());

         $temp=array('contador'=>$contador, 'fecha_ult_llamado'=> $fecha_llamado, 'nombre_origen_dato'=> $nombre_origen_dato, 'fecha_origen_dato'=> $fecha_origen_dato);

            $response[]=$temp;

       // $response[]=$contador;     

       } else { 
          $mensaje=array('Mensaje'=>utf8_encode("0"));
          $response[]=$mensaje;
       } 

      //***************************************************************************************///

      $item=array('Respuesta' => $response);
      $json = json_encode($item);
      echo $json;  

    }

}//if ($type_accion==="buscar_llamado") 

?>    