<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer.php';
require 'SMTP.php';
require 'POP3.php';
require 'OAuth.php';
require 'Exception.php';

$mail = new PHPMailer;
$mail->isSMTP();
$mail->Host = 'mail.slangrick.com';
$mail->SMTPAuth = true;
$mail->Username = 'bot@slangrick.com';
$mail->Password = 'Censored';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$mail->setFrom('bot@slangrick.com', 'slangrick Website');
$mail->addAddress('slangrick@hotmail.co.uk', 'Sam');

$mail->isHTML(true);

$mail->Subject = "Email from: " . $_POST['name'] . " " . $_POST['email'];
$mail->Body = $_POST['subject'];
$mail->send();
header('Location: index.html');
?>
