<?php
// Koneksi ke database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sekolah";

$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$dataType = $_GET['type'];

if ($dataType == "provinsi") {
    // Mengambil data provinsi yang unik
    $sql = "SELECT DISTINCT provinsi FROM data_sekolah";
} elseif ($dataType == "kota") {
    $provinsi = $_GET['provinsi'];
    // Mengambil kota berdasarkan nama provinsi
    $sql = "SELECT DISTINCT kota FROM data_sekolah WHERE provinsi = '$provinsi'";
} elseif ($dataType == "sekolah") {
    $kota = $_GET['kota'];
    // Mengambil sekolah berdasarkan nama kota
    $sql = "SELECT DISTINCT sekolah FROM data_sekolah WHERE kota = '$kota'";
} else {
    echo json_encode([]);
    exit();
}

$result = $conn->query($sql);
$options = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $options[] = $row;
    }
}

$conn->close();

echo json_encode($options);