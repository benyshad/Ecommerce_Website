<?php

$dataN = file_get_contents('php://input');
$data = json_decode($dataN, true);
// $data = file_get_contents('php://input');
$data = $data[0];



// $email= '<div style="word-wrap:break-word; white-space: pre;">' . 'Name: ' . $data->FirstName . " ". $data->LastName ."\r\nEmail :" . $data->Email . 'Phone: ' .  $data->Address .  '</div>';
// $headers  = 'MIME-Version: 1.0' . "\r\n";
// $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
// if(mail("sales@cfswarehousegroup.com","contact",$email,$headers)){

//   echo "<h1 style='width:100vw;text-align:center;top: 33%;position: absolute;' >Thank You for contacting us.</h1>";

// }else{die('<h1>error</h1>');}

$email= '<div style="word-wrap:break-word; white-space: pre;">' . $data['FirstName'] . " ". $data['LastName'] . "\r\n" .  $data['Address'] . "\r\n". $data['State'] . " ". $data['Zip']. "\r\n". "\r\nEmail :" . $data['Email'] . "\r\n". '</div>';
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
if(mail("support@usacloseoutgroup.com","contact",$email.$dataN,$headers)){



}else{die('<h1>error</h1>');}
// file_put_contents("test", $email.$dataN);

?>