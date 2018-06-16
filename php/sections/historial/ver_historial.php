<?php

session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'}; 
//$type_accion="ver_historial";

if ($type_accion==="ver_historial" && isset($_SESSION['Usuario'])) {

  $id_cliente=$data->{'id_cliente'};
  $apellido=$data->{'apellido'};
  $nombre=$data->{'nombre'};


	include "../../conexion.php";

  //$id_cliente=1;

  if($id_cliente!=="") {  

      $result = 'SELECT * FROM llamado WHERE id_cliente=?';

      $stmt = $conn->prepare($result);

      if($stmt===false) {
      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
      } 

      $stmt->bind_param('i',$id_cliente); 

      $stmt->execute(); 

      $rs=$stmt->get_result(); 

      if($row=$rs->fetch_assoc()){

         $response = array();

         do{  
                $id_vendedor=$row['id_vendedor'];
                $id_edificio=$row['id_edificio'];
                $id_planta=$row['id_planta'];
                $id_dpto=$row['id_dpto'];
                $id_cierre_operacion=$row['id_cierre_operacion'];
                $id_origen_dato=$row['id_origen_dato'];

                if ($id_vendedor==0) {
                  $vendedor='Sin Datos';
                }

                if ($id_edificio==0) {
                  $edificio='Sin Datos';
                }

                if ($id_planta==0) {
                  $planta='Sin Datos';
                }

                if ($id_dpto==0) {
                  $dpto='Sin Datos';
                }

                if ($id_cierre_operacion==0) {
                  $cierre_operacion='Sin Datos';
                }

                if ($id_origen_dato==0) {
                  $origen_dato='Sin Datos';
                }

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

                }   

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

                // SubConsulta para obtener si se cerró la operación
                //--------------------------------------------------------------

                $result_co = 'SELECT * FROM cierre_operacion WHERE id_cierre_operacion=?';

                $stmt_co = $conn->prepare($result_co);

                if($stmt_co===false) {
                  trigger_error('Wrong SQL: ' . $result_co . ' Error: ' . $conn->error, E_USER_ERROR);
                }

                $stmt_co->bind_param('i',$id_cierre_operacion);   

                $stmt_co->execute(); 

                $rs_co=$stmt_co->get_result(); 

                if($row_co=$rs_co->fetch_assoc()){

                 $cierre_operacion=$row_co['cierre_operacion'];

                }   

                // SubConsulta para obtener el origen del dato
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

            
            $temp=array('id_cliente'=>utf8_encode($row['id_cliente']),
                  'apellido'=>utf8_encode($apellido),
                  'nombre'=>utf8_encode($nombre),

                  'id_llamado'=>utf8_encode($row['id_llamado']),
                  'id_vendedor'=>utf8_encode($id_vendedor),
                  'vendedor'=>utf8_encode($vendedor),
                  'fecha_llamado'=>utf8_encode($row['fecha_llamado']),
                  'hora_llamado'=>utf8_encode($row['hora_llamado']),

                  'id_edificio'=>utf8_encode($id_edificio),
                  'id_planta'=>utf8_encode($id_planta),
                  'id_dpto'=>utf8_encode($id_dpto),
                  'edificio'=>utf8_encode($edificio),
                  'planta'=>utf8_encode($planta),
                  'dpto'=>utf8_encode($dpto),

                  'id_cierre_operacion'=>utf8_encode($row['id_cierre_operacion']),
                  'cierre_operacion'=>utf8_encode($cierre_operacion),
                  'fecha_cierre_operacion'=>utf8_encode($row['fecha_cierre_operacion']),     
                  'grado_interes'=>utf8_encode($row['grado_interes']),
                  'id_origen_dato'=>utf8_encode($row['id_origen_dato']),
                  'origen_dato'=>utf8_encode($origen_dato),
                  'fecha_origen_dato'=>utf8_encode($row['fecha_origen_dato']),
                  'anotaciones'=>utf8_encode($row['anotaciones'])
                            );

            $response[]=$temp;
          
          } while ($row=$rs->fetch_assoc());

       } else { 
          $mensaje=array('Mensaje'=>utf8_encode("El cliente seleccionado no tiene llamados"));
          $response[]=$mensaje;
       } 

      //***************************************************************************************///

      $item=array('Respuesta' => $response);
      $json = json_encode($item);
      echo $json;  

    }


}//if ($type_accion==="ver_historial") 

?>		