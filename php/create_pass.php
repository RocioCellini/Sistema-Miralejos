<?php
 	Dantecaba
$pass="789_Cabadante";

$options = [
			'cost' => 10,
			'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
			];
				
$pass=password_hash($pass, PASSWORD_BCRYPT, $options);
echo $pass;
?>