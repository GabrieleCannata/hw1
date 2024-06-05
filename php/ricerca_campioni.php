<?php 

    session_start();
    if(isset($_POST["champion-searchbar"]))
    {
        $campioni = array();
        $conn = mysqli_connect("localhost", "root", "", "website");
        $ricerca = mysqli_real_escape_string($conn, $_POST["champion-searchbar"]);
        if($_POST["champion-searchbar"] == "") $all = 1; else $all=0;
        $query = "SELECT Nome, Path FROM campioni WHERE 
        Nome LIKE '%".$ricerca."%' OR costo = '".$ricerca."' OR Tratto LIKE '%".$ricerca."%' OR Tratto_secondario LIKE '%".$ricerca."%' OR Tratto_terziario LIKE '%".$ricerca."%' OR '$all'";
        
        $res = mysqli_query($conn, $query);
        while($row = mysqli_fetch_assoc($res))
        {
            $campioni[] = $row;
        }
        mysqli_free_result($res);
        mysqli_close($conn);
        echo json_encode($campioni);
    }
?>
