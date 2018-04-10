<?php

session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

//$type_accion="set_data";

if ($type_accion==="set_data" && isset($_SESSION['Usuario'])) {

      include "../../conexion.php";

      $mensaje="";

      $result = 'SELECT * FROM cliente';

      $stmt = $conn->prepare($result);

      if($stmt===false) {
      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
      } 

      $stmt->execute(); 

      $rs=$stmt->get_result(); 

      if($row=$rs->fetch_assoc()){

       $CantContactos=0;
       $response = array();

        do{  
          
           $CantContactos++;

          

        } while ($row=$rs->fetch_assoc());

        $suma=array('CantContactos'=>$CantContactos);

        $response[]=$CantContactos;

      } else { 
      $mensaje=array('message'=>utf8_encode("No se encontraron contactos"));
      $response[]=$mensaje;
      } 

      //***************************************************************************************///

      $item=array('Respuesta' => $response);
      $json = json_encode($item);
      echo $json;  

}//if ($type_accion==="buscar_cliente") 

?>		