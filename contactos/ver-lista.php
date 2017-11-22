<!DOCTYPE html>
<html>
<head>
	<title>Contactos</title>

	<!-- CSS -->
 	<link rel="stylesheet" href="../bootstrap-3.3.7/css/bootstrap.min.css">

<style>
table.table{	
	text-align: center;
}
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}

</style>
</head>

<body>

<?php
  include '../menu.html';
?>
<br><br>
<div class="row">
	<div class="col-md-2"></div>
    <div class="col-md-8">
	<table class="table">
		<tr>
			<th>Cliente</th>			
			<th>Teléfono</th>
			<th>Ciudad</th>
			<th>Provincia</th>			
			<th>Actividad</th>			
			<th>Correo Electrónico</th>
		</tr>
		<tr>
			<td>Chain Julio</td>
			<td>351-6790054</td>
			<td>Córdoba</td>
			<td>Córdoba</td>
			<td>Py Construcción</td>
			<td>anguinegra@hotmail.com</td>
		</tr>
		<tr>
			<td>Cornelli Ada</td>
			<td>351-6790054</td>
			<td>Córdoba</td>
			<td>Córdoba</td>
			<td>Com Bijou</td>			
			<td>anguinegra@hotmail.com</td>
		</tr>
		<tr>
			<td>Pistola Graciela</td>
			<td>351-6164239</td>
			<td>Córdoba</td>
			<td>Córdoba</td>			
			<td>Prof Medico</td>
			<td>matiasjprado@hotmail.com</td>
		</tr>
		
	</table>
	</div>
	<div class="col-md-2"></div>
</div>

<?php
  include '../pie.html';
?>
</body>
</html>