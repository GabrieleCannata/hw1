<?php
    session_start();
    if(!isset($_SESSION['username']))   header("Location: ../php/index.php");

    $conn = mysqli_connect("localhost", "root", "", "website");
    $compid = $_GET['q'];
    $query =  "DELETE c.* FROM campionicomposizione c WHERE IDcomposizione = ".$compid;
    $res = mysqli_query($conn, $query);
    $query =  "DELETE c.* FROM composizioni c WHERE ID = ".$compid;
    $res = mysqli_query($conn, $query);
    mysqli_close($conn);
?>