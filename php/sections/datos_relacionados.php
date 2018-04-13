<?php

    session_start();
             
    $json = file_get_contents('php://input');
    $data=json_decode($json);  

    $type_accion=$data->{'type_accion'};
    
    //$type_accion='combos_agregar_datos';
     
      if ($type_accion==="search_data_combos" && isset($_SESSION['Usuario'])) {


        include "../conexion.php";  

        //Provincias 

        $result = "SELECT * FROM provincia";
        $stmt = $conn->prepare($result);

        if($stmt === false) {
            trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
        }
         
        $stmt->execute();
        $rs=$stmt->get_result();

        if($row = $rs->fetch_assoc()) {
        
            $response_prov = array();

            do  {

                $temp=array('id'=>utf8_encode($row['id_provincia']),
                            'name'=> utf8_encode($row['nombre'])
                );

                $response_prov[]=$temp;

            }  while ($row= $rs->fetch_assoc());
        }

        //Localidades

        $result_loc = "SELECT * FROM localidad";
        $stmt_loc = $conn->prepare($result_loc);

        if($stmt_loc === false) {
            trigger_error('Wrong SQL: ' . $result_loc . ' Error: ' . $conn->error, E_USER_ERROR);
        }
          
        $stmt_loc->execute();
        $rs_loc=$stmt_loc->get_result();

        if($row_loc = $rs_loc->fetch_assoc()) {
        
            $response_loc = array();

            do  {

                $temp_loc=array('id'=>utf8_encode($row_loc['id_localidad']),
                            'name'=> utf8_encode($row_loc['nombre']), 
                            'id_provincia'=>utf8_encode($row_loc['id_provincia'])
                );

                $response_loc[]=$temp_loc;

            }  while ($row_loc= $rs_loc->fetch_assoc());
        }   

         //Actividades

        $result_act = "SELECT * FROM actividad";
        $stmt_act = $conn->prepare($result_act);

        if($stmt_act === false) {
            trigger_error('Wrong SQL: ' . $result_act . ' Error: ' . $conn->error, E_USER_ERROR);
        }
          
        $stmt_act->execute();
        $rs_act=$stmt_act->get_result();

        if($row_act = $rs_act->fetch_assoc()) {
        
            $response_act = array();

            do  {

                $temp_act=array('id'=>utf8_encode($row_act['id_actividad']),
                            'name'=> utf8_encode($row_act['nombre'])
                );

                $response_act[]=$temp_act;

            }  while ($row_act= $rs_act->fetch_assoc());
        }   

     
        $item=array('provincia' => $response_prov, 'localidad' => $response_loc, 'actividad' => $response_act);
        $json = json_encode($item);
        echo $json;

}  //if ($type_accion==="search_data_combos")


//******************************************************************************************


if ($type_accion==="combos_agregar_datos") {

     include "../conexion.php";  

           //Provincias 

        $result = "SELECT * FROM provincia";
        $stmt = $conn->prepare($result);

        if($stmt === false) {
            trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
        }
         
        $stmt->execute();
        $rs=$stmt->get_result();

        if($row = $rs->fetch_assoc()) {
        
            $response_prov = array();

            do  {

                $temp=array('id'=>utf8_encode($row['id_provincia']),
                            'name'=> utf8_encode($row['nombre'])
                );

                $response_prov[]=$temp;

            }  while ($row= $rs->fetch_assoc());
        }

        //Localidades

        $result_loc = "SELECT * FROM localidad";
        $stmt_loc = $conn->prepare($result_loc);

        if($stmt_loc === false) {
            trigger_error('Wrong SQL: ' . $result_loc . ' Error: ' . $conn->error, E_USER_ERROR);
        }
          
        $stmt_loc->execute();
        $rs_loc=$stmt_loc->get_result();

        if($row_loc = $rs_loc->fetch_assoc()) {
        
            $response_loc = array();

            do  {

                $temp_loc=array('id'=>utf8_encode($row_loc['id_localidad']),
                            'name'=> utf8_encode($row_loc['nombre']), 'id_provincia'=>utf8_encode($row_loc['id_provincia'])
                );

                $response_loc[]=$temp_loc;

            }  while ($row_loc= $rs_loc->fetch_assoc());
        }   

         //Vendedor
        //-----------------------------------------------------     
        $result_vend = "SELECT * FROM vendedor";
        $stmt_vend = $conn->prepare($result_vend);

        if($stmt_vend === false) {
            trigger_error('Wrong SQL: ' . $result_vend . ' Error: ' . $conn->error, E_USER_ERROR);
        }
          
        $stmt_vend->execute();
        $rs_vend=$stmt_vend->get_result();

        if($row_vend = $rs_vend->fetch_assoc()) {
        
            $response_vend = array();

            do  {

                $temp_vend=array('id'=>utf8_encode($row_vend['id_vendedor']),
                            'name'=> utf8_encode($row_vend['nombre'])
                );

                $response_vend[]=$temp_vend;

            }  while ($row_vend= $rs_vend->fetch_assoc());
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
        
            $response_inmob = array();

            do  {

                $temp_inmob=array('id'=>utf8_encode($row_inmob['id_inmobiliaria']),
                            'name'=> utf8_encode($row_inmob['nombre'])
                );

                $response_inmob[]=$temp_inmob;

            }  while ($row_inmob= $rs_inmob->fetch_assoc());
        }   


        //Edificio
        //-----------------------------------------------------
        $result = "SELECT * FROM edificio";
        $stmt = $conn->prepare($result);

        if($stmt === false) {
            trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
        }
       
        $stmt->execute();
        $rs=$stmt->get_result();

        if($row = $rs->fetch_assoc()) {
        
            $response_edificio = array();

            do  {

                $temp=array('id_edificio'=>utf8_encode($row['id_edificio']),
                            'nombre'=> utf8_encode($row['nombre'])
                );

                $response_edificio[]=$temp;

            }  while ($row= $rs->fetch_assoc());
        }


        //Plantas
        //-----------------------------------------------------
        $result_planta = "SELECT * FROM planta";

        $stmt_planta = $conn->prepare($result_planta);

        if($stmt_planta === false) {
            trigger_error('Wrong SQL: ' . $result_planta . ' Error: ' . $conn->error, E_USER_ERROR);
        }

        $stmt_planta->execute();
        $rs_planta=$stmt_planta->get_result();

        if($row_planta = $rs_planta->fetch_assoc()) {
        
            $response_planta = array();

            do  {

                $temp_planta=array('id_planta'=>utf8_encode($row_planta['id_planta']),
                            'nombre'=> utf8_encode($row_planta['nombre'])
                );

                $response_planta[]=$temp_planta;

            }  while ($row_planta= $rs_planta->fetch_assoc());
        }


        //Departamentos
        //-----------------------------------------------------
        $result_dpto = "SELECT * FROM departamento";

        $stmt_dpto = $conn->prepare($result_dpto);

        if($stmt_dpto === false) {
            trigger_error('Wrong SQL: ' . $result_dpto . ' Error: ' . $conn->error, E_USER_ERROR);
        }
      
        $stmt_dpto->execute();
        $rs_dpto=$stmt_dpto->get_result();

        if($row_dpto = $rs_dpto->fetch_assoc()) {
        
            $response_dpto = array();

            do  {

                $temp_dpto=array('id_dpto'=>utf8_encode($row_dpto['id_dpto']),
                            'nombre'=> utf8_encode($row_dpto['nombre'])
                );

                $response_dpto[]=$temp_dpto;

            }  while ($row_dpto= $rs_dpto->fetch_assoc());
        }


        //Origen Datos
        //-----------------------------------------------------

        $result_origen = "SELECT * FROM origen_dato";

        $stmt_origen = $conn->prepare($result_origen);

        if($stmt_origen === false) {
            trigger_error('Wrong SQL: ' . $result_origen . ' Error: ' . $conn->error, E_USER_ERROR);
        }
      
        $stmt_origen->execute();
        $rs_origen=$stmt_origen->get_result();

        if($row_origen = $rs_origen->fetch_assoc()) {
        
            $response_origen = array();

            do  {

                $temp_origen=array('id_origen_dato'=>utf8_encode($row_origen['id_origen_dato']),
                            'origen_dato'=> utf8_encode($row_origen['origen_dato'])
                );

                $response_origen[]=$temp_origen;

            }  while ($row_origen= $rs_origen->fetch_assoc());
        }
    
        $item=array('provincia' => $response_prov, 'localidad' => $response_loc, 'vendedor' => $response_vend, 'inmobiliaria' => $response_inmob, 'edificio' => $response_edificio, 'planta' => $response_planta, 'dpto' => $response_dpto, 'origen_dato' => $response_origen);
        $json = json_encode($item);
        echo $json;

} //if ($type_accion==="combos_agregar_datos")



//******************************************************************************************


if ($type_accion==="buscar_edificio_planta_dpto") {


        include "../conexion.php";  

        //Edificio
        //-----------------------------------------------------
        $result = "SELECT * FROM edificio";
        $stmt = $conn->prepare($result);

        if($stmt === false) {
            trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
        }
       
        $stmt->execute();
        $rs=$stmt->get_result();

        if($row = $rs->fetch_assoc()) {
        
            $response_edificio = array();

            do  {

                $temp=array('id_edificio'=>utf8_encode($row['id_edificio']),
                            'nombre'=> utf8_encode($row['nombre'])
                );

                $response_edificio[]=$temp;

            }  while ($row= $rs->fetch_assoc());
        }


        //Plantas
        //-----------------------------------------------------
        $result_planta = "SELECT * FROM planta";

        $stmt_planta = $conn->prepare($result_planta);

        if($stmt_planta === false) {
            trigger_error('Wrong SQL: ' . $result_planta . ' Error: ' . $conn->error, E_USER_ERROR);
        }

        $stmt_planta->execute();
        $rs_planta=$stmt_planta->get_result();

        if($row_planta = $rs_planta->fetch_assoc()) {
        
            $response_planta = array();

            do  {

                $temp_planta=array('id_planta'=>utf8_encode($row_planta['id_planta']),
                            'nombre'=> utf8_encode($row_planta['nombre'])
                );

                $response_planta[]=$temp_planta;

            }  while ($row_planta= $rs_planta->fetch_assoc());
        }


        //Departamentos
        //-----------------------------------------------------
        $result_dpto = "SELECT * FROM departamento";

        $stmt_dpto = $conn->prepare($result_dpto);

        if($stmt_dpto === false) {
            trigger_error('Wrong SQL: ' . $result_dpto . ' Error: ' . $conn->error, E_USER_ERROR);
        }
      
        $stmt_dpto->execute();
        $rs_dpto=$stmt_dpto->get_result();

        if($row_dpto = $rs_dpto->fetch_assoc()) {
        
            $response_dpto = array();

            do  {

                $temp_dpto=array('id_dpto'=>utf8_encode($row_dpto['id_dpto']),
                            'nombre'=> utf8_encode($row_dpto['nombre'])
                );

                $response_dpto[]=$temp_dpto;

            }  while ($row_dpto= $rs_dpto->fetch_assoc());
        }
    
        $item=array('edificio' => $response_edificio, 'planta' => $response_planta, 'dpto' => $response_dpto);
        $json = json_encode($item);
        echo $json;

} //if ($type_accion==="edificio_planta_dpto")




if($type_accion==="relacion_edificio_planta_dpto"){

        include "../conexion.php";  
        
        $id_edificio=$data->{'id_edificio'};
      
    
        $result = "SELECT DISTINCT id_planta FROM tabla_intermedia_dpto where id_edificio=?";
        $stmt = $conn->prepare($result);

        if($stmt === false) {
            trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
        }

        $stmt->bind_param('i',$id_edificio);          
        $stmt->execute();
        $rs=$stmt->get_result();

        if($row = $rs->fetch_assoc()) {
        
            $response = array();       

            do {

                // SubConsulta para Obtener NOMBRE de las Plantas
                //--------------------------------------------------------------
                $result_planta = "SELECT * FROM planta where id_planta=?";
                $stmt_planta = $conn->prepare($result_planta);

                if($stmt_planta === false) {
                    trigger_error('Wrong SQL: ' . $result_planta . ' Error: ' . $conn->error, E_USER_ERROR);
                }
 
                $stmt_planta->bind_param('i', $row['id_planta']);          
                $stmt_planta->execute();
                $rs_planta=$stmt_planta->get_result();


                if($row_planta = $rs_planta->fetch_assoc()) {                        
                          
                    //  echo "ID DE LAS PLANTAS:".$row_planta['id_planta']."<br>";                               
                    
                    do {

                        $result2 = "SELECT * FROM tabla_intermedia_dpto where id_edificio=? and id_planta=?";
                        $stmt2 = $conn->prepare($result2);

                        if($stmt2 === false) {
                        trigger_error('Wrong SQL: ' . $result2 . ' Error: ' . $conn->error, E_USER_ERROR);
                        }
                      
                        $stmt2->bind_param('ii', $id_edificio, $row_planta['id_planta']);          
                        $stmt2->execute();
                        $rs2=$stmt2->get_result();

                        if($row2 = $rs2->fetch_assoc()) {

                                  do {

                                   // echo "ID DE LOS DEPARTAMNETOS.".$row2['id_dpto']."<br>";                                            
                                  
                                    // CREAR UN DO WHILE 
                               
                                    $result_dpto = "SELECT * FROM departamento where id_dpto=?";
                                    $stmt_dpto = $conn->prepare($result_dpto);

                                    if($stmt_dpto === false) {
                                    trigger_error('Wrong SQL: ' . $result_dpto . ' Error: ' . $conn->error, E_USER_ERROR);
                                    }

                                    $stmt_dpto->bind_param('i',$row2['id_dpto']);          
                                    $stmt_dpto->execute();
                                    $rs_dpto=$stmt_dpto->get_result();

                                    if($row_dpto = $rs_dpto->fetch_assoc()) {
                                            $temp2=array('id_dpto'=>utf8_encode($row_dpto['id_dpto']),
                                                'nombre'=>utf8_encode($row_dpto['nombre'])
                                            );
                                    }
                                
                                     $dptos[]=$temp2;

                             } while ($row2 = $rs2->fetch_assoc());
                    
                    } // if($row2 = $rs2->                                                                                       
                             
                    $temp1=array('id_planta'=>utf8_encode($row_planta['id_planta']),
                    'nombre'=>utf8_encode($row_planta['nombre']),'dptos'=>$dptos);

                    unset($dptos);
                    
                    $response_planta[]=$temp1;

                    } while ($row_planta=$rs_planta->fetch_assoc());                    

                }// Planta                      
          
            } while ($row= $rs->fetch_assoc());

        } //if($row = $rs->fetch_assoc())  
        
        $item=array( 'plantas' => $response_planta);
        $json = json_encode($item);
        echo $json;
        
}//if($type_accion==="relacion_edificio_planta_dpto")