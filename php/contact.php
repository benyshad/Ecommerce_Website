<?php



$email= '<div style="    white-space: pre;">' . "Name: " . $_POST['firstName'] . " " . $_POST['lastName'] ."\r\nEmail :" . $_POST['email'] . "\r\nMessage: " . wordwrap($_POST['message'], 70, "\n", TRUE) .  '</div>';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
if(mail("support@usacloseoutgroup.com","contact",$email,$headers)){

  // echo "<h1 style='width:100vw;text-align:center;top: 33%;position: absolute;' >Thank You for contacting us.</h1>";
  header("location:https://usacloseoutgroup.com/contactSubm.html");

}else{die('<h1>error</h1>');}
?>
