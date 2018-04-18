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

//$type_accion="log_in";

if($type_accion==="log_in"){

	include "conexion.php";	
	
	$user = $data->{'user'};
	$password =$data->{'password'};

	$item="";
	$message="Datos Incorrectos";

	$result="SELECT * FROM administracion WHERE user=?";
	
	$stmt = $conn->prepare($result);

	if($stmt === false) {
		trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
	}

	$stmt->bind_param('s',$user);
	$stmt->execute();
	$rs=$stmt->get_result();

	if($row = $rs->fetch_assoc()){		

		if(password_verify($password, $row["password"])) {
			$_SESSION['Usuario']=$row['user'];

			if($row['id_admin']==1){
				$obj_edit=true;
			}else {
				$obj_edit=false;
			}

			$stmt->close();
			$rs->free();			
		
			$url="GestionVentas.estadisticas";
			$item=array('setUrl' => utf8_encode($url));
			$json = json_encode($item);
			echo $json; 
			
		}else{

			$item=array('Message' => utf8_encode($message));
		    $json = json_encode($item);
			echo $json; 
		}//password

	}else{
			$item=array('Message' => utf8_encode($message));
		    $json = json_encode($item);
			echo $json;
	}// User
}

if($type_accion==="checkSession") {

	if(!isset($_SESSION['Usuario'])) {
	
		$url="GestionVentas.index";
		$item=array('setUrl' => utf8_encode($url));
		$json = json_encode($item);
		echo $json; 

	}
}


if($type_accion==="logout") {

	unset($_SESSION['Usuario']);
	
	$url="GestionVentas.index";
	$item=array('setUrl' => utf8_encode($url));
	$json = json_encode($item);
	echo $json; 

	session_destroy();

}

?>      