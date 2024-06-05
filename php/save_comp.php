<?php
// devo realizzare un pulsante salva che permetta di inserire in un database le informazioni dei campioni selezionati e degli oggetti inclusi
    session_start();
    if(isset($_SESSION['username']))
    {
        $conn = mysqli_connect("localhost", "root", "", "website");
        $albumid;
        $id;
        $prequery = "SET FOREIGN_KEY_CHECKS=0";
        $resprequery = mysqli_query($conn, $prequery);

        if(isset($_POST['Titolo']) && isset($_POST['Immagine_composizione'])){
            $query_album = "SELECT * FROM album WHERE Nome = '".$_POST['Titolo']."' AND Path = '".$_POST['Immagine_composizione']."'";
            $album_res = mysqli_query($conn, $query_album);
            if(!($album_res->num_rows>0))
            {
                $query_album = "INSERT INTO album (Nome, Path)  VALUES ('".$_POST['Titolo']."', '".$_POST['Immagine_composizione']."')";
                $album_res = mysqli_query($conn, $query_album);
            }
            $query_album = "SELECT * FROM album WHERE Nome = '".$_POST['Titolo']."' AND Path = '".$_POST['Immagine_composizione']."'";
            $album_res = mysqli_query($conn, $query_album);
            $albumid = mysqli_fetch_object($album_res)->ID;
        }

        $query_user = "SELECT ID FROM users WHERE Username  = '".$_SESSION['username']."'";
        $user_res = mysqli_query($conn, $query_user);
        $userid = mysqli_fetch_object($user_res)->ID;
        $query = "INSERT INTO composizioni (NomeComposizione, User, Album) VALUES ('".$_POST['Titolo']."', '".$userid."', '".$albumid."')";
        mysqli_query($conn, $query);
        $query = "SELECT ID FROM composizioni WHERE NomeComposizione = '".$_POST['Titolo']."' AND User ='". $userid."' AND Album = '".$albumid."'";
        $res = mysqli_query($conn, $query);
        $id = mysqli_fetch_object($res)->ID;
        for($i = 1; $i < 29; $i++)
        {
            $items_url = [];
            if(isset($_POST["hex".$i]) && ($_POST["hex".$i] !== "" || $_POST["hex".$i] !== "none"))
            {
                $pos = strpos($_POST["hex".$i], '/14.7.1');
                $hex_url = "..".substr($_POST["hex".$i], $pos, -2);
                $j = 1;
                for(; $j < 4; $j++){
                    if(isset($_POST["item".$i."-".$j]) && $_POST["item".$i."-".$j] !== "null"){
                        $pos_item = strpos($_POST["item".$i."-".$j], '/14.7.1');
                        $items_url[$j-1] = "..".substr($_POST["item".$i."-".$j], $pos_item);
                    }
                    else if(isset($_POST["item".$i."-".$j]) && $_POST["item".$i."-".$j] === "null")    $items_url[$j-1] = null;
                }
                $query = "INSERT INTO campionicomposizione (IDcomposizione, CampioneComp, Hexagon, Item1, Item2, Item3)
                VALUES ($id, '$hex_url', $i, '$items_url[0]', '$items_url[1]', '$items_url[2]')";
                $res = mysqli_query($conn, $query);
            }
        }
        mysqli_close($conn);
    }

?>