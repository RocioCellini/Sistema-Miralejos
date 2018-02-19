<?php

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

//$type_accion="buscar_act";

if ($type_accion==="buscar_act") {

  $criterio=$data->{'criterio'};

	include "../../conexion.php";

 // $criterio="agri";

  if($criterio!=="") {  

      $criterio=utf8_decode($criterio);

      $criterio="%".$criterio."%"; 

      $result = 'SELECT * FROM actividad WHERE nombre like ?';

      $stmt = $conn->prepare($result);

      if($stmt===false) {
      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
      } 

      $stmt->bind_param('s',$criterio); 

      $stmt->execute(); 

      $rs=$stmt->get_result(); 

      if($row=$rs->fetch_assoc()){

         $response = array();

         do{  
            
            $temp=array('id_actividad'=>utf8_encode($row['id_actividad']),
                  'nombre'=>utf8_encode($row['nombre'])
                            );

            $response[]=$temp;
          
          } while ($row=$rs->fetch_assoc());

       } else { 
          $mensaje=array('Mensaje'=>utf8_encode("No se encontró una actividad con el nombre ingresado"));
          $response[]=$mensaje;
       } 

      //***************************************************************************************///

      $item=array('Respuesta' => $response);
      $json = json_encode($item);
      echo $json;  

    }

	

}//if ($type_accion==="buscar_act") 

?>		