<!DOCTYPE html>
<html>
<head>
	<title>Planilla</title>

	<!-- CSS -->
 	<link rel="stylesheet" href="../bootstrap-3.3.7/css/bootstrap.min.css">
</head>
<body>

<?php
  include '../menu.html';
?>

<div class="row">
	<div class="col-md-2"></div>
    <div class="col-md-8">
		<h3>Importar Datos</h3><br><br>
		<form method="post" action="subir_archivo.php" enctype="multipart/form-data">
		    <input type="file" name="archivo" /><br />
		    <input type="submit" value="Cargar" />
		</form>
	</div>
	<div class="col-md-2"></div>
</div>

<hr>
<div class="row">
	<div class="col-md-2"></div>
    <div class="col-md-8">
		<h3>Cargar Datos</h3><br><br>
	</div>
	<div class="col-md-2"></div>
</div>

<form>
	<div class="row">
	<div class="col-md-2"></div>
    <div class="col-md-4">
		
		  <div class="form-group">
		    <label>Cliente</label>
		    <input type="" class="form-control">
		  </div>
		  <div class="form-group">
		    <label>Tipo de Cliente</label>
		    <input type="" class="form-control">
		  </div>
		  <div class="form-group">
		    <label>GI</label>
		    <input type="" class="form-control">
		  </div>
		  <div class="form-group">
		    <label>Teléfono</label>
		    <input type="" class="form-control">
		  </div>
		  <div class="form-group">
		    <label>Ciudad</label>
		    <input type="" class="form-control">
		  </div>
		  <div class="form-group">
		    <label>Provincia</label>
		    <input type="" class="form-control">
		  </div>
		  <div class="form-group">
		    <label>Origen Dato</label>
		    <input type="" class="form-control">
		  </div>
		  <div class="form-group">
		    <label>Actividad</label>
		    <input type="" class="form-control">
		  </div>
		  
		</div>

		<div class="col-md-4">
		  <div class="form-group">
		    <label>Conoce</label>
		    <input type="" class="form-control">
		  </div>
		  <div class="form-group">
		    <label>Fecha origen dato</label>
		    <input type="" class="form-control">
		  </div>
		   <div class="form-group">
		    <label>Fecha ultimo contacto</label>
		    <input type="" class="form-control">
		  </div>
		   <div class="form-group">
		    <label>Nº Llamados</label>
		    <input type="" class="form-control">
		  </div>
		   <div class="form-group">
		    <label>Fecha cierre operación</label>
		    <input type="" class="form-control">
		  </div>
		  <div class="form-group">
		    <label>Edificio</label>
		    <input type="" class="form-control">
		  </div>
		  <div class="form-group">
		    <label>Depto Vendido</label>
		    <input type="" class="form-control">
		  </div>
		  <div class="form-group">
		    <label>Correo Electrónico</label>
		    <input type="" class="form-control">
		  </div>
		 
	</div>
	<div class="col-md-2"></div>
	</div>
	<br><br>
	<div class="row">
	<div class="col-md-2"></div>
	<div class="col-md-8" align="center">
	<button type="submit" class="btn btn-default">Guardar</button>
	</div>
	<div class="col-md-2"></div>
	</div>
	<br><br>
</form>

<?php
  include '../pie.html';
?>
</body>
</html>