<?php

session_start();

$json = file_get_contents('php://input');
$data=json_decode($json);


$type_accion=$data->{'type_accion'};

if ($type_accion==="buscar_llamado" && isset($_SESSION['Usuario'])) {

  $criterio=$data->{'criterio'};
  
  
  include "../../conexion.php";

  //$criterio="2011-03-14";

  if($criterio!=="") {  

      $result = 'SELECT * FROM llamado WHERE fecha_llamado=?';

      $stmt = $conn->prepare($result);

      if($stmt===false) {
      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
      }

      $stmt->bind_param('s',$criterio); 

      $stmt->execute(); 

      $rs=$stmt->get_result(); 

      if($row=$rs->fetch_assoc()){

         $response = array();   

         do{  

            $id_vendedor=$row["id_vendedor"];
            $id_cliente=$row["id_cliente"];   
            $id_edificio=$row["id_edificio"]; 
            $id_planta=$row["id_planta"]; 
            $id_dpto=$row["id_dpto"]; 
            $id_inmobiliaria=$row["id_inmobiliaria"];
            $id_cierre_operacion=$row["id_cierre_operacion"];
            $id_origen_dato=$row["id_origen_dato"]; 

            //vendedor
            $result_v = 'SELECT * FROM vendedor WHERE id_vendedor=?';

            $stmt_v = $conn->prepare($result_v);

            if($stmt_v===false) {
              trigger_error('Wrong SQL: ' . $result_v . ' Error: ' . $conn->error, E_USER_ERROR);
            } 

            $stmt_v->bind_param('i',$id_vendedor); 

            $stmt_v->execute(); 

            $rs_v=$stmt_v->get_result(); 

            if($row_v=$rs_v->fetch_assoc()){
              $vendedor=$row_v["nombre"];
            }

            //Cliente
            $result_c = 'SELECT * FROM cliente WHERE id_cliente=?';

            $stmt_c = $conn->prepare($result_c);

            if($stmt_c===false) {
              trigger_error('Wrong SQL: ' . $result_c . ' Error: ' . $conn->error, E_USER_ERROR);
            } 

            $stmt_c->bind_param('i',$id_cliente); 

            $stmt_c->execute(); 

            $rs_c=$stmt_c->get_result(); 

            if($row_c=$rs_c->fetch_assoc()){
              $nombre_cliente=$row_c["nombre"];
              $apellido_cliente=$row_c["apellido"];
              $contacto=$apellido_cliente.', '.$nombre_cliente;
            }

            //Edificio
            $result_e = 'SELECT * FROM edificio WHERE id_edificio=?';

            $stmt_e = $conn->prepare($result_e);

            if($stmt_e===false) {
              trigger_error('Wrong SQL: ' . $result_e . ' Error: ' . $conn->error, E_USER_ERROR);
            } 

            $stmt_e->bind_param('i',$id_edificio); 

            $stmt_e->execute(); 

            $rs_e=$stmt_e->get_result(); 

            if($row_e=$rs_e->fetch_assoc()){
              $edificio=$row_e["nombre"];
            }

             //Planta
            $result_p = 'SELECT * FROM planta WHERE id_planta=?';

            $stmt_p = $conn->prepare($result_p);

            if($stmt_p===false) {
              trigger_error('Wrong SQL: ' . $result_p . ' Error: ' . $conn->error, E_USER_pRROR);
            } 

            $stmt_p->bind_param('i',$id_planta); 

            $stmt_p->execute(); 

            $rs_p=$stmt_p->get_result(); 

            if($row_p=$rs_p->fetch_assoc()){
              $planta=$row_p["nombre"];
            }


             //Dpto
            $result_d = 'SELECT * FROM departamento WHERE id_dpto=?';

            $stmt_d = $conn->prepare($result_d);

            if($stmt_d===false) {
              trigger_error('Wrong SQL: ' . $result_d . ' Error: ' . $conn->error, E_USER_dRROR);
            } 

            $stmt_d->bind_param('i',$id_dpto); 

            $stmt_d->execute(); 

            $rs_d=$stmt_d->get_result(); 

            if($row_d=$rs_d->fetch_assoc()){
              $dpto=$row_d["nombre"];
            }

             //Inmobiliaria
            //-----------------------------------------------------     
            $result_inmob = "SELECT * FROM inmobiliaria";
            $stmt_inmob = $conn->prepare($result_inmob);

            if($stmt_inmob === false) {
                trigger_error('Wrong SQL: ' . $result_inmob . ' Error: ' . $conn->error, E_USER_ERROR);
            }
              
            $stmt_inmob->execute();
            $rs_inmob=$stmt_inmob->get_result();

            if($row_inmob = $rs_inmob->fetch_assoc()) {

              $inmobiliaria=$row_inmob["nombre"];
               
            }   

            //Cierre de Operacion 

            $result_co = "SELECT * FROM cierre_operacion";
            $stmt_co = $conn->prepare($result_co);

            if($stmt_co === false) {
                trigger_error('Wrong SQL: ' . $result_co . ' Error: ' . $conn->error, E_USER_ERROR);
            }
             
            $stmt_co->execute();
            $rs_co=$stmt_co->get_result();

            if($row_co = $rs_co->fetch_assoc()) {
            
               $cierre_operacion=$row_co["cierre_operacion"];
            }

            //Origen Dato

            $result_od = 'SELECT * FROM origen_dato WHERE id_origen_dato=?';

            $stmt_od = $conn->prepare($result_od);

            if($stmt_od===false) {
              trigger_error('Wrong SQL: ' . $result_od . ' Error: ' . $conn->error, E_USER_ERROR);
            } 

            $stmt_od->bind_param('i',$id_origen_dato); 

            $stmt_od->execute(); 

            $rs_od=$stmt_od->get_result(); 

            if($row_od=$rs_od->fetch_assoc()){              
              $nombre_origen_dato=$row_od["origen_dato"];
            }
            
            $id_edificio=$row["id_edificio"]; 
            $id_planta=$row["id_planta"]; 
            $id_dpto=$row["id_dpto"]; 
            $id_origen_dato=$row["id_origen_dato"]; 

            $temp=array('id_llamado'=>utf8_encode($row['id_llamado']),
                        'fecha_llamado'=> utf8_encode($row['fecha_llamado']), 
                        'hora_llamado'=>utf8_encode($row['hora_llamado']),
                        'grado_interes'=>utf8_encode($row['grado_interes']),
                        'fecha_origen_dato'=>utf8_encode($row['fecha_origen_dato']),
                        'anotaciones'=>utf8_encode($row['anotaciones']),

                        'id_vendedor'=>utf8_encode($row['id_vendedor']),
                        'vendedor'=>utf8_encode($vendedor),

                        'id_cliente'=>utf8_encode($row['id_cliente']),
                        'nombre_cliente'=>utf8_encode($nombre_cliente),
                        'apellido_cliente'=>utf8_encode($apellido_cliente),
                        'contacto'=>utf8_encode($contacto),

                        'id_edificio'=>utf8_encode($row['id_edificio']),
                        'edificio'=>utf8_encode($edificio),

                        'id_planta'=>utf8_encode($row['id_planta']),
                        'planta'=>utf8_encode($planta),

                        'id_dpto'=>utf8_encode($row['id_dpto']),
                        'dpto'=>utf8_encode($dpto),    

                        'id_inmobiliaria'=>utf8_encode($row['id_inmobiliaria']),
                        'inmobiliaria'=>utf8_encode($inmobiliaria), 

                        'id_cierre_operacion'=>utf8_encode($row['id_cierre_operacion']),
                        'cierre_operacion'=>utf8_encode($cierre_operacion),  
                        'fecha_cierre_operacion'=>utf8_encode($row['fecha_cierre_operacion']),

                        'id_origen_dato'=>utf8_encode($row['id_origen_dato']),
                        'nombre_origen_dato'=>($nombre_origen_dato)
   
                        );

            $response[]=$temp;
          
          } while ($row=$rs->fetch_assoc());

       } else { 
          $mensaje=array('Mensaje'=>utf8_encode("No se encontró un llamado en la fecha ingresada"));
          $response[]=$mensaje;
       } 

      //***************************************************************************************///

      $item=array('Respuesta' => $response);
      $json = json_encode($item);
      echo $json;  

    }

}//if ($type_accion==="buscar_llamado") 

?>    