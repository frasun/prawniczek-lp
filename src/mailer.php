<?php
if (!str_contains($_SERVER['HTTP_ORIGIN'], $_SERVER['HTTP_HOST'])) {
    die();
}

$errors = [];
$errorMessage = '';

if (!empty($_POST)) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $group = $_POST['group'];

    if (empty($name)) {
        $errors[] = 'Pole imię jest wymagane';
    }

    if (empty($email)) {
        $errors[] = 'Pole e-mail jest wymagane';
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Adres e-mail jest nieprawidłowy';
    }

    if (empty($errors)) {
        $toEmail = 'info@prawniczek.pl';
        $emailSubject = 'Nowe zgłoszenie na listę oczekujących';
        $headers = ['From' => 'serv@prawniczek.pl', 'Reply-To' => $email, 'Content-type' => 'text/html; charset=utf-8'];
        $bodyParagraphs = ["Imię: {$name}", "Email: {$email}", $group];
        $body = join("<br />", $bodyParagraphs);

        if (mail($toEmail, $emailSubject, $body, $headers)) {
            echo 'Dziękujemy, adres <span class="text-orangeDark">' . $email . '</span> został dodany do listy :)';
        } else {
            $errorMessage = 'Coś poszło nie tak, spróbuj ponownie za chwilę';
            echo $errorMessage;
        }
    } else {
        $allErrors = join('<br/>', $errors);
        $errorMessage = $allErrors;

        echo $errorMessage;
    }
}
