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
	<p>Para que pueda editar una localidad ingresada, se coloca el buscar</p>
	<div class="row">
		<div class="col-md-2"></div>
	    <div class="col-md-4 well">
			<form method="post" action=""> 
				<legend>Buscar</legend>
				<fieldset>
				<input type="text" class="form-control" name="buscar">
				<p>* ingrese la localidad</p><br>
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
			<legend>Nueva Localidad</legend>
			<fieldset>
			  <div class="form-group">
			    <label>Localidad</label>
			    <input type="text" class="form-control" name="localidad">
			  </div>
			  <div class="form-group">
			    <label>Provincia</label>
			    <input type="text" class="form-control" name="provincia">
			  </div>
			 
			  <button type="submit" class="btn btn-default">Guardar</button>
			</fieldset>
		</form>
	</div>
	<div class="col-md-8"></div>
</div>

</body>
</html>