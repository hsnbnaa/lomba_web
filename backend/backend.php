<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$database = "sekolah";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function login($conn) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT username FROM user WHERE username = ? AND pass = ?");
    if ($stmt === false) {
        die("Error preparing statement: " . $conn->error);
    }

    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(['status' => 'success', 'message' => 'Login berhasil!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Username atau password salah!']);
    }

    $stmt->close();
}

function signup($conn) {
    // Mengambil nilai dari POST
    $fullname = $_POST['fullName'];
    $numberPhone = $_POST['numberPhone'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    if ($_POST['status'] == 'siswa') {
        $data = $_POST['token'];

        try {
            $sql = "CREATE TABLE IF NOT EXISTS siswa (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullname VARCHAR(100) NULL,
                phone VARCHAR(20) NULL,
                email VARCHAR(100) NULL,
                pass VARCHAR(255) NULL,
                token VARCHAR(100) NULL
            )";
        
            $conn->query($sql);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        // Menggunakan prepared statement untuk keamanan
        $stmt = $conn->prepare("INSERT INTO siswa (fullname, phone, email, pass, token) VALUES (?, ?, ?, ?, ?)");

    } else if ($_POST['status'] == 'orangtua_wali') {
        $data = $_POST['namaAnak'];

        try {
            $sql = "CREATE TABLE IF NOT EXISTS orangtua (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullname VARCHAR(100) NULL,
                phone VARCHAR(20) NULL,
                email VARCHAR(100) NULL,
                pass VARCHAR(255) NULL,
                anak VARCHAR(100) NULL
            )";
        
            $conn->query($sql);
        } catch (Exception $e) {
            echo $e->getMessage();
        }

        $stmt = $conn->prepare("INSERT INTO orangtua (fullname, phone, email, pass, anak) VALUES (?, ?, ?, ?, ?)");

    } else if ($_POST['status'] == 'guru') {
        $data = $_POST['mapel'];

        try {
            $sql = "CREATE TABLE IF NOT EXISTS guru (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullname VARCHAR(100) NULL,
                phone VARCHAR(20) NULL,
                email VARCHAR(100) NULL,
                pass VARCHAR(255) NULL,
                mapel VARCHAR(100) NULL
            )";
        
            $conn->query($sql);
        } catch (Exception $e) {
            echo $e->getMessage();
        }

        $stmt = $conn->prepare("INSERT INTO guru (fullname, phone, email, pass, mapel) VALUES (?, ?, ?, ?, ?)");
    }

    if ($stmt === false) {
        echo json_encode(['status' => 'error', 'message' => 'Kesalahan pada statement SQL: ' . $conn->error]);
        return;
    }

    // Mengikat parameter ke statement
    $stmt->bind_param("sssss", $fullname, $numberPhone, $email, $password, $data);

    // Menjalankan statement
    if ($stmt->execute() === TRUE) {
        echo json_encode(['status' => 'success', 'message' => 'Pendaftaran berhasil!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Kesalahan pada eksekusi SQL: ' . $stmt->error]);
    }

    // Menutup statement dan koneksi
    $stmt->close();
    $conn->close();
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_GET['action'])) {
    if ($_GET['action'] == 'login') {
        login($conn);
    }
    if ($_GET['action'] == 'signup') {
        signup($conn);
    }
}