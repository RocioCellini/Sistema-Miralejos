<?php
        

 include "../conexion.php";  

$id_edifico=1;
$row_planta['id_planta']=3;

$result2 = "SELECT * FROM tabla_intermedia_dpto where id_edificio=? and id_planta=?";
$stmt2 = $conn->prepare($result2);

if($stmt2 === false) {
trigger_error('Wrong SQL: ' . $result2 . ' Error: ' . $conn->error, E_USER_ERROR);
}



$stmt2->bind_param('ii', $id_edifico, $row_planta['id_planta']);          
$stmt2->execute();
$rs2=$stmt2->get_result();



//echo  $id_edificio."<br>";
//echo  $row_planta['id_planta']."<br>";



if($row2 = $rs2->fetch_assoc()) {


    echo "Chipote";

}                            
