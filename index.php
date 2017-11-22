<!DOCTYPE html>
<html>
<head>
	<title>Sistema de Gestión</title>

	<!-- CSS -->
 	<link rel="stylesheet" href="bootstrap-3.3.7/css/bootstrap.min.css">
	<link href="css/estilos.css" rel="stylesheet" type="text/css">

</head>

<body>
	
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><a href="estadisticas/index.php">Estadísticas</a></li>
        
        <li class="dropdown">
          <a href="contactos/index.php" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Contactos <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="contactos/nuevo-contacto.php">Nuevo</a></li>
            <li><a href="contactos/ver-lista.php">Ver lista</a></li>            
          </ul>
        </li>

        <li><a href="planilla/index.php">Planilla</a></li>
        <li><a href="vendedores/index.php">Vendedores</a></li>
      </ul>
      
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>

<!-- JQuery-->
<script src="jquery-3.1.1/jquery-3.1.1.min.js"></script>

<!-- Bootstrap -->
<script  src="bootstrap-3.3.7/js/bootstrap.min.js"></script>

</body>
</html>