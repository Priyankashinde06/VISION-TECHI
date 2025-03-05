<?php
// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer
require 'C:/xampp/htdocs/Vision Techi/PHPMailer-master/src/PHPMailer.php';
require 'C:/xampp/htdocs/Vision Techi/PHPMailer-master/src/SMTP.php';
require 'C:/xampp/htdocs/Vision Techi/PHPMailer-master/src/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $subject = htmlspecialchars($_POST['subject']);

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';  // Your DirectAdmin SMTP host
        $mail->SMTPAuth = true;
        $mail->Username = 'asp1935pawar@gmail.com';  // Your DirectAdmin email
        $mail->Password = 'pkitfwevqqzlgebc';        // Your email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465 ; // Use 465 for SSL or 587 for TLS

        // Email Settings
        $mail->setFrom($email, $name);
        $mail->addAddress('ps662001@gmail.com'); // Your personal email
        $mail->Subject = $subject;
        $mail->Body = "Name: $name\nEmail: $email\nMessage: $message";

        // Send Email
        if($mail->send()) {
            echo 'OK';
        } else {
            echo 'Message could not be sent.';
        }
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
