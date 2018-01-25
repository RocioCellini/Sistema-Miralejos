<?php

$json = file_get_contents('php://input');
$data=json_decode($json);

/*$type_accion=$data->{'type_accion'};

$type_accion=="buscar_llamado";

if ($type_accion==="buscar_llamado") {*/

	include "../../conexion.php";

	$id_vendedor=2;

  //$id_vendedor=$data->{'id_vendedor'};

	$result = 'SELECT * FROM llamado WHERE id_vendedor=?';

	$stmt = $conn->prepare($result);

      if($stmt===false) {
      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
      }

    // $desc="%".$criterio."%";    

      $stmt->bind_param('i',$id_vendedor); 

      $stmt->execute(); 

      $rs=$stmt->get_result(); 

      if($row=$rs->fetch_assoc()){

      	$response = array();

      	do{

    			$message="Los datos del llamado encontrado son:";
    			
    			$temp=array('id_llamado'=>utf8_encode($row['id_llamado']),
                      'id_vendedor'=> utf8_encode($row['id_vendedor']),
                      'id_cliente'=> utf8_encode($row['id_cliente']),
                      'fecha_llamado'=> utf8_encode($row['fecha_llamado']),
                      'hora_llamado'=> utf8_encode($row['hora_llamado']),
                      'id_edificio'=> utf8_encode($row['id_edificio']),
                      'id_planta'=> utf8_encode($row['id_planta']),
                      'id_dpto'=> utf8_encode($row['id_dpto']),
                      'grado_interes'=> utf8_encode($row['grado_interes']),
                      'nombre_origen_dato'=> utf8_encode($row['nombre_origen_dato']),
                      'fecha_origen_dato'=> utf8_encode($row['fecha_origen_dato']),
                      'anotaciones'=> utf8_encode($row['anotaciones'])
                      );

    			$response[]=$temp;
    		
    		} while ($row=$rs->fetch_assoc());
    		echo '</table></div><br><br>';

	} else { 
		 $message="No se encontró un llamado con el dato ingresado";
     $response[]=Null;
	} 

  //***************************************************************************************///

  $item2=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item2);
  echo $json.'<br>';

  $item=array('llamado' => $response);
  $json = json_encode($item);
  echo $json;

  //}//if ($type_accion==="buscar_llamado") 

?>		