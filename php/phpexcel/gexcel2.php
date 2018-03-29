<?php
//header('X-Frame-Options: SAMEORIGIN');
//header('X-Content-Type-Options: nosniff');
//header('X-XSS-Protection: 1;mode=block');
//header("Content-type: text/plain");	
session_start();
$_SESSION['Usuario']="Chipi";
if(isset($_SESSION['Usuario'])) {



/*
$_GET['type_accion']="setexcel_fac";
$_GET['criterio']="26134161";
$_GET['typecredit']="3";
*/
if (isset($_GET['type_accion']) && $_GET['type_accion']!='') {

  $type_accion=$_GET['type_accion'];

  // Now We Can Make the Search for 
  if($type_accion==="setexcel_fac"){


    /**
    * PHPExcel
    *
    * Copyright (c) 2006 - 2015 PHPExcel
    *
    * This library is free software; you can redistribute it and/or
    * modify it under the terms of the GNU Lesser General Public
    * License as published by the Free Software Foundation; either
    * version 2.1 of the License, or (at your option) any later version.
    *
    * This library is distributed in the hope that it will be useful,
    * but WITHOUT ANY WARRANTY; without even the implied warranty of
    * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
    * Lesser General Public License for more details.
    *
    * You should have received a copy of the GNU Lesser General Public
    * License along with this library; if not, write to the Free Software
    * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
    *
    * @category   PHPExcel
    * @package    PHPExcel
    * @copyright  Copyright (c) 2006 - 2015 PHPExcel (http://www.codeplex.com/PHPExcel)
    * @license    http://www.gnu.org/licenses/old-licenses/lgpl-2.1.txt  LGPL
    * @version    ##VERSION##, ##DATE##
    */

    /** Error reporting */
    error_reporting(E_ALL);
    ini_set('display_errors', TRUE);
    ini_set('display_startup_errors', TRUE);
    //date_default_timezone_set('Europe/London');

    if (PHP_SAPI == 'cli')

    die('This example should only be run from a Web Browser');

    /** Include PHPExcel */
    require_once dirname(__FILE__) . '/Classes/PHPExcel.php';


    // Create new PHPExcel object
    $objPHPExcel = new PHPExcel();


    // Set document properties
    $objPHPExcel->getProperties()->setCreator("Maarten Balliauw")
             ->setLastModifiedBy("Maarten Balliauw")
             ->setTitle("Office 2007 XLSX Dante Alighieri")
             ->setSubject("Office 2007 XLSX Inscriptos Congreso")
             ->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
             ->setKeywords("office 2007 openxml php")
             ->setCategory("Test result file");


    // Add some data
    $objPHPExcel->setActiveSheetIndex(0)
          ->setCellValue('A1', 'Inscripto')
          ->setCellValue('B1', 'Cargo')
          ->setCellValue('C1', 'Dni')
          ->setCellValue('D1', 'Monto')
          ->setCellValue('E1', 'Pago')
          ->setCellValue('F1', 'Fecha Pago')
          ->setCellValue('G1', 'Tipo Arancel')
          ->setCellValue('H1', 'Email')
          ->setCellValue('I1', 'Provincia')
          ->setCellValue('J1', 'Ciudad')
          ->setCellValue('K1', 'Direccion')
          ->setCellValue('L1', 'Codigo Postal')
          ->setCellValue('M1', 'Telefono')
          ->setCellValue('N1', 'Medio Contacto')
          ->setCellValue('O1', 'Detalle');





//************************************************************************************************// 
//************************************************************************************************//
    //BUSCAR MEDICOS CON TURNOS 3465
    // Para Obtener Las Disciplinas de los Medicos
    $criterio_1="";
    $criterio_2="";
   
    
    $set_consulta1="";
    $set_consulta2="";

    $type=null;
    $type2="i";
    
    $suma_consulta1=0;
    $suma_consulta2=0;


    if(isset($_GET['criterio'])){
       $criterio_1=$_GET['criterio'];
    
        if($criterio_1!=""){
           $set_consulta1=" WHERE (Apellidos Like ? OR Nombres like ? OR DNI like ?) ";
           $set_consulta2=" WHERE Id_Inscripto=? ";
           $type="sss";
      
           for ($i=1;$i<4;$i++){
              $suma_consulta1++;
              ${'set1_var'.$suma_consulta1}="%".$criterio_1."%";
           }
      }
    }

    

    if(isset($_GET['typecredit'])){
       
       $criterio_2=$_GET['typecredit'];
       
       if($criterio_2=="1"){
          $set_consulta2=" WHERE Id_Inscripto=? ";
       }else {
          $type2.="i";
          $suma_consulta2++;
          $set_consulta2=" WHERE Id_Inscripto=? AND Pago=? ";
       }


       if($criterio_2=="2"){
          $acreditado=-1;
       }

        if($criterio_2=="3"){
          $acreditado=-2;
       }

    }
    //-------------------------------------------------------------------------------
    //listado
    $default_response="Sin Resultados";

    include "../conexion.php";
    
    $result = "SELECT * FROM Persona_Inscripta ".$set_consulta1."ORDER BY Nombres ASC";
  

    $stmt = $conn->prepare($result);

    if($stmt === false) {
      trigger_error('Wrong SQL: ' . $result . ' Error: ' . $conn->error, E_USER_ERROR);
    }

    $criterio_final="%".$criterio_1."%";
 
    
      if($suma_consulta1>0){
          $params=array();
          //echo $type."<br>";
          $params[]=&$type;

          for($i=1;$i<=$suma_consulta1;$i++){
            $params[]=&${'set1_var'.$i};
          }
         
          call_user_func_array(array($stmt, 'bind_param'), $params);
      }


    
    $stmt->execute();
    $rs=$stmt->get_result();
    
    if($row=$rs->fetch_assoc()){





        $tmp2 = array();
        
        $i=1;
        
        do {

            $i++;
            //***********************************************************************//

          $result2 = 'SELECT * FROM Pagos_Inscripciones' .$set_consulta2;       
          $stmt2 = $conn->prepare($result2);

          if($stmt2 === false) {
            trigger_error('Wrong SQL: ' . $result2 . ' Error: ' . $conn->error, E_USER_ERROR);
          }

          $id_persona=$row['Id_Persona'];
         

          //echo $type."<br>";
          if($suma_consulta2>0){
              $params2= array($type2,  $id_persona, $acreditado);
          } else {
              $params2= array($type2, $id_persona);
          }
        
          
          foreach($params2 as $key => $value) $tmp2[$key] = &$params2[$key];
          call_user_func_array(array($stmt2, 'bind_param'), $tmp2);


          $stmt2->execute();
          $rs2=$stmt2->get_result();

          if($row2=$rs2->fetch_assoc()){

              $email=$row['Email'];
            
              $dni=$row['DNI'];
              $id_inscripto=$row['Id_Persona'];
              $name_inscripto=$row['Nombres'].", ".$row['Apellidos'];
              $cargo=$row['Cargo'];
              $ciudad=$row['Ciudad'];
              $direccion=$row['Direccion'];
              $codigopostal=$row['CodigoPostal'];
              $telefono=$row['Telefono'];

              
              $fecha_pago=$row2['Fecha_Pago'];
              $pago=$row2['Pago'];
              $detalle_pago=$row2['Detalle'];
              
              if($pago===-2){
                  $pago="No Acreditado";
                  $fecha_pago="-";
                }else{
                   $pago="Acreditado";
              }


              $id_operacion=$row2['Id'];       

        
              // we need to bring the name dicipline to complete the table
              //------------------------------------------------------------------------
              $result3 = 'SELECT * FROM Arancel WHERE Id_Arancel=?';

              $stmt3 = $conn->prepare($result3);

              if($stmt3 === false) {
              trigger_error('Wrong SQL: ' . $result3 . ' Error: ' . $conn->error, E_USER_ERROR);
              }

              $id_arancel=$row2['Id_Arancel'];

              $stmt3->bind_param('i', $id_arancel);

              $stmt3->execute();
              $rs3=$stmt3->get_result();

              if($row3=$rs3->fetch_assoc()){   
                $monto="$".$row3['Costo'].".00";
                $tipo_arancel=$row3['Tipo']; 
                if(strlen($tipo_arancel)>25){
                  $tipo_arancel="Estudiantes / Redesa";
                }

              }
            //------------------------------------------------------------------------
          
            //------------------------------------------------------------------------
              $result4 = 'SELECT * FROM Provincia WHERE Id_Prov=?';

              $stmt4 = $conn->prepare($result4);

              if($stmt4 === false) {
              trigger_error('Wrong SQL: ' . $result4 . ' Error: ' . $conn->error, E_USER_ERROR);
              }

           

              $stmt4->bind_param('i', $row['Provincia']);

              $stmt4->execute();
              $rs4=$stmt4->get_result();

              if($row4=$rs4->fetch_assoc()){   
                $provincia = $row4["Nombre_Prov"];
              }

              //------------------------------------------------------------------------
              $result5 = 'SELECT * FROM Medio_Comunicacion WHERE Id_Medio=?';

              $stmt5 = $conn->prepare($result5);

              if($stmt5 === false) {
              trigger_error('Wrong SQL: ' . $result5 . ' Error: ' . $conn->error, E_USER_ERROR);
              }

           

              $stmt5->bind_param('i', $row['Id_Medio']);

              $stmt5->execute();
              $rs5=$stmt5->get_result();

              if($row5=$rs5->fetch_assoc()){   
                $medio_contacto = $row5["Nombre_Medio"];
              }
            //------------------------------------------------------------------------
            // Add some data
              $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('A'.$i,  $name_inscripto)
              ->setCellValue('B'.$i,  $cargo)
              ->setCellValue('C'.$i,  $dni)
              ->setCellValue('D'.$i,  $monto)
              ->setCellValue('E'.$i,  $pago)
              ->setCellValue('F'.$i,  $fecha_pago)
              ->setCellValue('G'.$i,  $tipo_arancel)
              ->setCellValue('H'.$i,  $email)
              ->setCellValue('I'.$i,  $provincia)
              ->setCellValue('J'.$i,  $ciudad)
              ->setCellValue('K'.$i,  $direccion)
              ->setCellValue('L'.$i,  $codigopostal)
              ->setCellValue('M'.$i,  $telefono)
              ->setCellValue('N'.$i,  $medio_contacto)
              ->setCellValue('O'.$i,  $detalle_pago);

            //------------------------------------------------------------------------
            //-------------------------------------------------------------------------


          }
   
        } while ($row = $rs->fetch_assoc());  
    }
//***********************************************************************************************

    // Rename worksheet
    $objPHPExcel->getActiveSheet()->setTitle('Simple');


    // Set active sheet index to the first sheet, so Excel opens this as the first sheet
    $objPHPExcel->setActiveSheetIndex(0);


    // Redirect output to a client’s web browser (OpenDocument)
    header('Content-Type: application/vnd.oasis.opendocument.spreadsheet');
    header('Content-Disposition: attachment;filename="01simple.ods"');
    header('Cache-Control: max-age=0');
    // If you're serving to IE 9, then the following may be needed
    header('Cache-Control: max-age=1');

    // If you're serving to IE over SSL, then the following may be needed
    header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
    header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
    header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
    header ('Pragma: public'); // HTTP/1.0

    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'OpenDocument');
    $objWriter->save('php://output');
    exit;
  } // $type_accion==="search_tn"
}

}

?>      