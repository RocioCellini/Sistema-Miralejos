<?php
$file = fopen("final.txt", "r") or exit("Unable to open file!");
//Output a line of the file until the end is reached
include "conexion.php";
$contador=0;

$dni="";
$id_tipo_cliente="";

while(!feof($file)) {
	
	$personaTxt= fgets($file);
	
	$largototal=strlen($personaTxt);
	
	
	$posicion=strpos($personaTxt,";");
		
	//echo $personaTxt."<br>";

	$apellido=substr($personaTxt, 0, $posicion);
	echo "Apellido: ".$apellido."<br>";
	
	$next_prov=substr($personaTxt, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$nombre=substr($next_prov, 0, $posicion);
	echo "Nombre: ".$nombre."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$tipo_cliente=substr($next_prov, 0, $posicion);
	echo "Tipo Cliente: ".$tipo_cliente."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$telefono1=substr($next_prov, 0, $posicion);
	echo "Telefono 1: ".$telefono1."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$telefono2=substr($next_prov, 0, $posicion);
	echo "Telefono 2: ".$telefono2."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$provincia=substr($next_prov, 0, $posicion);
	echo "Provincia: ".$provincia."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$ciudad=substr($next_prov, 0, $posicion);
	echo "Ciudad: ".$ciudad."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$actividad=substr($next_prov, 0, $posicion);
	echo "Actividad: ".$actividad."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$conoce=substr($next_prov, 0, $posicion);
	echo "Conoce: ".$conoce."<br>";


	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$origenDato=substr($next_prov, 0, $posicion);
	echo "Origen Dato: ".$origenDato."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$fecha_origen_dato=substr($next_prov, 0, $posicion);
	echo "Fecha Origen Dato: ".$fecha_origen_dato."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$fecha_ultimo_llamado=substr($next_prov, 0, $posicion);
	echo "Fecha Ultimo Llamado: ".$fecha_ultimo_llamado."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$gradointeres=substr($next_prov, 0, $posicion);
	echo "Grado de Interes: ".$gradointeres."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$nllamados=substr($next_prov, 0, $posicion);
	echo "Numero de Llamados: ".$nllamados."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$vendedor=substr($next_prov, 0, $posicion);
	echo "Vendedor: ".$vendedor."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$inmobiliaria=substr($next_prov, 0, $posicion);
	echo "Inmobiliaria: ".$inmobiliaria."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$fecha_cierre_operacion=substr($next_prov, 0, $posicion);
	echo "Fecha Cierre de Operacion: ".$fecha_cierre_operacion."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$edificio=substr($next_prov, 0, $posicion);
	echo "Edificio: ".$edificio."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$planta=substr($next_prov, 0, $posicion);
	echo "Planta: ".$planta."<br>";

	$next_prov=substr($next_prov, $posicion+1, $largototal);
	$posicion=strpos($next_prov,";");
	$dptovendido=substr($next_prov, 0, $posicion);
	echo "Departamento: ".$dptovendido."<br>";
	
	$next_prov=substr($next_prov, $posicion+1, $largototal);
  	$email=substr($next_prov, 0, $largototal);
  	echo "Email: ".$email."<br>";
    


  	// PARA INSETAR VALORES EN LA TABLA CLIENTE
  	// $nomre, $apellido, $telefono1, $telefono2, $provincia ,$ciudad ,$email
  	// $actividad  y $conoce 

  	// hay que hacer subconsultas para ciudad y pronvincia, actividad y conoce.

	
	//$apellido=str_replace( "'" , "`" , $apellido);
	//$nombre=str_replace( "'" , "`" , $nombre);
	
  	




	$id_localidad="2"; 
	$id_actividad="3"; 






	$sql_provincia='SELECT * FROM provincia WHERE nombre=?';

	$stmt_provincia = $conn->prepare($sql_provincia);
	

	if($stmt_provincia === false) {
		trigger_error('Wrong SQL: ' . $sql_provincia . ' Error: ' . $conn->error, E_USER_ERROR);
	}

	$stmt_provincia->bind_param('s', $provincia);
	
	/* Execute statement */
    $stmt_provincia->execute();

   if($row_provincia=$rs->fetch_assoc()) {

	    $sql_updatepersona='UPDATE cliente SET id_provincia=? WHERE id_cliente=?';


		$stmt_update = $conn->prepare($sql_updatepersona);
		
		if($stmt_update === false) {
			trigger_error('Wrong SQL: ' . $sql_updatepersona . ' Error: ' . $conn->error, E_USER_ERROR);
		}


		$stmt_update->bind_param('i', $row_provincia['id_provincia']);
		

		/* Execute statement */
	    $stmt_update->execute();
	    $stmt_update->close();
	 

    } // ROW PROVINCIA


   //***************************************************************************************///
	$contador=$contador+1;
	echo $contador."<br>";

	
	echo"---------------------------------------<br>";

}
fclose($file);
?>