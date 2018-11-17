<?php

$project_name = '';
$form_subject = '';
$admin_email  = '';

$form_data = array(
	'Имя'					=> $_POST['name'] ?: 'Не указано',
	'Телефон' 		=> $_POST['phone'] ?: 'Не указан'
);

$c = true;
foreach ( $form_data as $key => $value ) {
	if ( $value != "" ) {
		$message .= "
		" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
			<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
			<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
		</tr>
		";
	}
}

$message = "<table style='width: 100%;'>$message</table>";

function adopt($text) {
	return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

mail($admin_email, adopt($form_subject), $message, $headers);
