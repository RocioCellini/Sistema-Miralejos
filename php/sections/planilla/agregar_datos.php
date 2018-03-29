<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain");	
session_start();
//if(isset($_SESSION['Id_Usuario'])) {

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

//$type_accion="nueva_fila";

if($type_accion==="nueva_fila"){
  
	include "../../conexion.php";	
	
	
  $id_cliente=$data->{'id_cliente'}; 
  $tipo_cliente=$data->{'tipo_cliente'};
  $grado_interes=$data->{'grado_interes'};
  $telefono1=$data->{'telefono1'}; 
  $telefono2=$data->{'telefono2'}; 
  $origen_dato=$data->{'origen_dato'};
  $conoce=$data->{'conoce'};
  $fecha_origen_dato=$data->{'fecha_origen_dato'};
  $fecha_ult_llamado=$data->{'fecha_ult_llamado'};
  $cant_de_llamados=$data->{'cant_de_llamados'};
  $fecha_cierre_operacion=$data->{'fecha_cierre_operacion'};
  $id_edificio=$data->{'id_edificio'};
  $id_planta=$data->{'id_planta'};
  $id_dpto=$data->{'id_dpto'};
  $email=$data->{'email'};


/*

  $id_cliente=15; 
  $tipo_cliente=0;
  $grado_interes=2;
  $telefono1=54552; 
  $telefono2=5225; 
  $origen_dato="Letrero";
  $conoce=0;
  $fecha_origen_dato="2018-03-06";
  $fecha_ult_llamado="2018-02-07";
  $cant_de_llamados=2;
  $fecha_cierre_operacion="2018-03-12";
  $id_edificio=2;
  $id_planta=4;
  $id_dpto=3;
  $email="maria@miralejos.net";
*/

  //Buscar el cliente para traer los datos de los id

   $result = 'SELECT * FROM cliente WHERE id_cliente=?';

      $stmt = $conn->prepare($result);

      if($stmt===false) {
      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
      } 

      $stmt->bind_param('i',$id_cliente); 

      $stmt->execute(); 

      $rs=$stmt->get_result(); 

      if($row=$rs->fetch_assoc()){

          $id_localidad=$row["id_localidad"];
          $id_provincia=$row["id_provincia"];
          $id_actividad=$row["id_actividad"];
       } 
  
  
  //Insertamos los datos en la tabla de la BD

  $sql_insert='INSERT INTO tabla_intermedia_planilla (id_planilla, id_cliente, tipo_cliente, grado_interes, telefono1, telefono2, id_localidad, id_provincia, origen_dato, id_actividad, conoce, fecha_origen_dato, fecha_ult_llamado, cant_de_llamados, fecha_cierre_operacion, id_edificio, id_planta, id_dpto, email) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  $idfirst=NULL; 

  $stmt_insert->bind_param('iisiiiiisiissisiiis',$idfirst, $id_cliente, $tipo_cliente, $grado_interes, $telefono1, $telefono2, $id_localidad, $id_provincia, $origen_dato, $id_actividad, $conoce, $fecha_origen_dato, $fecha_ult_llamado, $cant_de_llamados, $fecha_cierre_operacion, $id_edificio, $id_planta, $id_dpto, $email);

  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);

  if($last_id!=0){
    $message="Se guardo una nueva fila en la planilla";
  }else{
    $message="La nueva fila no se guardó";
  }

  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;
            
  } //if($type_accion==="agregar_datos")
 
?>      