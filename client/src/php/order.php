<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST['username'];
    $description = $_POST['description'];
    $phone = $_POST['phone'];
    $email_from = $_POST['email_from'];
    $uuid = $_POST['uuid'];
    $date = date("d.m.Y");
    $time = date("H:i");
    // $message = file_get_contents("email.html");


    $email_to = "mechanizatory@mail.ru";
    $email_subject = "[Школа Механизаторов] Заявка $uuid от $username";
    $email_subject = mb_encode_mimeheader($email_subject, 'UTF-8');

    $email_message = '
    <p>Фамилия, Имя, Отчество клиента: <strong>' . $username . '</strong>.</p>
    <p>Email: <strong>' . $email_from . '</strong>.</p>
    <p>Контактный телефон: <strong>' . $phone . '</strong>.</p>
    <p>Описание: <strong>' . $description . '</strong>.</p>
    <p>Дата: <strong>' . $date . '</strong> в <strong>' . $time . '</strong>.</p>
    <p>Идентификатор клиента: <strong>' . $uuid . '</strong>.</p>

    ';

    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html' . "\r\n";
    $headers .= 'From: p134688@vip-h2.ihc.ru' . "\r\n" .
        'Reply-To: p134688@vip-h2.ihc.ru' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    $success = @mail($email_to, $email_subject, $email_message, $headers);

    if ($success) {
        echo json_encode(["status" => "success", "message" => "Письмо отправлено успешно.", "username: " => $username, "email from: " => $email_from, "phone: " => $phone, "description: " => $description, "date: " => $date .' в '. $time, "UUID: " => $uuid]);
    } else {
        echo json_encode(["status" => "error", "message" => "Не удалось отправить письмо."]);
    }

} else {
    echo '<p style="font-size: 34px; text-align: center">Ошибка данных</p>';
    echo '<p style="font-size: 24px; text-align: center">Запрос не получен</p>';
    echo '<p style="font-size: 24px; text-align: center">Форма не заполнена</p>';

}