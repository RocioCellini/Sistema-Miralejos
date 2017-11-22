<!DOCTYPE html>
<html>
<head>
	<title>Planilla</title>

	<!-- CSS -->
 	<link rel="stylesheet" href="../bootstrap-3.3.7/css/bootstrap.min.css">

<style>
table.table{
	margin: 16px;
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

h4{
	margin-left: 20px;
}
</style>

</head>

<body>

<?php
  include '../menu.html';
?>

<div class="row"><a href="nueva-fila.php"><h4>Nueva Fila</h4></a></div>

<div class="row">

	<table class="table">
		<tr>
			<th>Cliente</th>
			<th>GI</th>
			<th>Teléfono</th>
			<th>Ciudad</th>
			<th>Provincia</th>
			<th>Origen Dato</th>
			<th>Actividad</th>
			<th>Conoce</th>
			<th>Fecha origen dato</th>
			<th>Fecha ultimo contacto</th>
			<th>Nº Llamados</th>
			<th>Fecha cierre operación</th>
			<th>Edificio</th>
			<th>Depto Vendido</th>
			<th>Correo Electrónico</th>

		</tr>
		<tr>
			<td><input type="" name="" size="8"></td>
			<td><input type="" name="" size="3"></td>
			<td><input type="" name="" size="8"></td>
			<td><input type="" name="" size="8"></td>
			<td><input type="" name="" size="8"></td>
			<td><input type="" name="" size="8"></td>
			<td><input type="" name="" size="10"></td>
			<td><input type="" name="" size="3"></td>
			<td><input type="" name="" size="8"></td>
			<td><input type="" name="" size="8"></td>
			<td><input type="" name="" size="3"></td>
			<td><input type="" name="" size="8"></td>
			<td><input type="" name="" size="3"></td>
			<td><input type="" name="" size="3"></td>
			<td><input type="" name="" size="20"></td>
		</tr>
		<tr>
			<td>Chain Julio</td>
			<td>2</td>
			<td>351-6790054</td>
			<td>Córdoba</td>
			<td>Córdoba</td>
			<td>Letrero</td>
			<td>Py Construcción</td>
			<td>Si</td>
			<td>28/3/2016</td>
			<td>10/6/2016</td>
			<td>5</td>
			<td>4/4/2016</td>
			<td>M2</td>
			<td>3B</td>
			<td>anguinegra@hotmail.com</td>
		</tr>
		<tr>
			<td>Chain Julio</td>
			<td>2</td>
			<td>351-6790054</td>
			<td>Córdoba</td>
			<td>Córdoba</td>
			<td>Letrero</td>
			<td>Py Construcción</td>
			<td>Si</td>
			<td>28/3/2016</td>
			<td>10/6/2016</td>
			<td>5</td>
			<td>4/4/2016</td>
			<td>M2</td>
			<td>3B</td>
			<td>anguinegra@hotmail.com</td>
		</tr>
		<tr>
			<td>Chain Julio</td>
			<td>2</td>
			<td>351-6790054</td>
			<td>Córdoba</td>
			<td>Córdoba</td>
			<td>Letrero</td>
			<td>Py Construcción</td>
			<td>Si</td>
			<td>28/3/2016</td>
			<td>10/6/2016</td>
			<td>5</td>
			<td>4/4/2016</td>
			<td>M2</td>
			<td>3B</td>
			<td>anguinegra@hotmail.com</td>
		</tr>

		<tr>
			<td>Chain Julio</td>
			<td>2</td>
			<td>351-6790054</td>
			<td>Córdoba</td>
			<td>Córdoba</td>
			<td>Letrero</td>
			<td>Py Construcción</td>
			<td>Si</td>
			<td>28/3/2016</td>
			<td>10/6/2016</td>
			<td>5</td>
			<td>4/4/2016</td>
			<td>M2</td>
			<td>3B</td>
			<td>anguinegra@hotmail.com</td>
		</tr>
		
	</table>

</div>

<?php
  include '../pie.html';
?>
</body>
</html>