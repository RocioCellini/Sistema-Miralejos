<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain");	
session_start();
$_SESSION['Usuario']="Chipi";
if(isset($_SESSION['Usuario'])) {

$json = file_get_contents('php://input');
$data=json_decode($json);

$type_accion=$data->{'type_accion'};

if($type_accion==="search_fac"){
//************************************************************************************************// 
//************************************************************************************************//
    //BUSCAR MEDICOS CON TURNOS 3465
    // Para Obtener Las Disciplinas de los Medicos
    $criterio_1="";
    $criterio_2="";
   
    
    $set_consulta1="";
    $set_consulta2="";

    $type=null;
    $type2="i";
    
    $suma_consulta1=0;
    $suma_consulta2=0;


    if(isset($data->{'criterio'})){
       $criterio_1=$data->{'criterio'};
    
        if($criterio_1!=""){
           $set_consulta1=" WHERE (Apellidos Like ? OR Nombres like ? OR DNI like ?) ";
           $set_consulta2=" WHERE Id_Inscripto=? ";
           $type="sss";
      
           for ($i=1;$i<4;$i++){
              $suma_consulta1++;
              ${'set1_var'.$suma_consulta1}="%".$criterio_1."%";
           }
      }
    }

    if(isset($data->{'typecredit'})){
       
       $criterio_2=$data->{'typecredit'};
       
       if($criterio_2=="1"){
          $set_consulta2=" WHERE Id_Inscripto=? ";
       }else {
          $type2.="i";
          $suma_consulta2++;
          $set_consulta2=" WHERE Id_Inscripto=? AND Pago=? ";
       }


       if($criterio_2=="2"){
          $acreditado=-1;
       }

        if($criterio_2=="3"){
          $acreditado=-2;
       }

    }
    //-------------------------------------------------------------------------------
    //listado
    $default_response="Sin Resultados";

    include "conexion.php";
    
    $result = "SELECT * FROM Persona_Inscripta ".$set_consulta1."ORDER BY Nombres ASC";
  

    $stmt = $conn->prepare($result);

    if($stmt === false) {
      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
    }

    $criterio_final="%".$criterio_1."%";
 
    
      if($suma_consulta1>0){
          $params=array();
          //echo $type."<br>";
          $params[]=&$type;

          for($i=1;$i<=$suma_consulta1;$i++){
            $params[]=&${'set1_var'.$i};
          }
         
          call_user_func_array(array($stmt, 'bind_param'), $params);
      }


    
    $stmt->execute();
    $rs=$stmt->get_result();
    
    if($row=$rs->fetch_assoc()){

        $tmp2 = array();
        do {

        //***********************************************************************//

          $result2 = 'SELECT * FROM Pagos_Inscripciones' .$set_consulta2;       
          $stmt2 = $conn->prepare($result2);

          if($stmt2 === false) {
            trigger_error('Wrong SQL: ' . $result2 . ' Error: ' . $conn->error, E_USER_ERROR);
          }

          $id_persona=$row['Id_Persona'];
         

          //echo $type."<br>";
          if($suma_consulta2>0){
              $params2= array($type2,  $id_persona, $acreditado);
          } else {
              $params2= array($type2, $id_persona);
          }
        
          
          foreach($params2 as $key => $value) $tmp2[$key] = &$params2[$key];
          call_user_func_array(array($stmt2, 'bind_param'), $tmp2);


          $stmt2->execute();
          $rs2=$stmt2->get_result();

          if($row2=$rs2->fetch_assoc()){

              $dni=$row['DNI'];
              $email=$row['Email'];
              $id_inscripto=$row['Id_Persona'];
              $name_inscripto=$row['Nombres'].", ".$row['Apellidos'];
              
              $fecha_pago=$row2['Fecha_Pago'];
              $pago=$row2['Pago'];
              $detalle_pago=$row2['Detalle'];
              
              if($pago===-2){
                  $pago="No Acreditado";
                  $fecha_pago="-";
                }else{
                   $pago="Acreditado";
              }


              $id_operacion=$row2['Id'];       

        
              // we need to bring the name dicipline to complete the table
              //------------------------------------------------------------------------
              $result3 = 'SELECT * FROM Arancel WHERE Id_Arancel=?';

              $stmt3 = $conn->prepare($result3);

              if($stmt3 === false) {
              trigger_error('Wrong SQL: ' . $result3 . ' Error: ' . $conn->error, E_USER_ERROR);
              }

              $id_arancel=$row2['Id_Arancel'];

              $stmt3->bind_param('i', $id_arancel);

              $stmt3->execute();
              $rs3=$stmt3->get_result();

              if($row3=$rs3->fetch_assoc()){   
                $monto="$".$row3['Costo'].".00";
                $tipo_arancel=$row3['Tipo']; 
                if(strlen($tipo_arancel)>25){
                  $tipo_arancel="Estudiantes / Redesa";
                }

              }
              //------------------------------------------------------------------------
                   $item_rs=array(
                    'Id_Inscripto' => utf8_encode($id_inscripto), 
                    'Id_Operacion' => utf8_encode($id_operacion),
                    'Email' => utf8_encode($email),
                    'Name_Inscripto' => utf8_encode($name_inscripto), 
                    'Dni_Inscripto' => utf8_encode($dni), 
                    'Monto' => utf8_encode($monto),
                    'Pago_Realizado' => utf8_encode($pago),
                    'Fecha_Pago' => utf8_encode($fecha_pago),
                    'Tipo_Arancel' => utf8_encode($tipo_arancel),
                    'Detalle' => utf8_encode($detalle_pago)
                  );

                  $arr_pagos[]=$item_rs;
            //------------------------------------------------------------------------
            //-------------------------------------------------------------------------


          }
   
        } while ($row = $rs->fetch_assoc());  
    }
//***********************************************************************************************

    if(!isset($item_rs)){

               $item_rs=array(
                    'Id_Inscripto' => utf8_encode($default_response), 
                    'Id_Operacion' => utf8_encode($default_response),
                    'Name_Inscripto' => utf8_encode($default_response), 
                    'Dni_Inscripto' => utf8_encode($default_response), 
                    'Monto' => utf8_encode("-"),
                    'Pago_Realizado' => utf8_encode("-"),
                    'Fecha_Pago' => utf8_encode("-"),
                    'Tipo_Arancel' => utf8_encode("-"),
                    'Detalle' => utf8_encode("-")
                  
                  );
               $arr_pagos[]=$item_rs;     

    }


    $arr2=array();
    $arr2=array('Pagos_Inscriptos'=> $arr_pagos);

    $json = json_encode($arr2);
    echo $json;


} // $type_accion==="search_tn"

    } else {
  
  $set_messaje="sinlogueo.outx";
  $arr2=array('error_location'=>$set_messaje);

$json = json_encode($arr2);
echo $json;

}

?>      