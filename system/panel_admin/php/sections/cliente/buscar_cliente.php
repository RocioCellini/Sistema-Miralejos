<?php

$json=file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

//$type_accion="buscar_cliente";

if ($type_accion==="buscar_cliente") {

	include "../../conexion.php";

	
	$criterio=$data->{'criterio'}; 
    $id_provincia=$data->{'id_provincia'};
	$id_localidad=$data->{'id_localidad'};
	
	

 	 $type_data=null;
     $data_query[0]=$type_data;
     $subconsulta="";

	    if($criterio!=="") {    	

			    if(is_numeric($criterio)) {		
			     	
			     	$subconsulta=" WHERE telefono=? OR dni=?";
			     	$type_data='ii';
			     	$count_criteria=2;
			     	
			     
			     } else {
			     	
			     	$criterio=utf8_decode($criterio);

			        $subconsulta=" WHERE (nombre Like ? OR apellido like ? OR email Like ? OR actividad like ?)";
			        $type_data='ssss';
			        $count_criteria=4;

			     }

			     for ($i=1;$i<=$count_criteria ;$i++){
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

     $data_query[0]=$type_data;


    

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
		 $mensaje=array('message'=>"No se encontró un cliente con el email ingresado");
		 $response[]=$mensaje;
	} 

  //***************************************************************************************///

  $item=array('Respuesta' => $response);
  $json = json_encode($item);
  echo $json;

  }//if ($type_accion==="buscar_cliente") 

?>		