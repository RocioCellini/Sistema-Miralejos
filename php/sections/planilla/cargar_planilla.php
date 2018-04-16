<?php

session_start();

$json=file_get_contents('php://input');
$data=json_decode($json);

//$type_accion=$data->{'type_accion'};

$type_accion="cargar_planilla";

if ($type_accion==="cargar_planilla" && isset($_SESSION['Usuario'])) {

		include "../../conexion.php";

		$result_planilla = 'SELECT * FROM planilla_de_venta';

		$stmt_planilla = $conn->prepare($result_planilla);

		if($stmt_planilla===false) {
		trigger_error('Wrong SQL: ' . $result_planilla . ' Error: ' . $conn->error, E_USER_ERROR);
		}

		$stmt_planilla->execute(); 

		$rs_planilla=$stmt_planilla->get_result(); 

		if($row_planilla=$rs_planilla->fetch_assoc()){

		$id_cliente=$row_planilla['id_cliente'];

		$response_planilla = array();

		do{

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

		        // Cliente especificado
	            //--------------------------------------------------------------

	      		 $response_cliente = array();   

    		 	 $temp1=array('id_cliente'=>utf8_encode($row_cliente['id_cliente']),
					'apellido'=>utf8_encode($row_cliente['apellido']),
					'nombre'=>utf8_encode($row_cliente['nombre']),
					'telefono1'=>utf8_encode($row_cliente['telefono1']),
					'telefono2'=>utf8_encode($row_cliente['telefono2']),
					'provincia'=>utf8_encode($provincia),
					'localidad'=>utf8_encode($localidad),
					'actividad'=>utf8_encode($actividad),
					'conoce'=>utf8_encode($conoce),
					'email'=>utf8_encode($row_cliente['email'])                      
                        );

        		$response_cliente[]=$temp1;            

     		}//if($row_cliente)
            
            $temp=array('id_planilla'=>utf8_encode($row_planilla['id_planilla']),
					'id_cliente'=>utf8_encode($row_planilla['id_cliente']),
					'tipo_cliente'=>utf8_encode($row_planilla['tipo_cliente']),
					'id_vendedor'=>utf8_encode($row_planilla['id_vendedor']),
					'id_inmobiliaria'=>utf8_encode($row_planilla['id_inmobiliaria']),
					'fecha_cierre_operacion'=>utf8_encode($row_planilla['fecha_cierre_operacion']),
					'id_edificio'=>utf8_encode($row_planilla['id_edificio']),
					'id_planta'=>utf8_encode($row_planilla['id_planta']),
					'id_dpto'=>utf8_encode($row_planilla['id_dpto'])                  
                    );

            $response_planilla[]=$temp;
 
          } while ($row_planilla=$rs_planilla->fetch_assoc());

       }// if($row_planilla)
     
      $item=array('Planilla' => $response_planilla, 'Cliente' => $response_cliente);
      $json = json_encode($item);
      echo $json;

  }//if ($type_accion==="cargar_planilla")

?>		