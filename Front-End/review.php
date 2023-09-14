<?php

$dataN = file_get_contents('php://input');
$data = json_decode($dataN, true);
$data = $data[0];



$email= '<div style="word-wrap:break-word; white-space: pre;">' . $data['FirstName'] . " ". $data['LastName'] . "\r\n" .  $data['Address'] . "\r\n". $data['State'] . " ". $data['Zip']. "\r\n". "\r\nEmail :" . $data['Email'] . "\r\n". '</div>';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
if(mail("support@usacloseoutgroup.com","contact",$email.$dataN,$headers)){



}else{die('<h1>error</h1>');}
// file_put_contents("test", $email.$dataN);

?>