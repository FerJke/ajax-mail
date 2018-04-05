<?php
header('Content-Type: text/html; charset=utf-8');

function clean($value = "") {
	$value = trim($value);
  $value = stripslashes($value);
  $value = strip_tags($value);
  $value = htmlspecialchars($value);

  return $value;
}

$name = clean($_POST['name']);
$email = clean($_POST['emailAddr']);
$phone = clean($_POST['phone']);
$msg = clean($_POST['msg']);

if(!empty($name) && !empty($email) && !empty($phone) && !empty($msg)) {

	// Заголовки
	$to = 'mail@gmail.com'; // електронный адрес получателя
	$subject = 'Заголовок письма';

	// Тело письма
	$message = "Имя заказчика: {$name}" . "\n\r";
	$message .= "Email заказчика: {$email}" . "\n\r";
	$message .= "Телефон заказчика: {$phone}" . "\n\r";
	$message .= "Сообщение заказчика: {$msg}";

	// Отправка письма
	//mail($to, $subject, $message);

	// Отчет
	//echo "имя - {$name}; почта - {$email}; телефон - {$phone}; сообщение - {$msg};";
  echo "<p>Ваше сообщение отправлено!</p>";
}
