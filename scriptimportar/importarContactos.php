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
	
  	


  	$idfirst=NULL;


	if($dni==""){
		$dni=0;
	}

	if($id_tipo_cliente==""){
		$id_tipo_cliente=3;
	}

	if($telefono1==""){
		$telefono1=0;
	}


	if($telefono2==""){
		$telefono2=0;
	}


	$email = trim(preg_replace('/\s\s+/', ' ', $email));

	if($email==""){
		echo "Email sin Datos"."<br>";
		$email="Sin Datos";
	}


	if($conoce=="SI"){
		$conoce=1;
	} elseif ($conoce=="NO") {
		$conoce=0;
	}else{
		$conoce=-1;
	}


	//$nombre="f";
	//$apellido="f";
	//$dni="261341614"; 
	//$telefono1="12345678910112";
	//$telefono2="12345678910112"; 
	//$email="fede@erwer.er"; 
	$id_provincia="0"; 
	$id_localidad="0"; 
	$id_actividad="0"; 
	$id_vendedor="0"; 
	$id_inmobiliaria="0"; 
	//$conoce="0";



   $sql_insertpersona='INSERT INTO cliente (id_cliente, nombre, apellido, id_tipo_cliente, dni, telefono1, telefono2,
   email, id_provincia, id_localidad, id_actividad, conoce) VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,? ,? )';


	$stmt_insert = $conn->prepare($sql_insertpersona);
	if($stmt_insert === false) {
		trigger_error('Wrong SQL: ' . $sql_insertpersona . ' Error: ' . $conn->error, E_USER_ERROR);
	}



	$stmt_insert->bind_param('issiiiisiiii', $idfirst, $nombre, $apellido, $id_tipo_cliente, 
		$dni, $telefono1, $telefono2, $email, $id_provincia, $id_localidad, $id_actividad, $conoce);
	

	/* Execute statement */
    $stmt_insert->execute();

    $last_id=mysqli_insert_id($conn);
    $stmt_insert->close();
	 

	echo "ULTIMO ID:".$last_id."<br>";	


	//UPDATE PROVINCIA
	/**********************************************************************************************************/
	

	$sql_provincia='SELECT * FROM provincia WHERE nombre=?';

	$stmt_provincia = $conn->prepare($sql_provincia);
	

	if($stmt_provincia === false) {
		trigger_error('Wrong SQL: ' . $sql_provincia . ' Error: ' . $conn->error, E_USER_ERROR);
	}

	$stmt_provincia->bind_param('s', $provincia);
	
	/* Execute statement */
    $stmt_provincia->execute();

    $rs_provincia=$stmt_provincia->get_result(); 

   if($row_provincia=$rs_provincia->fetch_assoc()) {

   		echo "ENCONTRO A PROVINCIA"."<br>"; 

	    $sql_updatepersona='UPDATE cliente SET id_provincia=? WHERE id_cliente=?';


		$stmt_update = $conn->prepare($sql_updatepersona);
		
		if($stmt_update === false) {
			trigger_error('Wrong SQL: ' . $sql_updatepersona . ' Error: ' . $conn->error, E_USER_ERROR);
		}


		$stmt_update->bind_param('ii', $row_provincia['id_provincia'], $last_id);
		

		/* Execute statement */
	    $stmt_update->execute();
	    $stmt_update->close();
	 

    } // ROW PROVINCIA


    //UPDATE LOCALIDAD
	/**********************************************************************************************************/
	

	$sql_localidad='SELECT * FROM localidad WHERE nombre=?';

	$stmt_localidad = $conn->prepare($sql_localidad);
	

	if($stmt_localidad === false) {
		trigger_error('Wrong SQL: ' . $sql_localidad . ' Error: ' . $conn->error, E_USER_ERROR);
	}

	$stmt_localidad->bind_param('s', $ciudad);
	
	/* Execute statement */
    $stmt_localidad->execute();

    $rs_localidad=$stmt_localidad->get_result(); 

   if($row_localidad=$rs_localidad->fetch_assoc()) {

   		echo "ENCONTRO A LOCALIDAD"."<br>"; 

	    $sql_updatepersona='UPDATE cliente SET id_localidad=? WHERE id_cliente=?';


		$stmt_update = $conn->prepare($sql_updatepersona);
		
		if($stmt_update === false) {
			trigger_error('Wrong SQL: ' . $sql_updatepersona . ' Error: ' . $conn->error, E_USER_ERROR);
		}


		$stmt_update->bind_param('ii', $row_localidad['id_localidad'], $last_id);
		

		/* Execute statement */
	    $stmt_update->execute();
	    $stmt_update->close();
	 

    }  // ROW LOCALIDAD



    //Actividad
    /*******************************************************************************************************/

    $sql_actividad='SELECT * FROM actividad WHERE nombre=?';

	$stmt_actividad = $conn->prepare($sql_actividad);
	

	if($stmt_actividad === false) {
		trigger_error('Wrong SQL: ' . $sql_actividad . ' Error: ' . $conn->error, E_USER_ERROR);
	}

	$stmt_actividad->bind_param('s', $actividad);
	
	/* Execute statement */
    $stmt_actividad->execute();

    $rs_actividad=$stmt_actividad->get_result(); 

   if($row_actividad=$rs_actividad->fetch_assoc()) {

   		echo "ENCONTRO ACTIVIDAD"."<br>"; 

	    $sql_updatepersona='UPDATE cliente SET id_actividad=? WHERE id_cliente=?';


		$stmt_update = $conn->prepare($sql_updatepersona);
		
		if($stmt_update === false) {
			trigger_error('Wrong SQL: ' . $sql_updatepersona . ' Error: ' . $conn->error, E_USER_ERROR);
		}


		$stmt_update->bind_param('ii', $row_actividad['id_actividad'], $last_id);
		

		/* Execute statement */
	    $stmt_update->execute();
	    $stmt_update->close();
	 

    }  // ROW ACTIVIDAD





    $sql_llamado = 'INSERT INTO llamado  (id_llamado, id_cliente, fecha_llamado, grado_interes, 
     fecha_origen_dato, anotaciones) VALUES (?, ?, ?, ?, ?, ?)';

	$stmt_llamado = $conn->prepare($sql_llamado);
	
	if($stmt_llamado === false) {
		trigger_error('Wrong SQL: ' . $sql_llamado . ' Error: ' . $conn->error, E_USER_ERROR);
	}

	$fecha_ultimo_llamado = trim(preg_replace('/\s\s+/', ' ', $fecha_ultimo_llamado));
	
	if($fecha_ultimo_llamado!=""){
		echo "ARRAY FECHA 1"."<br>";
		$fecha_ultimo_llamado = explode("/", $fecha_ultimo_llamado);
		$set_fecha_ultimo_llamado = $fecha_ultimo_llamado[2].'-'.$fecha_ultimo_llamado[1].'-'.$fecha_ultimo_llamado[0];
		echo $set_fecha_ultimo_llamado."<br>";
	}else {
		echo "ELSE ARRAY 1"."<br>";
		$set_fecha_ultimo_llamado = '1900-01-01';
		echo $set_fecha_ultimo_llamado."<br>";
	}


	$fecha_origen_dato = trim(preg_replace('/\s\s+/', ' ', $fecha_origen_dato));

	if($fecha_origen_dato!=""){
		echo "ARRAY FECHA 2"."<br>";
		$fecha_origen_dato = explode("/", $fecha_origen_dato);
		$set_fecha_origen_dato = $fecha_origen_dato[2].'-'.$fecha_origen_dato[1].'-'.$fecha_origen_dato[0];
		echo $set_fecha_origen_dato."<br>";
	} else {
		echo "ELSE ARRAY 2"."<br>";
		$set_fecha_origen_dato = '1900-01-01';
		echo $set_fecha_origen_dato."<br>";
	}
	
	


	//$id_llamado=null;
	//$last_id=3;
	//$set_fecha_ultimo_llamado='2017-08-08';
	//$gradointeres=4;
	//$set_fecha_origen_dato='2017-08-08';
	$anotaciones="-";

	$stmt_llamado->bind_param('iisiss', $id_llamado, $last_id, 
		$set_fecha_ultimo_llamado, $gradointeres, $set_fecha_origen_dato, $anotaciones);
	

    $stmt_llamado->execute();

    $stmt_llamado->close();




     // LLAMADO origenDato
    /*******************************************************************************************************/
    
    $sql_origendato='SELECT * FROM origen_dato WHERE origen_dato=?';

	$stmt_origendato = $conn->prepare($sql_origendato);
	

	if($stmt_origendato === false) {
		trigger_error('Wrong SQL: ' . $sql_origendato . ' Error: ' . $conn->error, E_USER_ERROR);
	}

	$stmt_origendato->bind_param('s', $origenDato);
	

    $stmt_origendato->execute();

    $rs_origendato=$stmt_origendato->get_result(); 

   if($row_origendato=$rs_origendato->fetch_assoc()) {

   		echo "ENCONTRO ORIGEN DATO"."<br>"; 

	    $sql_updatepersona='UPDATE llamado SET id_origen_dato=? WHERE id_cliente=?';


		$stmt_update = $conn->prepare($sql_updatepersona);
		
		if($stmt_update === false) {
			trigger_error('Wrong SQL: ' . $sql_updatepersona . ' Error: ' . $conn->error, E_USER_ERROR);
		}


		$stmt_update->bind_param('ii', $row_origendato['id_origen_dato'], $last_id);
				
	    $stmt_update->execute();
	    $stmt_update->close();
	 

    }  // ROW ACTIVIDAD



    //PLANILLA
    //*****************************************************************************************

    $sql_insert_planilla='INSERT INTO planilla_de_venta (id_planilla, id_cliente, id_vendedor, id_inmobiliaria) VALUES (?, ?, ?, ?)';


	$stmt_insert_planilla = $conn->prepare($sql_insert_planilla);
	if($stmt_insert_planilla === false) {
		trigger_error('Wrong SQL: ' . $sql_insert_planilla . ' Error: ' . $conn->error, E_USER_ERROR);
	}

	$stmt_insert_planilla->bind_param('iiii', $idfirst, $last_id, $id_vendedor, $id_inmobiliaria);
	
    $stmt_insert_planilla->execute();

    $stmt_insert_planilla->close();


    //Vendedor
    //******************************************************************************************

    $sql_vendedor='SELECT * FROM vendedor WHERE nombre=?';

	$stmt_vendedor = $conn->prepare($sql_vendedor);
	

	if($stmt_vendedor === false) {
		trigger_error('Wrong SQL: ' . $sql_vendedor . ' Error: ' . $conn->error, E_USER_ERROR);
	}

	$stmt_vendedor->bind_param('s', $vendedor);


	/* Execute statement */
    $stmt_vendedor->execute();

    $rs_vendedor=$stmt_vendedor->get_result(); 

   if($row_vendedor=$rs_vendedor->fetch_assoc()) {

   		echo "ENCONTRO EL VENDEDOR"."<br>"; 

	    $sql_update_vendedor='UPDATE planilla_de_venta SET id_vendedor=? WHERE id_planilla=?';


		$stmt_update = $conn->prepare($sql_update_vendedor);
		
		if($stmt_update === false) {
			trigger_error('Wrong SQL: ' . $sql_update_vendedor . ' Error: ' . $conn->error, E_USER_ERROR);
		}


		$stmt_update->bind_param('ii', $row_vendedor['id_vendedor'], $last_id);
		

		/* Execute statement */
	    $stmt_update->execute();

	    $stmt_update->close();
	 

    }// ROW VENDEDOR


    //Inmobiliaria
    //******************************************************************************************

    $sql_inmobiliaria='SELECT * FROM inmobiliaria WHERE nombre=?';

	$stmt_inmobiliaria = $conn->prepare($sql_inmobiliaria);
	

	if($stmt_inmobiliaria === false) {
		trigger_error('Wrong SQL: ' . $sql_inmobiliaria . ' Error: ' . $conn->error, E_USER_ERROR);
	}

	$stmt_inmobiliaria->bind_param('s', $inmobiliaria);
	
	/* Execute statement */
    $stmt_inmobiliaria->execute();

    $rs_inmobiliaria=$stmt_inmobiliaria->get_result(); 

   if($row_inmobiliaria=$rs_inmobiliaria->fetch_assoc()) {

   		echo "ENCONTRO INMOBILIARIA"."<br>"; 

	    $sql_update_inmobiliaria='UPDATE planilla_de_venta SET id_inmobiliaria=? WHERE id_planilla=?';


		$stmt_update = $conn->prepare($sql_update_inmobiliaria);
		
		if($stmt_update === false) {
			trigger_error('Wrong SQL: ' . $sql_update_inmobiliaria . ' Error: ' . $conn->error, E_USER_ERROR);
		}


		$stmt_update->bind_param('ii', $row_inmobiliaria['id_inmobiliaria'], $last_id);
		

		/* Execute statement */
	    $stmt_update->execute();
	    $stmt_update->close();
	 

    } // ROW INMOBILIARIA


   //***************************************************************************************///
	$contador=$contador+1;
	echo $contador."<br>";

	
	echo"---------------------------------------<br>";

}
fclose($file);
?>