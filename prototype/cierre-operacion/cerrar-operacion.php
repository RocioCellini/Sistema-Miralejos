<!DOCTYPE html>
<html>
<head>
	<title></title>

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
				<legend>Cerrar Operación</legend>
				<fieldset>
				  <div class="form-group">
				    <label>Contacto: </label> persona seleccionada			    
				  </div>
				  <div class="form-group">
				    <label>Vendedor: </label> vendedor traído por el inicio de sesión			    
				  </div>
				  <div class="form-group">
				    <label>Fecha de cierre: </label> fecha traída de la pc
				  </div>
				  <div class="form-group">
				    <label>Hora de cierre: </label> hora traída de la pc			   
				  </div>
				  <div class="form-group">
				    <label>DNI del contacto: </label>
				    <input type="" class="form-control" name="dni">			   
				  </div>	
				   <div class="form-group">
				    <label>Edificio</label>
				    <select class="form-control" name="edificio">
					  <option>M1</option>
					  <option>M2</option>
					  <option>M3</option>
					  <option>M4</option>
					  <option>M5</option>
					</select>			    
				  </div>
				  <div class="form-group">
				    <label>Planta</label>	<!-- estara bloqueada hasta que se elija el edificio-->		   
				    <select class="form-control" name="planta">
					  <option>Planta Baja</option>
					  <option>1er Piso</option>
					  <option>2do Piso</option>
					  <option>3ro Piso</option>				
					</select>	
				  </div>
				  <div class="form-group">
				    <label>Departamento</label> <!-- estara bloqueada hasta que se elija la planta-->
				    <select class="form-control" name="dpto">
					  <option>A</option>
					  <option>B</option>
					  <option>C</option>
					  <option>D</option>				
					</select>	
				  </div>	
				  <div class="form-group">
				    <label>Observaciones</label>
				    <input type="text" class="form-control" name="observaciones">
				  </div>
				 
				  <button type="submit" class="btn btn-default">Guardar</button>
				</fieldset>
			</form>
		</div>
		<div class="col-md-8"></div>
	</div>
</body>
</html>