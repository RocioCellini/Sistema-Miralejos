<?php

session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);


$type_accion=$data->{'type_accion'};

//$type_accion=="buscar_edificio";

if ($type_accion==="buscar_edificio" && isset($_SESSION['Usuario'])) {

  $criterio=$data->{'criterio'};
  
  //echo $criterio;

  include "../../conexion.php";

  //$criterio="M";

  if($criterio!=="") {  

      $criterio=utf8_decode($criterio);

      $criterio="%".$criterio."%"; 

      $result = 'SELECT * FROM edificio WHERE nombre like ?';

      $stmt = $conn->prepare($result);

      if($stmt===false) {
        trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
      }

      $stmt->bind_param('s',$criterio); 

      //$stmt->bind_param('s', $criterio); 

      $stmt->execute(); 

      $rs=$stmt->get_result(); 

      if($row=$rs->fetch_assoc()){

         $response = array();

         //echo "entro al if";

         do{  
            
            $temp=array('id_edificio'=>utf8_encode($row['id_edificio']),
                  'nombre'=>utf8_encode($row['nombre'])
                            );

            $response[]=$temp;
          
          } while ($row=$rs->fetch_assoc());

       } else { 
          $mensaje=array('message'=>utf8_encode("No se encontró un edificio con el nombre ingresado"));
          $response[]=$mensaje;
       } 

      //***************************************************************************************///

      $item=array('Respuesta' => $response);
      $json = json_encode($item);
      echo $json;  

    }

}//if ($type_accion==="buscar_edificio") 

?>    