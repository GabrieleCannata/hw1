<?php
    session_start();
    if(isset($_SESSION['username'])){
        $conn = mysqli_connect("localhost", "root", "", "website");
        $query = "SELECT c.ID AS COMPID, a.* FROM album a JOIN composizioni c ON (a.ID = c.Album) JOIN users u ON (u.ID = c.User) WHERE u.Username = '".$_SESSION['username']."'";
        $res = mysqli_query($conn, $query);
        $composizioni = [];
        while($row = mysqli_fetch_object($res))
        {
            $composizioni[] = $row;
        }
        mysqli_close($conn);
        echo json_encode($composizioni);
    }

?>