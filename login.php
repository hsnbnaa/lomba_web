<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$database = "sekolah";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) { die("Connection failed: " . $conn->connect_error); }
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Edu - Care</title>
    <link rel="icon" href="img/logo-icon.png" />
    <link rel="stylesheet" href="style/login_style.css" />
</head>

<body>
    <nav class="navbar">
        <div class="logo-icon">
            <a href="home.html">
                <img src="img/logo-icon.png" alt="" />
                <span>EDU -<br />CARE</span>
            </a>
        </div>
    </nav>
    <section class="login-container">
        <div class="login-left">
            <img src="img/login-icon.png" alt="" />
        </div>
        <form method="POST" action="backend/backend.php?action=login" id="loginForm" class="login-right"
            onsubmit="handleLogin(event)">
            <div class="login-card">
                <h4>Masuk</h4>
                <p>Belum punya akun? <a href="signup.php">Buat sekarang</a></p>
                <div class="biodata">
                    <input type="email" id="email" name="email" placeholder="Alamat Email" />
                    <div class="pass-container" id="pass-container">
                        <input type="password" id="password" name="password" placeholder="Kata Sandi" />
                        <img src="img/eye-off.png" id="eye-icon" />
                    </div>
                    <div class="remember-me">
                        <div class="remember-me-container">
                            <input type="checkbox" name="remember-me" id="remember-me" />
                            <label for="remember-me">Ingat saya</label>
                        </div>
                        <a href="#">Lupa kata sandi?</a>
                    </div>
                </div>
                <button type="submit" id="login-btn">Masuk</button>
            </div>
        </form>
    </section>

    <script src="js/login.js"></script>
</body>

</html>