<?php
        
        
     $json = file_get_contents('php://input');
     $data=json_decode($json);
    

     $type_accion=$data->{'type_accion'};

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

} 


 /*

        $result = "SELECT * FROM Sis_Localidades";
        $stmt = $this->con->prepare($result);

        if($stmt === false) {
            trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
        }


                  
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $rs=$stmt->get_result();
        //echo $row['Id_Localidad'];

        if($row= $rs->fetch_assoc()) {
            return $row['Localidad'];
        }
 
*/