<?php

$json = file_get_contents('php://input');
$data=json_decode($json);

/*$type_accion=$data->{'type_accion'};

$type_accion=="buscar_edificio";

if ($type_accion==="buscar_edificio") {*/

	include "../../conexion.php";

	$nombre='M7';

    //$nombre=$data->{'nombre'};

	$result = 'SELECT * FROM edificio WHERE nombre=?';

	$stmt = $conn->prepare($result);

      if($stmt===false) {
      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
      }

    // $desc="%".$criterio."%";    

      $stmt->bind_param('s',$nombre); 

      $stmt->execute(); 

      $rs=$stmt->get_result(); 

      if($row=$rs->fetch_assoc()){

      	 $response = array();

      	 do{

			$message="Los datos del edificio encontrado son:";			
			
			$temp=array('id_edificio'=>utf8_encode($row['id_edificio']),
						'nombre'=>utf8_encode($row['nombre'])
                    	);

			$response[]=$temp;
		
		} while ($row=$rs->fetch_assoc());
		echo '</table></div><br><br>';

	} else { 
		 $message="No se encontró un edificio con el nombre ingresado";
		 $response[]=Null;
	} 

  //***************************************************************************************///

  $item2=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item2);
  echo $json.'<br>';

  $item=array('edificio' => $response);
  $json = json_encode($item);
  echo $json;

  //}//if ($type_accion==="buscar_cliente") 

?>		