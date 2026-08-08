<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

function logMessage($msg) {
    file_put_contents('email_debug.log', date('Y-m-d H:i:s') . ' - ' . $msg . "\n", FILE_APPEND);
}

logMessage("=== New Request ===");
logMessage("POST Data: " . print_r($_POST, true));

$isAjax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
          strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = isset($_POST["name"]) ? trim($_POST["name"]) : '';
    $email   = isset($_POST["email"]) ? trim($_POST["email"]) : '';
    $phone   = isset($_POST["phone"]) ? trim($_POST["phone"]) : '';
    $society = isset($_POST["society"]) ? trim($_POST["society"]) : '';
    $units   = isset($_POST["units"]) ? trim($_POST["units"]) : '';
    $message = isset($_POST["message"]) ? trim($_POST["message"]) : '';
    
    logMessage("Parsed Data - Name: $name, Email: $email, Phone: $phone");
    
    $errors = [];
    
    if (empty($name)) $errors['name'] = "Full name is required";
    if (empty($email)) {
        $errors['email'] = "Email address is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Please enter a valid email address";
    }
    if (empty($phone)) $errors['phone'] = "Phone number is required";
    if (empty($society)) $errors['society'] = "Society name is required";
    if (empty($units)) $errors['units'] = "Please select number of units";
    if (empty($message)) $errors['message'] = "Message is required";
    
    if (!empty($errors)) {
        logMessage("Validation Errors: " . print_r($errors, true));
        if ($isAjax) {
            echo json_encode([
                'success' => false,
                'message' => 'Please fix the following errors:',
                'errors' => $errors
            ]);
            exit;
        } else {
            header('Location: contact.html?error=validation');
            exit;
        }
    }
    
    $to = "info@raajsocietysolutions.in"; 
    
    $subject = "New Contact Form Submission - RAAJ Society Solutions";
    
    $body = "========================================\n";
    $body .= "NEW CONTACT FORM SUBMISSION\n";
    $body .= "========================================\n\n";
    $body .= "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Phone: " . $phone . "\n";
    $body .= "Society Name: " . $society . "\n";
    $body .= "Number of Units: " . $units . "\n\n";
    $body .= "Message:\n" . $message . "\n\n";
    $body .= "========================================\n";
    $body .= "Submitted on: " . date('Y-m-d H:i:s') . "\n";
    $body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    $body .= "========================================\n";
    
    $htmlBody = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1a4b8c; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f8f9fa; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1a4b8c; }
            .value { margin-left: 10px; }
            .footer { background-color: #343a40; color: white; padding: 10px; text-align: center; font-size: 12px; }
            .highlight { background-color: #e9ecef; padding: 15px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
                <p>RAAJ Society Solutions</p>
            </div>
            <div class='content'>
                <div class='field'><span class='label'>Name:</span> <span class='value'>" . htmlspecialchars($name) . "</span></div>
                <div class='field'><span class='label'>Email:</span> <span class='value'>" . htmlspecialchars($email) . "</span></div>
                <div class='field'><span class='label'>Phone:</span> <span class='value'>" . htmlspecialchars($phone) . "</span></div>
                <div class='field'><span class='label'>Society Name:</span> <span class='value'>" . htmlspecialchars($society) . "</span></div>
                <div class='field'><span class='label'>Number of Units:</span> <span class='value'>" . htmlspecialchars($units) . "</span></div>
                <div class='field highlight'><span class='label'>Message:</span><br><span class='value'>" . nl2br(htmlspecialchars($message)) . "</span></div>
            </div>
            <div class='footer'>&copy; " . date('Y') . " RAAJ Society Solutions</div>
        </div>
    </body>
    </html>
    ";
    
    $mail = new PHPMailer(true);
    
    try {
        logMessage("Initializing PHPMailer...");
        
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@raajsocietysolutions.in';   
        $mail->Password   = 'jcjp-7teb-lzdb-hl18';      
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        $mail->CharSet    = 'UTF-8';
        
        $mail->setFrom('info@raajsocietysolutions.in', 'RAAJ Society Solutions');
        $mail->addAddress($to);
        $mail->addReplyTo($email, $name);
        
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $htmlBody;
        $mail->AltBody = $body;
        
        $mail->send();
        logMessage("Email sent successfully!");
        
        if ($isAjax) {
            echo json_encode([
                'success' => true,
                'message' => 'Thank you! Your message has been sent successfully.'
            ]);
        } else {
            header('Location: contact.html?success=1');
        }
        exit;
        
    } catch (Exception $e) {
        logMessage("ERROR: " . $e->getMessage());
        logMessage("Error Info: " . $mail->ErrorInfo);
        
        if ($isAjax) {
            echo json_encode([
                'success' => false,
                'message' => 'Failed to send message. Error: ' . $mail->ErrorInfo
            ]);
        } else {
            header('Location: contact.html?error=mailer');
        }
        exit;
    }
} else {
    header('Location: contact.html');
    exit;
}
?>