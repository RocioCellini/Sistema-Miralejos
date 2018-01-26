<?php

$json = file_get_contents('php://input');
$data=json_decode($json);

/*$type_accion=$data->{'type_accion'};

$type_accion=="buscar_vendedor";

if ($type_accion==="buscar_vendedor") {*/

    include "../../conexion.php";

    $email='farraras@miralejos.net';

    //$email=$data->{'email'};

    $result = 'SELECT * FROM vendedor WHERE email=?';

    $stmt = $conn->prepare($result);

    if($stmt===false) {
    trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
    }

    // $desc="%".$criterio."%";    

    $stmt->bind_param('s',$email); 

    $stmt->execute(); 

    $rs=$stmt->get_result(); 

    if($row=$rs->fetch_assoc()){

         $response = array();

         do{

            $temp=array('id_vendedor'=>utf8_encode($row['id_vendedor']),
                        'nombre'=>utf8_encode($row['nombre']),              
                        'email'=>utf8_encode($row['email'])                       
                      );

            $response[]=$temp;
  
          } while ($row=$rs->fetch_assoc());    

    } else { 

          $mensaje=array($message=>utf8_encode("No se encontró un vendedor con el email ingresado"));
          $response[]=$mensaje;
    } 

    //**************************************************************************///

    $item=array('Respuesta' => $response);
    $json = json_encode($item);
    echo $json;

  //}//if ($type_accion==="buscar_vendedor") 

?>    