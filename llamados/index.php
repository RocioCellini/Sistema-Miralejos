<!DOCTYPE html>
<html>
<head>
	<title>Localidades</title>

	<!-- CSS -->
 	<link rel="stylesheet" href="../bootstrap-3.3.7/css/bootstrap.min.css">
</head>
<body>
	<?php
	  include '../menu.html';
	?>
	<br><br>
	<div class="row">
		<div class="col-md-2"></div>
	    <div class="col-md-4 well">
			<form method="post" action=""> 
				<legend>Buscar</legend>
				<fieldset>
				<input type="text" class="form-control" name="buscar">
				<p>* ingrese el correo electrónico de la persona</p><br>
				<button type="submit" class="btn btn-default">Buscar</button>
				</fieldset>
			</form> <br><br>

			<p>Al realizar la búsqueda: si la persona existe, en la tabla elegir la opción <a href="nuevo-llamado.php">Nuevo llamado</a> para allí ingresar los datos del nuevo llamado. Si la persona no existe, poner un mensaje explicando que debe ir a la opción "Contacto" del menú para ingresar los datos (En la tabla se muestran todos los datos del cliente, como ciudad, provincia, etc)</p>
		</div>
		<div class="col-md-8"></div>
	</div>

	


</body>
</html>