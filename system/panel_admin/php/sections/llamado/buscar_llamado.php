<?php

$json = file_get_contents('php://input');
$data=json_decode($json);


$type_accion=$data->{'type_accion'};

//$type_accion=="buscar_llamado";

/* Nuevo llamado
$this_day=date("Y-m-d");
$dd=explode('-',$this_day);
$this_day=$dd[2]."/".$dd[1]."/".$dd[0];


$arr2=array('fechareal'=>$this_day);

$json = json_encode($arr2);
echo $json; 
*/

if ($type_accion==="buscar_llamado") {

  $criterio=$data->{'criterio'};
  
  //echo $criterio;

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

         //echo "entro al if";

         do{  

            $id_vendedor=$row["id_vendedor"];
            $id_cliente=$row["id_cliente"];   
            $id_edificio=$row["id_edificio"]; 
            $id_planta=$row["id_planta"]; 
            $id_dpto=$row["id_dpto"]; 

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
            
            $temp=array('id_llamado'=>utf8_encode($row['id_llamado']),
                        'vendedor'=>utf8_encode($vendedor),
                        'nombre_cliente'=>utf8_encode($nombre_cliente),
                        'apellido_cliente'=>utf8_encode($apellido_cliente),
                        'fecha_llamado'=> utf8_encode($row['fecha_llamado']), 
                        'hora_llamado'=>utf8_encode($row['hora_llamado']),
                        'edificio'=>utf8_encode($edificio),
                        'planta'=>utf8_encode($planta),
                        'dpto'=>utf8_encode($dpto),                    
                        'grado_interes'=>utf8_encode($row['grado_interes']),
                        'nombre_origen_dato'=>utf8_encode($row['nombre_origen_dato']),
                        'fecha_origen_dato'=>utf8_encode($row['fecha_origen_dato']),
                        'anotaciones'=>utf8_encode($row['anotaciones'])
                            );

            $response[]=$temp;
          
          } while ($row=$rs->fetch_assoc());

       } else { 
          $mensaje=array($message=>utf8_encode("No se encontró un llamado con el nombre ingresado"));
          $response[]=$mensaje;
       } 

      //***************************************************************************************///

      $item=array('Respuesta' => $response);
      $json = json_encode($item);
      echo $json;  

    }

}//if ($type_accion==="buscar_llamado") 

?>    