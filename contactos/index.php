<!DOCTYPE html>
<html>
<head>
	<title>Contactos</title>

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
				<p>* ingrese el correo electr�nico de la persona</p><br>
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
				<legend>Nuevo Contacto</legend>
				<fieldset>
				  <div class="form-group">
				    <label>Nombre</label>
				    <input type="" class="form-control" name="nombre">
				  </div>
				  <div class="form-group">
				    <label>Tel�fono</label>
				    <input type="" class="form-control" name="tel">
				  </div>
				  <div class="form-group">
				    <label>Ciudad</label>
				    <input type="" class="form-control" name="ciudad">
				  </div>
				  <div class="form-group">
				    <label>Provincia</label>
				    <input type="" class="form-control" name="provincia">
				  </div>
				  <div class="form-group">
				    <label>Actividad</label>
				    <input type="" class="form-control" name="provincia">
				  </div>
				  <div class="form-group">
				    <label>Correo Electr�nico</label>
				    <input type="" class="form-control" name="correo">
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