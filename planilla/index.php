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

<div class="row"><a href="nueva-fila.php"><h4>Agregar Datos</h4></a></div>


<div class="row">

	<table class="table">
		<tr>
			<th>Cliente</th>
			<th>Tipo de Cliente</th>
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
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td><input type="" name="" size="8"></td>
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
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td>Chain Julio</td>
			<td>Comprador</td>
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
			<td align="center" class="tablalistado_td"><font size="-1"><a href="../sections/edit_edificio.php?id='.$row["id_edificio"].'"><img src="../imagenes/edit.png" border="0" title="Modificar"/></a></font></td>
			<td align="center" class="tablalistado_td"><font size="-1"><a href="../sections/eliminar_edificio.php?id='.$row["id_edificio"].'&accion=Eliminar" onClick="javascript:return confirm(\'¿Desea eliminar el edificio seleccionado?.\')">
         	<img src="../imagenes/delete.png" border="0" title="Eliminar"/></a></font></td>
		</tr>
		<tr>
			<td>Cornelli Ada</td>
			<td>Comprador</td>
			<td>2</td>
			<td>03576-15-523090</td>
			<td>Córdoba</td>
			<td>Córdoba</td>
			<td>Oficina</td>
			<td>Prof Arq</td>
			<td>Si</td>
			<td>7/9/20163/8/2016</td>
			<td>12/6/2016</td>
			<td>5</td>
			<td></td>
			<td>M3</td>
			<td>3B</td>
			<td>georginabertone@hotmail.com</td>
			<td align="center" class="tablalistado_td"><font size="-1"><a href="../sections/edit_edificio.php?id='.$row["id_edificio"].'"><img src="../imagenes/edit.png" border="0" title="Modificar"/></a></font></td>
			<td align="center" class="tablalistado_td"><font size="-1"><a href="../sections/eliminar_edificio.php?id='.$row["id_edificio"].'&accion=Eliminar" onClick="javascript:return confirm(\'¿Desea eliminar el edificio seleccionado?.\')">
         	<img src="../imagenes/delete.png" border="0" title="Eliminar"/></a></font></td>
		</tr>
		<tr>
			<td>Bobbio, Raúl</td>
			<td>Propietario</td>
			<td>2</td>
			<td>3576-493158/412392</td>
			<td>El Tío</td>
			<td>Córdoba</td>
			<td>Cesión</td>
			<td>Py Construcción</td>
			<td>Si</td>
			<td>28/3/2016</td>
			<td>10/6/2016</td>
			<td>5</td>
			<td>4/4/2016</td>
			<td>M2</td>
			<td>3B</td>
			<td>fsfarmacia@hotmail.com</td>
			<td align="center" class="tablalistado_td"><font size="-1"><a href="../sections/edit_edificio.php?id='.$row["id_edificio"].'"><img src="../imagenes/edit.png" border="0" title="Modificar"/></a></font></td>
			<td align="center" class="tablalistado_td"><font size="-1"><a href="../sections/eliminar_edificio.php?id='.$row["id_edificio"].'&accion=Eliminar" onClick="javascript:return confirm(\'¿Desea eliminar el edificio seleccionado?.\')">
         	<img src="../imagenes/delete.png" border="0" title="Eliminar"/></a></font></td>
		</tr>

		<tr>
			<td>Pesco, Gabriel y José</td>
			<td>Propietario</td>
			<td>2</td>
			<td>358-5629374</td>
			<td>General Cabrera</td>
			<td>Córdoba</td>
			<td>w p.p</td>
			<td>Com Acopio Cereal</td>
			<td>Si</td>
			<td>28/9/2016</td>
			<td>5/10/2016</td>
			<td>5</td>
			<td>4/4/2016</td>
			<td>M2</td>
			<td>3B</td>
			<td>gmacagno@cotagro.com.ar</td>
			<td align="center" class="tablalistado_td"><font size="-1"><a href="../sections/edit_edificio.php?id='.$row["id_edificio"].'"><img src="../imagenes/edit.png" border="0" title="Modificar"/></a></font></td>
			<td align="center" class="tablalistado_td"><font size="-1"><a href="../sections/eliminar_edificio.php?id='.$row["id_edificio"].'&accion=Eliminar" onClick="javascript:return confirm(\'¿Desea eliminar el edificio seleccionado?.\')">
         	<img src="../imagenes/delete.png" border="0" title="Eliminar"/></a></font></td>
		</tr>
		<tr>
			<td>Panero, Rodolfo</td>
			<td>Comprador</td>
			<td></td>
			<td>3533-435505</td>
			<td>El Arañado</td>
			<td>Córdoba</td>
			<td>Eliseo</td>
			<td>Pr Agr</td>
			<td>Si</td>
			<td></td>
			<td></td>
			<td></td>
			<td>nov-13</td>
			<td>M7</td>
			<td></td>
			<td></td>
			<td align="center" class="tablalistado_td"><font size="-1"><a href="../sections/edit_edificio.php?id='.$row["id_edificio"].'"><img src="../imagenes/edit.png" border="0" title="Modificar"/></a></font></td>
			<td align="center" class="tablalistado_td"><font size="-1"><a href="../sections/eliminar_edificio.php?id='.$row["id_edificio"].'&accion=Eliminar" onClick="javascript:return confirm(\'¿Desea eliminar el edificio seleccionado?.\')">
         	<img src="../imagenes/delete.png" border="0" title="Eliminar"/></a></font></td>
		</tr>
		
	</table>

</div>

<?php
  include '../pie.html';
?>
</body>
</html>