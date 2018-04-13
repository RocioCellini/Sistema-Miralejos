<?php

session_start();

$json=file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

//$type_accion="buscar_cliente";

if ($type_accion==="buscar_cliente" && isset($_SESSION['Usuario'])) {

	include "../../conexion.php";

	
	$criterio=$data->{'criterio'}; 
    $id_provincia=$data->{'id_provincia'};
	$id_localidad=$data->{'id_localidad'};

	/*
	$criterio="flor"; 
    $id_provincia=-1;
	$id_localidad=-1;
	*/

	$type_data=null;
	$data_query[0]=&$type_data;
	$subconsulta="";

    if($criterio!=="") {    

		$criterio_partes="%".$criterio."%"; 	

	    if(is_numeric($criterio)) {		
	     	
	     	$subconsulta=" WHERE telefono1=? OR telefono2=? OR dni=?"; //al ser enteros nose como hacer para buscarlos de a partes
	     	$type_data='iii';
	     	$count_criterio=3;	     	
	     
	     } else {
	     	
	     	$criterio=utf8_decode($criterio_partes);

	        $subconsulta=" WHERE (nombre Like ? OR apellido like ? OR email Like ?)";
	        $type_data='sss';
	        $count_criterio=3;

	     }

	     for ($i=1;$i<=$count_criterio ;$i++){
	     	$data_query[]=$criterio;
	     }
    }



    if($id_provincia!==-1) {

     	if($subconsulta=="") {

     			$subconsulta.=' WHERE id_provincia=?';
     			$type_data='i';

     		} else {

     			$subconsulta.=' AND id_provincia=?';
     			$type_data.='i';
     	}    	
     
		$data_query[]=$id_provincia;
    }



    if($id_localidad!==-1) {
     
     	 if($subconsulta!=="") {

     			 $subconsulta.=' AND id_localidad=?';
     	}

     	$type_data.='i';
		$data_query[]=$id_localidad;
     
    }

   

	$result = 'SELECT * FROM cliente'.$subconsulta.' ORDER BY nombre';
	$stmt = $conn->prepare($result);

    if($stmt===false) {
      	trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
    }

      
    if($subconsulta!==""){
      	
      	foreach($data_query as $key => $value) {
                $data_bind[$key] = &$data_query[$key];
        } 
     	 
     	call_user_func_array(array($stmt, 'bind_param'), $data_bind);

    }
      
 	//print_r($data_bind);


    $stmt->execute(); 

    $rs=$stmt->get_result(); 

    if($row=$rs->fetch_assoc()){

      	$response = array();

      	do{
		
			$id_provincia=$row["id_provincia"];
			$id_localidad=$row["id_localidad"];			
			$id_actividad=$row["id_actividad"];	

			

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

			$result_act = 'SELECT * FROM actividad WHERE id_actividad=?';

				$stmt_act = $conn->prepare($result_act);

				if($stmt_act===false) {
					trigger_error('Wrong SQL: ' . $result_act . ' Error: ' . $conn->error, E_USER_ERROR);
				} 

				$stmt_act->bind_param('i', $id_actividad); 

				$stmt_act->execute(); 

				$rs_act=$stmt_act->get_result(); 

				if($row_act=$rs_act->fetch_assoc()) {
					$actividad=$row_act["nombre"];
				}

			$conoce=$row['conoce'];			

			if($conoce=0){
				$conoce="No";
			}else{
				$conoce="Si";
			}
			
			$temp=array('id_cliente'=>utf8_encode($row['id_cliente']),
						'nombre'=>utf8_encode($row['nombre']),						
                        'apellido'=> utf8_encode($row['apellido']), 
                        'dni'=>utf8_encode($row['dni']),
                        'telefono1'=>utf8_encode($row['telefono1']),
                        'telefono2'=>utf8_encode($row['telefono2']),
                        'email'=>utf8_encode($row['email']),
                        'id_provincia'=>utf8_encode($id_provincia),
                        'provincia'=>utf8_encode($provincia), 
                        'id_localidad'=>utf8_encode($id_localidad),                   
                        'localidad'=>utf8_encode($localidad),
                        'id_actividad'=>utf8_encode($id_actividad),
                        'actividad'=>utf8_encode($actividad),
                        'conoce'=>utf8_encode($conoce)
                    	);

			$response[]=$temp;
	
		} while ($row=$rs->fetch_assoc());		

	} else { 
		 $mensaje=array('message'=>"No se encontró un cliente con el email ingresado");
		 $response[]=$mensaje;
	} 

  //***************************************************************************************///

  $item=array('Respuesta' => $response);
  $json = json_encode($item);
  echo $json;

  }//if ($type_accion==="buscar_cliente") 

?>		