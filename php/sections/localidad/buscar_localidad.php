<?php

session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);


$type_accion=$data->{'type_accion'};

//$type_accion="buscar_localidad";

if ($type_accion==="buscar_localidad" && isset($_SESSION['Usuario'])) {

  $criterio=$data->{'criterio'};

  include "../../conexion.php";

  //$criterio="Balcarce";

  if($criterio!=="") {  

      $criterio=utf8_decode($criterio);

      $criterio="%".$criterio."%"; 

      $result = 'SELECT * FROM localidad WHERE nombre like ?';

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

         do{  
            
            $temp=array('id_localidad'=>utf8_encode($row['id_localidad']),
                  'id_provincia'=>utf8_encode($row['id_provincia']),
                  'nombre'=>utf8_encode($row['nombre'])
                  );

            $response[]=$temp;
          
          } while ($row=$rs->fetch_assoc());

       } else { 
          
            $mensaje=array('message'=>"No se encontró una localidad con el nombre ingresado");
            $response[]=$mensaje;
       } 

      //***************************************************************************************///

      $item=array('Respuesta' => $response);
      $json = json_encode($item);
      echo $json;  

    }

}//if ($type_accion==="buscar_localidad") 

?>    