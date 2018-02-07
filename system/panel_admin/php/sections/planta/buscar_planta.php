<?php

$json = file_get_contents('php://input');
$data=json_decode($json);


$type_accion=$data->{'type_accion'};

//$type_accion=="buscar_planta";

if ($type_accion==="buscar_planta") {

  $criterio=$data->{'criterio'};
  
  //echo $criterio;

  include "../../conexion.php";

  //$criterio="Piso 1";

  if($criterio!=="") {  

      //$criterio_en_partes="%".$criterio."%"; 

      $result = 'SELECT * FROM planta WHERE nombre=?';

      $stmt = $conn->prepare($result);

      if($stmt===false) {
      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
      }

      //$stmt->bind_param('s',$criterio_en_partes); 

      $stmt->bind_param('s',$criterio); 

      $stmt->execute(); 

      $rs=$stmt->get_result(); 

      if($row=$rs->fetch_assoc()){

         $response = array();

         //echo "entro al if";

         do{  
            
            $temp=array('id_planta'=>utf8_encode($row['id_planta']),
                  'nombre'=>utf8_encode($row['nombre'])
                            );

            $response[]=$temp;
          
          } while ($row=$rs->fetch_assoc());

       } else { 
          $mensaje=array($message=>utf8_encode("No se encontró una planta con el nombre ingresado"));
          $response[]=$mensaje;
       } 

      //***************************************************************************************///

      $item=array('Respuesta' => $response);
      $json = json_encode($item);
      echo $json;  

    }

}//if ($type_accion==="buscar_planta") 

?>    