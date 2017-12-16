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


if($type_accion==="modify_pago"){

//************************************************************************************************//	
	include "conexion.php";	
	/*
	$operationid =$data->{'Id_Operacion'};
	$idinscripto =$data->{'Id_Inscripto'};
	$status_pago =$data->{'Pago'};
  $detalle =$data->{'Detalle'};
	*/

  $item="";
       
            $pago_negativo=-2;
            $result_pay = "SELECT * FROM Pagos_Inscripciones WHERE Id=? AND Id_Inscripto=?";
            $stmt_pay = $conn->prepare($result_pay);

            if($stmt_pay===false) {
            	trigger_error('Wrong SQL: ' . $result_dni . ' Error: ' . $conn->error, E_USER_ERROR);
            }

        
            /* Bind parameters. TYpes: s = string, i = integer, d = double,  b = blob      */
            $stmt_pay->bind_param('ii',$operationid, $idinscripto);

            $stmt_pay->execute();
            $rs_pay=$stmt_pay->get_result();

            if($row_pay= $rs_pay->fetch_assoc()){
              $fecha_pago=date("Y-m-d");

              $sql = 'UPDATE Pagos_Inscripciones SET Pago=?, Fecha_Pago=?, Detalle=?  WHERE Id=?';            
              $stmt = $conn->prepare($sql);

              if($stmt === false) {
              trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
              }
       
              /* Bind parameters. TYpes: s = string, i = integer, d = double,  b = blob      */
              $stmt->bind_param('issi',$status_pago, $fecha_pago, $detalle, $operationid); 
              $stmt->execute();

              //***************************************************************************************///
				$message="Los El Pago Fue Actualizado";
				$item=array('Message' => utf8_encode($message));
				$json = json_encode($item);
				echo $json;
            } else {
            	$message="Los El Pago No Fue Actualizado";
            	$item=array('Message' => utf8_encode($message));
				$json = json_encode($item);
				echo $json;

            }
   } //if($type_accion==="modify_pago"){
           
            



?>      