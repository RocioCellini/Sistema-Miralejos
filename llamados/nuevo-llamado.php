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
    <div class="col-md-8 well">
		<form method="post" action="">
			<legend>Nuevo Llamado</legend>
			<fieldset>
			<div class="col-md-6">			  
				  <div class="form-group">
				    <label>Contacto: </label> persona seleccionada			    
				  </div>
				  <div class="form-group">
				    <label>Vendedor: </label> vendedor traído por el inicio de sesión			    
				  </div>
				  <div class="form-group">
				    <label>Fecha: </label> fecha traída de la pc
				  </div>
				  <div class="form-group">
				    <label>Hora: </label> hora traída de la pc			   
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
				    <label>Planta</label>			   
				    <select class="form-control" name="planta">
					  <option>Planta Baja</option>
					  <option>1er Piso</option>
					  <option>2do Piso</option>
					  <option>3ro Piso</option>				
					</select>	
				  </div>
				  <div class="form-group">
				    <label>Departamento</label>
				    <select class="form-control" name="dpto">
					  <option>A</option>
					  <option>B</option>
					  <option>C</option>
					  <option>D</option>				
					</select>	
				  </div>	
				  <div class="form-group">
			    <label>Grado de Interés</label>			    
			    <select class="form-control" name="grado-interes">
				  <option>1</option>
				  <option>2</option>
				  <option>3</option>
				  <option>4</option>				
				</select>	
			  </div>	  
			</div>
			<div class="col-md-6">	
				<div class="form-group">
					<label>Origen del Dato</label>
					<select class="form-control" name="origen-dato">
						<option>Cesión</option>
						<option>Comincini</option>
						<option>Eliseo</option>
						<option>Ex AA</option>
						<option>Grupo Miralejos</option>
						<option>Inm. Chaves</option>
						<option>Letrero</option>
						<option>Oficina</option>
						<option>Pablo</option>
						<option>Temp L Lopez</option>	
						<option>w p.p</option>
					</select>
				</div>
				<div class="form-group">
				    <label>Fecha Origen del Dato</label>
				    <input type="" class="form-control" name="fecha-origen-dato">
				  </div>			  
				<div class="form-group">
					<label>Anotaciones</label>
					<textarea class="form-control" rows="15" name="observaciones"></textarea>	    
				</div>
			  <br>		 		
			  <button type="submit" class="btn btn-default" style="float: right;">Guardar</button>
			</div>
			</fieldset>
		</form>
	</div>
	<div class="col-md-2"></div>
</div>

</body>
</html>