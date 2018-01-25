<?php

$json = file_get_contents('php://input');
$data=json_decode($json);

//$type_accion=$data->{'type_accion'};

$type_accion=="buscar_vendedor";

if ($type_accion==="buscar_vendedor") {

	include "../../conexion.php";

	//$email='farrars@miralejos.net';

  $email=$data->{'email'};

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

    			$message="Los datos del vendedor encontrado son:";
    			
    			$temp=array('nombre'=>utf8_encode($row['nombre']),
                      'email'=> utf8_encode($row['email'])
                      );

    			$response[]=$temp;
    		
    		} while ($row=$rs->fetch_assoc());
    		echo '</table></div><br><br>';

	} else { 
		 $message="No se encontró un vendedor con el email ingresado";
     $response[]=Null;
	} 

  //***************************************************************************************///

  $item2=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item2);
  echo $json.'<br>';

  $item=array('vendedor' => $response);
  $json = json_encode($item);
  echo $json;

  //}//if ($type_accion==="buscar_cliente") 

?>		