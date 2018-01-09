<?php
        
      /*  
     $json = file_get_contents('php://input');
     $data=json_decode($json);
    */

     //$type_accion=$data->{'type_accion'};

     $type_accion="search_provincialocalidad";

    if ($type_accion==="search_provincialocalidad") {


        include "../conexion.php";   

        $result = "SELECT * FROM provincia";
        $stmt = $conn->prepare($result);

        if($stmt === false) {
            trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
        }


        /* Bind parameters. TYpes: s = string, i = integer, d = double,  b = blob */            
        $stmt->execute();
        $rs=$stmt->get_result();

        if($row = $rs->fetch_assoc()) {
        
            $response = array();

            do  {

                $temp=array('id'=>utf8_encode($row['Id']),
                            'name'=> utf8_encode($row['Provincia'])
                              );


                $response[]=$temp;

            }  while ($row= $rs->fetch_assoc());


        }
    
    
     
        $item=array('provincia' => $response);
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