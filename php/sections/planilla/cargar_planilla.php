<?php

/*session_start();

$json=file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};  && isset($_SESSION['Usuario'])*/

$type_accion="cargar_planilla";

if ($type_accion==="cargar_planilla" ) {

		include "../../conexion.php";

		$result_planilla = 'SELECT * FROM planilla_de_venta';

		$stmt_planilla = $conn->prepare($result_planilla);

		if($stmt_planilla===false) {
		trigger_error('Wrong SQL: ' . $result_planilla . ' Error: ' . $conn->error, E_USER_ERROR);
		}

		$stmt_planilla->execute(); 

		$rs_planilla=$stmt_planilla->get_result(); 

		if($row_planilla=$rs_planilla->fetch_assoc()){

		$response_planilla = array();

		do{

			// Variables para las SubConsultas
            //--------------------------------------------------------------

			$id_cliente=$row_planilla['id_cliente'];
			$id_vendedor=$row_planilla['id_vendedor'];
			$id_inmobiliaria=$row_planilla['id_inmobiliaria'];			

         	// SubConsulta para obtener los datos del Cliente
            //--------------------------------------------------------------

            $result_cliente = 'SELECT * FROM cliente WHERE id_cliente=?';

			$stmt_cliente = $conn->prepare($result_cliente);

			if($stmt_cliente===false) {
				trigger_error('Wrong SQL: ' . $result_cliente . ' Error: ' . $conn->error, E_USER_ERROR);
			}

			$stmt_cliente->bind_param('i',$id_cliente);   

			$stmt_cliente->execute(); 

			$rs_cliente=$stmt_cliente->get_result(); 

	      	if($row_cliente=$rs_cliente->fetch_assoc()){  

	      		// Cliente especificado
	            //--------------------------------------------------------------

	            $apellido=$row_cliente['apellido'];
	            $nombre=$row_cliente['nombre'];
	            $telefono1=$row_cliente['telefono1'];
	            $telefono2=$row_cliente['telefono2'];
	            $email=$row_cliente['email'];  		      		
	            

	            // Tipo del Cliente especificado
	            //--------------------------------------------------------------

	            $id_tipo_cliente=$row_cliente['id_tipo_cliente'];

	            $result_tipo = 'SELECT * FROM tipo_cliente WHERE id_tipo_cliente=?';

			      $stmt_tipo = $conn->prepare($result_tipo);

			      if($stmt_tipo===false) {
			        trigger_error('Wrong SQL: ' . $result_tipo . ' Error: ' . $conn->error, E_USER_ERROR);
			      }

			      $stmt_tipo->bind_param('i',$id_tipo_cliente);   

			      $stmt_tipo->execute(); 

			      $rs_tipo=$stmt_tipo->get_result(); 

			      if($row_tipo=$rs_tipo->fetch_assoc()){    

			      		$tipo_cliente=$row_tipo['tipo_cliente'];

			      }

	      		// Provincia del Cliente especificado
	            //--------------------------------------------------------------

	      		$id_provincia=$row_cliente['id_provincia'];

	            $result_prov = 'SELECT * FROM provincia WHERE id_provincia=?';

			      $stmt_prov = $conn->prepare($result_prov);

			      if($stmt_prov===false) {
			        trigger_error('Wrong SQL: ' . $result_prov . ' Error: ' . $conn->error, E_USER_ERROR);
			      }

			      $stmt_prov->bind_param('i',$id_provincia);   

			      $stmt_prov->execute(); 

			      $rs_prov=$stmt_prov->get_result(); 

			      if($row_prov=$rs_prov->fetch_assoc()){    

			      		$provincia=$row_prov['nombre'];

			      }

			    // Localidad del Cliente especificado
	            //--------------------------------------------------------------

			     $id_localidad=$row_cliente['id_localidad'];

		        $result_loc = 'SELECT * FROM localidad WHERE id_localidad=?';

		        $stmt_loc = $conn->prepare($result_loc);

		        if($stmt_loc === false) {
		            trigger_error('Wrong SQL: ' . $result_loc . ' Error: ' . $conn->error, E_USER_ERROR);
		        }
		        
		        $stmt_loc->bind_param('i',$id_localidad); 

		        $stmt_loc->execute();

		        $rs_loc=$stmt_loc->get_result();

		        if($row_loc = $rs_loc->fetch_assoc()) {

		        	$localidad=$row_loc['nombre'];

		        }

		        // Actividad del Cliente especificado
	            //--------------------------------------------------------------

			     $id_actividad=$row_cliente['id_actividad'];

		        $result_act = 'SELECT * FROM actividad WHERE id_actividad=?';

		        $stmt_act = $conn->prepare($result_act);

		        if($stmt_act === false) {
		            trigger_error('Wrong SQL: ' . $result_act . ' Error: ' . $conn->error, E_USER_ERROR);
		        }
		        
		        $stmt_act->bind_param('i',$id_actividad); 

		        $stmt_act->execute();

		        $rs_act=$stmt_act->get_result();

		        if($row_act = $rs_act->fetch_assoc()) {

		        	$actividad=$row_act['nombre'];

		        }

		        // Conoce del Cliente especificado
	            //--------------------------------------------------------------

	            if ($row_cliente['conoce']==1) {
	            	$conoce='Si';
	            }elseif ($row_cliente['conoce']==0) {
	            	$conoce='No';
	            }

	            // Llamados del Cliente especificado
	            //--------------------------------------------------------------

	            $result_call = 'SELECT * FROM llamado WHERE id_cliente=?';

			      $stmt_call = $conn->prepare($result_call);

			      if($stmt_call===false) {
			        trigger_error('Wrong SQL: ' . $result_call . ' Error: ' . $conn->error, E_USER_ERROR);
			      }

			      $stmt_call->bind_param('i',$id_cliente);   

			      $stmt_call->execute(); 

			      $rs_call=$stmt_call->get_result(); 

			      if($row_call=$rs_call->fetch_assoc()){ 

			      	$num_llamados=0;

			      	do{   

			      		$num_llamados++;

			      		$fecha_ult_llamado=$row_call['fecha_llamado']; 
			      		/*buscar el último $fecha_ult_llamado, la fecha más actual, no la última ingresada. tendria que usar un if comparativo para ir guardando la mayor*/

			      		$grado_interes=$row_call['grado_interes']; 

			      		$fecha_origen_dato=$row_call['fecha_origen_dato']; 

			      		$id_origen_dato=$row_call['id_origen_dato']; 

			      		$fecha_cierre_operacion=$row_call['fecha_cierre_operacion']; 

			      		$id_edificio=$row_call['id_edificio'];
						$id_planta=$row_call['id_planta'];
						$id_dpto=$row_call['id_dpto'];


			      		
					   } while ($row_call=$rs_call->fetch_assoc());


					   //SubConsulta para obtener los datos del Edificio
				        //-----------------------------------------------------

				        $result_edif = 'SELECT * FROM edificio WHERE id_edificio=?';

				        $stmt_edif = $conn->prepare($result_edif);

				        if($stmt_edif === false) {
				            trigger_error('Wrong SQL: ' . $result_edif . ' Error: ' . $conn->error, E_USER_ERROR);
				        }
				        
				        $stmt_edif->bind_param('i',$id_edificio);   

				        $stmt_edif->execute();

				        $rs_edif=$stmt_edif->get_result();

				        if($row_edif = $rs_edif->fetch_assoc()) {	        

				            $edificio=$row_edif['nombre'];
					
				        }


				        //SubConsulta para obtener los datos de las Plantas
				        //-----------------------------------------------------

				        $result_planta = 'SELECT * FROM planta WHERE id_planta=?';

				        $stmt_planta = $conn->prepare($result_planta);

				        if($stmt_planta === false) {
				            trigger_error('Wrong SQL: ' . $result_planta . ' Error: ' . $conn->error, E_USER_ERROR);
				        }

				        $stmt_planta->bind_param('i',$id_planta);  

				        $stmt_planta->execute();

				        $rs_planta=$stmt_planta->get_result();

				        if($row_planta = $rs_planta->fetch_assoc()) {
				        
				            $planta = $row_planta['nombre'];

				        }


				        //SubConsulta para obtener los datos de los Departamentos
				        //--------------------------------------------------------

				        $result_dpto = 'SELECT * FROM departamento WHERE id_dpto=?';

				        $stmt_dpto = $conn->prepare($result_dpto);

				        if($stmt_dpto === false) {
				            trigger_error('Wrong SQL: ' . $result_dpto . ' Error: ' . $conn->error, E_USER_ERROR);
				        }

				        $stmt_dpto->bind_param('i',$id_dpto);  
				      
				        $stmt_dpto->execute();

				        $rs_dpto=$stmt_dpto->get_result();

				        if($row_dpto = $rs_dpto->fetch_assoc()) {
				        
				            $dpto = $row_dpto['nombre'];

				        }


			      		// Origen dato del Cliente especificado
			            //--------------------------------------------------------------

			            $result_od = 'SELECT * FROM origen_dato WHERE id_origen_dato=?';

					      $stmt_od = $conn->prepare($result_od);

					      if($stmt_od===false) {
					        trigger_error('Wrong SQL: ' . $result_od . ' Error: ' . $conn->error, E_USER_ERROR);
					      }

					      $stmt_od->bind_param('i',$id_origen_dato);   

					      $stmt_od->execute(); 

					      $rs_od=$stmt_od->get_result(); 

					      if($row_od=$rs_od->fetch_assoc()){  

					      	$origen_dato=$row_od['origen_dato']; 

					      }


			      }else{
			      	$num_llamados=0;
			      	$fecha_ult_llamado='';
			      	$grado_interes='';
			      	$fecha_origen_dato='';
			      	$origen_dato='';
			      }

     		}//if($row_cliente)


     		// SubConsulta para obtener los datos del Vendedor
            //--------------------------------------------------------------

            $result_vend = 'SELECT * FROM vendedor WHERE id_vendedor=?';

			$stmt_vend = $conn->prepare($result_vend);

			if($stmt_vend===false) {
				trigger_error('Wrong SQL: ' . $result_vend . ' Error: ' . $conn->error, E_USER_ERROR);
			}

			$stmt_vend->bind_param('i',$id_vendedor);   

			$stmt_vend->execute(); 

			$rs_vend=$stmt_vend->get_result(); 

	      	if($row_vend=$rs_vend->fetch_assoc()){

    		 	 $vendedor=$row_vend['nombre'];

	      	}//if($row_vend)    


	      	// SubConsulta para obtener los datos de la Inmobiliaria
            //--------------------------------------------------------------

            $result_inmob = 'SELECT * FROM inmobiliaria WHERE id_inmobiliaria=?';

			$stmt_inmob = $conn->prepare($result_inmob);

			if($stmt_inmob===false) {
			trigger_error('Wrong SQL: ' . $result_inmob . ' Error: ' . $conn->error, E_USER_ERROR);
			}

			$stmt_inmob->bind_param('i',$id_inmobiliaria);   

			$stmt_inmob->execute(); 

			$rs_inmob=$stmt_inmob->get_result(); 

	      	if($row_inmob=$rs_inmob->fetch_assoc()){

    		 	 $inmobiliaria=$row_inmob['nombre'];

	      	}//if($row_inmob)    	


	      	
            
            $temp=array('id_planilla'=>utf8_encode($row_planilla['id_planilla']),           		

					'id_edificio'=>utf8_encode($id_edificio),
					'edificio'=> utf8_encode($edificio),

					'id_planta'=>utf8_encode($id_planta),
					'planta'=> utf8_encode($planta),

					'id_dpto'=>utf8_encode($id_dpto),
					'dpto'=> utf8_encode($dpto),

            		'id_cliente'=>utf8_encode($row_planilla['id_cliente']),
					'apellido'=>utf8_encode($apellido),
					'nombre'=>utf8_encode($nombre),
					'tipo_cliente'=>utf8_encode($tipo_cliente),
					'telefono1'=>utf8_encode($telefono1),
					'telefono2'=>utf8_encode($telefono2),
					'provincia'=>utf8_encode($provincia),
					'localidad'=>utf8_encode($localidad),
					'actividad'=>utf8_encode($actividad),
					'conoce'=>utf8_encode($conoce),
					'email'=>utf8_encode($email),  

					'origen_dato'=>utf8_encode($origen_dato), 
					'fecha_origen_dato'=>utf8_encode($fecha_origen_dato),					
					'fecha_ult_llamado'=>utf8_encode($fecha_ult_llamado),
					'grado_interes'=>utf8_encode($grado_interes),						
					'num_llamados'=>utf8_encode($num_llamados),  
					'fecha_cierre_operacion'=>utf8_encode($fecha_cierre_operacion),
					
					'id_vendedor'=>utf8_encode($row_planilla['id_vendedor']),
					'vendedor'=>utf8_encode($vendedor),

					'id_inmobiliaria'=>utf8_encode($row_planilla['id_inmobiliaria']),
					'inmobiliaria'=>utf8_encode($inmobiliaria)                  
                    );

            $response_planilla[]=$temp;
 
          } while ($row_planilla=$rs_planilla->fetch_assoc());

       }// if($row_planilla)

        $item=array('Planilla' => $response_planilla);
      	$json = json_encode($item);
      	echo $json;

  }//if ($type_accion==="cargar_planilla")

?>		