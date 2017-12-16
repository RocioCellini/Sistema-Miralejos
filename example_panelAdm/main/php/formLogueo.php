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


if($type_accion==="log_in"){

//************************************************************************************************//	
	include "conexion.php";	
	
	$usuario = $data->{'user'};
	$password =$data->{'password'};
	$item="";
	$message="Datos Incorrectos";


	$result="SELECT * FROM Administracion WHERE Usuario=?";
	
	$stmt = $conn->prepare($result);

	if($stmt === false) {
		trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
	}

		/* Bind parameters. TYpes: s = string, i = integer, d = double,  b = blob */
	$stmt->bind_param('s',$usuario);
	$stmt->execute();
	$rs=$stmt->get_result();

	if($row = $rs->fetch_assoc()){
		//echo $row["Password"]."<br>";
		//echo $row["Usuario"]."<br>";
		if(password_verify($password, $row["Password"])) {
			$_SESSION['Usuario']=$row['Usuario'];

			if($row['Id']==1){
				$obj_edit=true;
			}else {
				$obj_edit=false;
			}


			$stmt->close();
			$rs->free();
		
			$url="myAppPanel.main";
			$item=array('setUrl' => utf8_encode($url), 'obj_edit' => $obj_edit);
			$json = json_encode($item);
			echo $json; 
		}else{

			$item=array('Message' => utf8_encode($message));
		    $json = json_encode($item);
			echo $json; 
		}//passowrd

	}else{
			$item=array('Message' => utf8_encode($message));
		    $json = json_encode($item);
			echo $json;
	}// User
}

?>      