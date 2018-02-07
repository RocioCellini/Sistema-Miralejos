<?php

$json = file_get_contents('php://input');
$data=json_decode($json);


$type_accion=$data->{'type_accion'};

//$type_accion=="buscar_localidad";

if ($type_accion==="buscar_localidad") {

  $criterio=$data->{'criterio'};
  
  //echo $criterio;

  include "../../conexion.php";

  //$criterio="Balcarce";

  if($criterio!=="") {  

      //$criterio_en_partes="%".$criterio."%"; 

      $result = 'SELECT * FROM localidad WHERE nombre=?';

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
            
            $temp=array('id_localidad'=>utf8_encode($row['id_localidad']),
                  'nombre'=>utf8_encode($row['nombre'])
                            );

            $response[]=$temp;
          
          } while ($row=$rs->fetch_assoc());

       } else { 
          
            $mensaje=array($message=>utf8_encode("No se encontró una localidad con el nombre ingresado"));
            $response[]=$mensaje;
       } 

      //***************************************************************************************///

      $item=array('Respuesta' => $response);
      $json = json_encode($item);
      echo $json;  

    }

}//if ($type_accion==="buscar_localidad") 

?>    