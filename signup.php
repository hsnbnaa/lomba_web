<?php

$servername = "localhost";
$username = "root";
$password = "";

// Membuat koneksi
$conn = new mysqli($servername, $username, $password);

// Memeriksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Membuat database dengan penanganan pengecualian
try {
    $sql = "CREATE DATABASE IF NOT EXISTS sekolah";
    $conn->query($sql);
} catch (Exception $e) {
    echo $e->getMessage();
}

$conn->close();

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
    <link rel="stylesheet" href="style/signup_style.css" />
</head>

<body>
    <nav class="navbar">
        <div class="logo-icon">
            <a href="home.html">
                <img src="img/logo-icon.png" alt="" />
                <span>EDU - CARE</span>
            </a>
        </div>
    </nav>
    <section class="signup-container">
        <div class="signup-left">
            <img src="img/login_img.png" alt="" />
        </div>
        <form method="POST" action="backend/backend.php?action=signup" id="signupForm" class="signup-right"
            onsubmit="handleSignup(event)">
            <div class="signup-card" id="signup-step-1">
                <h4>Pendaftaran Akun</h4>
                <p class="desc">yuk isi form untuk melanjutkan</p>
                <div class="status">
                    <p>Daftar sebagai :</p>
                    <div class="status-options">
                        <div class="status-option">
                            <input type="radio" id="status-1" name="status" value="siswa" />
                            <label for="status-1">Siswa</label>
                        </div>
                        <div class="status-option">
                            <input type="radio" id="status-2" name="status" value="orangtua_wali" />
                            <label for="status-2">Orangtua / Wali</label>
                        </div>
                        <div class="status-option">
                            <input type="radio" id="status-3" name="status" value="guru" />
                            <label for="status-3">Guru</label>
                        </div>
                    </div>
                </div>
                <div class="biodata">
                    <div class="first-line">
                        <input type="text" id="fullName" name="fullName" placeholder="Nama Lengkap" />
                        <input type="number" id="numberPhone" name="numberPhone" placeholder="Nomor Handphone" />
                    </div>
                    <br />
                    <input type="email" id="email" name="email" placeholder="Alamat Email" />
                    <br />
                    <div class="third-line">
                        <div class="pass-container" id="pass-container">
                            <input type="password" id="password" name="password" placeholder="Kata Sandi" />
                            <img src="img/eye-off.png" id="eye-icon" />
                        </div>
                        <div class="token-card" id="token-card">
                            <input type="text" id="token" name="token" placeholder="Token" />
                            <p>*Token didapat dari guru untuk masuk ke kelas.</p>
                        </div>
                    </div>
                </div>
                <div class="footer" id="footer">
                    <p class="syarat">
                        Dengan membuat akun, saya setuju dengan
                        <span>syarat dan ketentuan</span> <br />serta
                        <span>Ketentuan yang berlaku</span> di Edu - Care.
                    </p>
                    <button type="button" id="next-btn" onclick="showNextStep()">Daftar</button>
                </div>
            </div>

            <div class="signup-card" id="signup-step-2" style="display: none;">
                <h4>Hubungkan ke Sekolah</h4>
                <p class="desc">Isi Form agar dapat terhubung dengan Sekolah anda</p>
                <div class="school-data">
                    <label for="provinsi">Provinsi</label>
                    <select id="provinsi" name="provinsi" onchange="loadKota()">
                    </select>
                    <br />
                    <label for="kota">Kota/Kabupaten</label>
                    <select id="kota" name="kota" onchange="loadSekolah()">
                    </select>
                    <br />
                    <label for="sekolah">Asal Sekolah</label>
                    <select id="sekolah" name="sekolah">
                    </select>
                    <br />
                    <label for="npsn">NPSN</label>
                    <input type="text" id="npsn" name="npsn" placeholder="Masukkan Nomor NPSN" />
                    <br />
                    <div class="footer">
                        <p>Dengan melanjutkan anda dapat terhubung dengan sekolah sesuai pilihan anda</p>
                        <button type="button" id="next-btn" onclick="showLastStep()">Lanjut</button>
                    </div>
                </div>
            </div>

            <div class="signup-card" id="signup-step-3" style="display: none;"></div>
        </form>
    </section>
    <script src="js/signup.js"></script>
</body>

</html>