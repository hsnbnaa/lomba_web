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
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Get the list of all tables in the database
    $result = $conn->query("SHOW TABLES");
    if ($result === false) {
        die("Error fetching tables: " . $conn->error);
    }

    $tables = [];
    while ($row = $result->fetch_array()) {
        $tables[] = $row[0];
    }

    $found = false;

    foreach ($tables as $table) {
        // Check if the table has 'username' and 'pass' columns
        $result = $conn->query("SHOW COLUMNS FROM $table LIKE 'email'");
        $usernameExists = $result && $result->num_rows > 0;

        if ($usernameExists) {
            $stmt = $conn->prepare("SELECT email FROM $table WHERE email = ? AND pass = ?");
            if ($stmt === false) {
                die("Error preparing statement: " . $conn->error);
            }

            $stmt->bind_param("ss", $email, $password);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows > 0) {
                $found = true;
                break;
            }

            $stmt->close();
        }
    }

    if ($found) {
        echo json_encode(['status' => 'success', 'message' => 'Login berhasil!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Username atau password salah!']);
    }
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
        // Mengikat parameter ke statement
        $stmt->bind_param("sssss", $fullname, $numberPhone, $email, $password, $data);

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
        // Mengikat parameter ke statement
        $stmt->bind_param("sssss", $fullname, $numberPhone, $email, $password, $data);

    } else if ($_POST['status'] == 'guru') {
        $data = $_POST['mapel'];
        $sekolah = $_POST['sekolah'];

        try {
            $sql = "CREATE TABLE IF NOT EXISTS guru (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullname VARCHAR(100) NULL,
                phone VARCHAR(20) NULL,
                email VARCHAR(100) NULL,
                pass VARCHAR(255) NULL,
                mapel VARCHAR(100) NULL,
                sekolah VARCHAR(100) NULL
            )";
        
            $conn->query($sql);
        } catch (Exception $e) {
            echo $e->getMessage();
        }

        $stmt = $conn->prepare("INSERT INTO guru (fullname, phone, email, pass, mapel, sekolah) VALUES (?, ?, ?, ?, ?, ?)");
        // Mengikat parameter ke statement
        $stmt->bind_param("ssssss", $fullname, $numberPhone, $email, $password, $data, $sekolah);
    }

    if ($stmt === false) {
        echo json_encode(['status' => 'error', 'message' => 'Kesalahan pada statement SQL: ' . $conn->error]);
        return;
    }

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