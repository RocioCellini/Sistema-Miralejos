<!DOCTYPE html>
<html>
<head>
	<title>Vendedores</title>

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
				</form> 
			</div>
			<div class="col-md-8"></div>
		</div>
		<br><br>
		<div class="row">
		<div class="col-md-2"></div>
	    <div class="col-md-4 well">
			<form method="post" action="">
				<legend>Nuevo Vendedor</legend>
				<fieldset>
				  <div class="form-group">
				    <label>Nombre</label>
				    <input type="text" class="form-control" name="localidad">
				  </div>
				  <div class="form-group">
				    <label>Correo Electrónico</label>
				    <input type="text" class="form-control" name="provincia">
				  </div>
				 
				  <button type="submit" class="btn btn-default">Guardar</button>
				</fieldset>
			</form>
		</div>
		<div class="col-md-8"></div>
	</div>

	<?php
	  include '../pie.html';
	?>
</body>
</html>