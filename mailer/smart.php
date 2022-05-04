<?php 

$phone = $_POST['phone'];
$name = $_POST['name'];


require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'nikita-avto-zvuk@yandex.ru';              // Наш логин
$mail->Password = 'oqjtpidsdlakxtef';          // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                        // TCP port to connect to
 
$mail->setFrom('nikita-avto-zvuk@yandex.ru', 'nikita-avto-zvuk');   // От кого письмо 
$mail->addAddress('carpetWashing1@yandex.ru');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
Пользователь оставил данные <br> 
Имя: ' . $name . ' <br>
Номер телефона: ' . $phone;

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>