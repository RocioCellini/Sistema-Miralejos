<!DOCTYPE html>
<html>
<head>
	<title>Historial</title>

	<!-- CSS -->
 	<link rel="stylesheet" type="text/css" href="../bootstrap-3.3.7/css/bootstrap.min.css">
 	<link rel="stylesheet" type="text/css" href="../css/estilos.css">

</head>
<body>

	<?php
	  include '../menu.html';
	?>
	<br>

	<div class="row">
		<div class="col-md-2"></div>
	    <div class="col-md-8">	
	    	<h3>Historial</h3>	
	    	<br>
			    <strong>Nombre del Contacto</strong> lo trae de la tabla anterior<br><br>
			  
			    <strong>Origen del dato </strong> lo trae de la BD<br><br>
			 
			    <strong>Fecha origen de dato:</strong> lo trae de la BD<br><br>	   
			 
			    <strong>Fecha de último llamado: </strong> trae la fecha del último llamado<br><br>  
			 
			    <strong>Cantidad de llamadas:</strong> lo trae de la BD<br><br>			   
			
			    <strong>Operación:</strong> muestra cerrada o abierta, y si está cerrada muestra la fecha de cierre, el dni del contacto y las observaciones de la operación<br><br>
			  
			  <br><br>

			  <table class="table">
			  	<tr class="primer-fila">
			  		<th rowspan="2">Vendedor(nombre)</th>
			  		<th rowspan="2">Fecha del llamado</th>
			  		<th rowspan="2">Hora del llamado</th>	
			  		<th colspan="3">Consulta</th>
			  		<th rowspan="2">Anotaciones</th>				  					  		
			  	</tr>
			  	<tr>					  		
			  		<th>Dpto</th>
			  		<th>Planta</th>
			  		<th>Edificio</th>
			  	</tr>
			  	<tr>
			  		<td>Pablo</td>
			  		<td>12/12/17</td>
			  		<td>10:30</td>
			  		<td>A</td>
			  		<td>2</td>
			  		<td>M9</td>
			  		<td>anotaciones</td>
			  	</tr>
			  	<tr>
			  		<td>Flor</td>
			  		<td>12/12/17</td>
			  		<td>10:30</td>
			  		<td>B</td>
			  		<td>2</td>
			  		<td>M9</td>
			  		<td>anotaciones</td>
			  	</tr>
			  	<tr>
			  		<td>Pablo</td>
			  		<td>12/12/17</td>
			  		<td>10:30</td>
			  		<td>B</td>
			  		<td>2</td>
			  		<td>M9</td>
			  		<td>anotaciones</td>
			  	</tr>
			  </table>
		</div>
		<div class="col-md-2"></div>
	</div>

</body>
</html>