<?php
        

 include "../conexion.php";  
 
$id_provincia=22;
$nombre="Casas";



  $sql_insert='INSERT INTO localidad (id_localidad, id_provincia, nombre) VALUES
  (?,?,?)';

  $stmt_insert = $conn->prepare($sql_insert);
  if($stmt_insert === false) {
  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
  }

  $idfirst=NULL; 
  echo $id_provincia."<br>";
  echo $nombre."<br>";

  $stmt_insert->bind_param('iis',$idfirst, $id_provincia, $nombre);

  $stmt_insert->execute();

  $last_id=mysqli_insert_id($conn);

  if($last_id!=0){
    $message="Se guardo una nueva localidad";
  }else{
    $message="La nueva localidad no se guardó";
  }


  //***************************************************************************************///

  $item=array('Mensaje' => utf8_encode($message));
  $json = json_encode($item);
  echo $json;