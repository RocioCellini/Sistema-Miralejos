<?php
$file = fopen("origen_dato.txt", "r") or exit("Unable to open file!");
//Output a line of the file until the end is reached
//include "../conexion.php";
$contador=0;


while(!feof($file)) {
	
	$personaTxt= fgets($file);
	
	$largototal=strlen($personaTxt);
	
	
	$posicion=strpos($personaTxt,";");
		
	//echo $personaTxt."<br>";

	$datos=substr($personaTxt, 0, $posicion);
	echo "Origen Datos: ".$datos."<br>";
	
	

	if($datos!=""){

		include "../php/conexion.php";	

	 $sql_insert='INSERT INTO origen_dato (id_origen_dato, origen_dato) VALUES
	  (?,?)';

	  $stmt_insert = $conn->prepare($sql_insert);
	  if($stmt_insert === false) {
	  trigger_error('Wrong SQL: ' . $sql_insert . ' Error: ' . $conn->error, E_USER_ERROR);
	  }

	  $idfirst=NULL; 


	  $stmt_insert->bind_param('is',$idfirst, $datos);

	  $stmt_insert->execute();

	}





	/*
	$next_prov=substr($next_prov, $posicion+1, $largototal);
  	$actividad=substr($next_prov, 0, $largototal);
  	echo "actividad: ".$actividad."<br>";
    */


  	// PARA INSETAR VALORES EN LA TABLA CLIENTE
  	// $nomre, $apellido, $telefono1, $telefono2, $provincia ,$ciudad ,$email
  	// $actividad  y $conoce 

  	// hay que hacer subconsultas para ciudad y pronvincia, actividad y conoce.

	
	//$apellido=str_replace( "'" , "`" , $apellido);
	//$nombre=str_replace( "'" , "`" , $nombre);
	
  	/*
   $sql_insertpersona='INSERT INTO Personas (Id, Dni, Apellido, Nombre, Mesa) 
		VALUES (?, ?, ?, ?, ?)';


	$stmt_insert = $conn->prepare($sql_insertpersona);
	if($stmt_insert === false) {
		trigger_error('Wrong SQL: ' . $sql_insertpersona . ' Error: ' . $conn->error, E_USER_ERROR);
	}

	$idfirst=NULL;


	$stmt_insert->bind_param('issss', $idfirst, $dni, $apellido,$nombre, $mesa);
	*/

	/* Execute statement */
	//$stmt_insert->execute();





	


   //***************************************************************************************///
	$contador=$contador+1;
	echo $contador."<br>";

	
	echo"---------------------------------------<br>";

}
fclose($file);
?>