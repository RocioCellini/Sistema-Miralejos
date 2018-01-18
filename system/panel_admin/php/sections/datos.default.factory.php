<?php
        
      
     $json = file_get_contents('php://input');
     $data=json_decode($json);
    

     $type_accion=$data->{'type_accion'};
    
    // $type_accion='search_edificio_planta_dpto';
     
      if ($type_accion==="search_provincialocalidad") {


        include "../conexion.php";  

        //Provincias 

        $result = "SELECT * FROM provincia";
        $stmt = $conn->prepare($result);

        if($stmt === false) {
            trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
        }


        /* Bind parameters. TYpes: s = string, i = integer, d = double,  b = blob */            
        $stmt->execute();
        $rs=$stmt->get_result();

        if($row = $rs->fetch_assoc()) {
        
            $response_prov = array();

            do  {

                $temp=array('id'=>utf8_encode($row['Id']),
                            'name'=> utf8_encode($row['Provincia'])
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


        /* Bind parameters. TYpes: s = string, i = integer, d = double,  b = blob */            
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
    
     
        $item=array('provincia' => $response_prov, 'localidad' => $response_loc);
        $json = json_encode($item);
        echo $json;

}  //if ($type_accion==="search_provincialocalidad")


//***************************************************************************************************


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


if($type_accion==="relacion_edificio_planta_dpto") {

        include "../conexion.php";  
        
        $id_edificio=$data->{'id_edificio'};
    
        $result = "SELECT * FROM tabla_intermedia_dpto where id_edificio=?";
        $stmt = $conn->prepare($result);

        if($stmt === false) {
            trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
        }


        /* Bind parameters. Types: s = string, i = integer, d = double,  b = blob */  
        $stmt->bind_param('i',$id_edificio);          
        $stmt->execute();
        $rs=$stmt->get_result();

        if($row = $rs->fetch_assoc()) {
        
            $response = array();

            do {

                    // SubConsulta para Obtener Plantas
                    //--------------------------------------------------------------
                    $result_planta = "SELECT * FROM planta where id_planta=?";
                    $stmt_planta = $conn->prepare($result_planta);

                    if($stmt_planta === false) {
                        trigger_error('Wrong SQL: ' . $result_planta . ' Error: ' . $conn->error, E_USER_ERROR);
                    }


                    /* Bind parameters. TYpes: s = string, i = integer, d = double,  b = blob */  
                    $stmt_planta->bind_param('i', $row['id_planta']);          
                    $stmt_planta->execute();
                    $rs_planta=$stmt_planta->get_result();

                    if($row_planta = $rs_planta->fetch_assoc()) {
                        

                            
                            do {


                                $result2 = "SELECT * FROM tabla_intermedia_dpto where id_edificio=? and id_planta=?";
                                $stmt2 = $conn->prepare($result2);

                                if($stmt2 === false) {
                                trigger_error('Wrong SQL: ' . $result2 . ' Error: ' . $conn->error, E_USER_ERROR);
                                }


                              
                                $stmt2->bind_param('ii', $id_edificio, $row_planta['id_planta']);          
                                $stmt2->execute();
                                $rs2=$stmt2->get_result();

                               

                                //echo  $id_edificio."<br>";
                                //echo  $row_planta['id_planta']."<br>";



                                if($row2 = $rs2->fetch_assoc()) {
                                       
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
                                    
                                   
                                }                            

                                  $dptos[]=$temp2;
                    
                                 $temp1=array('id_planta'=>utf8_encode($row_planta['id_planta']),
                                    'nombre'=>utf8_encode($row_planta['nombre']),
                                    'dptos'=>$dptos);


                                 unset($dptos);

                            } while ($row_planta=$rs_planta->fetch_assoc());


                    }// Planta

                
                $response_planta[]=$temp1;
            
          
            } while ($row= $rs->fetch_assoc());

        }
    
     
        $item=array( 'plantas' => $response_planta);
        $json = json_encode($item);
        echo $json;
}