<?php

$json = file_get_contents('php://input');
$data=json_decode($json);

/*$type_accion=$data->{'type_accion'};

$type_accion=="buscar_vendedor";

if ($type_accion==="buscar_vendedor") {*/

    include "../../conexion.php";

   // $email='farraras@miralejos.net';

   // $criterio=$data->{'criterio'}; 

   $criterio="silvina";

    $type_data=null;
    $data_query[0]=$type_data;
    $subconsulta="";


    if($criterio!=="") {    

      $criterio_partes="%".$criterio."%";   
        
      $criterio_partes_utf=utf8_decode($criterio_partes);

      $subconsulta=" WHERE (nombre Like ? OR email like ?)";
      $type_data='ss';
      $count_criterio=2;  

      for ($i=1;$i<=$count_criterio;$i++){
        $data_query[]=$criterio_partes_utf;
      }

      //echo $criterio_partes_utf;

    }


    $result = 'SELECT * FROM vendedor'.$subconsulta.' ORDER BY nombre';

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

       do {

          $temp=array('id_vendedor'=>utf8_encode($row['id_vendedor']),
                      'nombre'=>utf8_encode($row['nombre']),              
                      'email'=>utf8_encode($row['email'])                       
                    );

          $response[]=$temp;

        } while ($row=$rs->fetch_assoc());    

    } else { 

        $mensaje=array($message=>utf8_encode("No se encontró un vendedor con el email ingresado"));
        $response[]=$mensaje;
    } 

    //**************************************************************************///

    $item=array('Respuesta' => $response);
    $json = json_encode($item);
    echo $json;

 // }//if ($type_accion==="buscar_vendedor") 

?>    