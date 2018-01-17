<?php
        
      
     $json = file_get_contents('php://input');
     $data=json_decode($json);
    

     $type_accion=$data->{'type_accion'};

     //$type_accion="add_relacion";
      
      if ($type_accion==="add_relacion") {

        include "../conexion.php"; 


        //Edificios

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

        $result_planta = "SELECT * FROM plantas";

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

        $result_dpto = "SELECT * FROM departamentos";

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

}  //if ($type_accion==="add_relacion")


