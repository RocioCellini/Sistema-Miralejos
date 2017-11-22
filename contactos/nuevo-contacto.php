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

<div class="row">
	<div class="col-md-2"></div>
    <div class="col-md-4">
		<form>
		  <div class="form-group">
		    <label>Nombre</label>
		    <input type="" class="form-control" id="Nombre">
		  </div>
		  <div class="form-group">
		    <label>Teléfono</label>
		    <input type="" class="form-control" id="tel">
		  </div>
		  <div class="form-group">
		    <label>Ciudad</label>
		    <input type="" class="form-control" id="ciudad">
		  </div>
		  <div class="form-group">
		    <label>Provincia</label>
		    <input type="" class="form-control" id="provincia">
		  </div>
		  <div class="form-group">
		    <label>Actividad</label>
		    <input type="" class="form-control" id="provincia">
		  </div>
		  <div class="form-group">
		    <label>Correo Electrónico</label>
		    <input type="" class="form-control" id="correo">
		  </div>
		  <button type="submit" class="btn btn-default">Guardar</button>
		</form>
	</div>
	<div class="col-md-8"></div>
</div>

<?php
  include '../pie.html';
?>
</body>
</html>