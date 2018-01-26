<?php

$json=file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};
$criterio=$data->{'criterio'};

	echo $type_accion;
	echo $criterio;

//$email=$data->{'email'};

if ($type_accion==="buscar_cliente") {

	include "../../conexion.php";

	echo "ingresó en el php";

	/*$nombre='Maria';
	$apellido='Cellini';
	$dni=555;	
    $telefono=54545;
    $email='maria@miralejos.net';
    $id_provincia=3;                
    $id_localidad=5;
    $actividad='abogada';
    $conoce=0;*/

    //$email=$data->{'email'};

	/* Ejemplo

		$result = 'SELECT * FROM Sis_Personas WHERE (Nombre Like ? OR Apellido like ? OR Mail like ? OR TelefonoFijo Like ? OR Cel1 Like ? OR Cel2 Like ? OR DNI like ?) AND (Set_Historial=?) ORDER BY Nombre';

	   Ejemplo aplicado

		$result = 'SELECT * FROM cliente WHERE (nombre Like ? OR apellido like ? OR dni like ? OR telefono Like ? OR email Like ? OR id_provincia Like ? OR id_localidad like ? OR actividad like ? conoce like ?) ORDER BY nombre';
    */

	/*Consulta que anda bien
		$result = 'SELECT * FROM cliente WHERE email=?';*/

	  $result = 'SELECT * FROM cliente WHERE (nombre Like ? OR apellido like ? OR dni like ? OR telefono Like ? OR email Like ? OR id_provincia Like ? OR id_localidad like ? OR actividad like ? conoce like ?) ORDER BY nombre';

	  $stmt = $conn->prepare($result);

      if($stmt===false) {
      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
      }

      $desc="%".$criterio."%";    

      // $stmt->bind_param('ssiisiisi',$nombre, $apellido, $dni, $telefono, $email, $id_provincia, $id_localidad, $actividad, $conoce); 

      $stmt->bind_param('s',$desc);

      $stmt->execute(); 

      $rs=$stmt->get_result(); 

      if($row=$rs->fetch_assoc()){

      	 $response = array();

      	 do{
		
			$id_provincia=$row["id_provincia"];
			$id_localidad=$row["id_localidad"];			

			$result_prov = 'SELECT * FROM provincia WHERE id_provincia=?';

				$stmt_prov = $conn->prepare($result_prov);

				if($stmt_prov===false) {
					trigger_error('Wrong SQL: ' . $result_prov . ' Error: ' . $conn->error, E_USER_ERROR);
				} 

				$stmt_prov->bind_param('i',$id_provincia); 

				$stmt_prov->execute(); 

				$rs_prov=$stmt_prov->get_result(); 

				if($row_prov=$rs_prov->fetch_assoc()){
					$provincia=$row_prov["nombre"];
				}

			$result_loc = 'SELECT * FROM localidad WHERE id_localidad=?';

				$stmt_loc = $conn->prepare($result_loc);

				if($stmt_loc===false) {
					trigger_error('Wrong SQL: ' . $result_loc . ' Error: ' . $conn->error, E_USER_ERROR);
				} 

				$stmt_loc->bind_param('i',$id_localidad); 

				$stmt_loc->execute(); 

				$rs_loc=$stmt_loc->get_result(); 

				if($row_loc=$rs_loc->fetch_assoc()){
					$localidad=$row_loc["nombre"];
				}
			
			$temp=array('id_cliente'=>utf8_encode($row['id_cliente']),
						'nombre'=>utf8_encode($row['nombre']),
                        'apellido'=> utf8_encode($row['apellido']), 
                        'dni'=>utf8_encode($row['dni']),
                        'telefono'=>utf8_encode($row['telefono']),
                        'email'=>utf8_encode($row['email']),
                        'provincia'=>utf8_encode($provincia),                    
                        'localidad'=>utf8_encode($localidad),
                        'actividad'=>utf8_encode($row['actividad']),
                        'conoce'=>utf8_encode($row['conoce'])
                    	);

			$response[]=$temp;
	
		} while ($row=$rs->fetch_assoc());		

	} else { 
		 $mensaje=array($message=>utf8_encode("No se encontró un cliente con el email ingresado"));
		 $response[]=$mensaje;
	} 

  //***************************************************************************************///

  $item=array('Respuesta' => $response);
  $json = json_encode($item);
  echo $json;

  }//if ($type_accion==="buscar_cliente") 

?>		