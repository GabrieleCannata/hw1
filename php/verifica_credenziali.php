<?php
    session_start();
    $conn = mysqli_connect("localhost", "root", "", "web_site_test");
    if(isset($_POST["USER"]) && isset($_POST["PW"]) && isset($_POST["MAIL"]))
    {
        $username_query = mysqli_real_escape_string($conn, $_POST["USER"]);
        $pw_query = mysqli_real_escape_string($conn, $_POST["PW"]);
        $mail_query = mysqli_real_escape_string($conn, $_POST["MAIL"]);
        $res = mysqli_query($conn, "SELECT * FROM users WHERE Email = '".$mail_query."'");
        $credenziali_esistenti = false;
        
        if($res->num_rows > 0)
        {
            $credenziali_esistenti = "true";
            $_SESSION['errore'] = true;
        }
        mysqli_free_result($res);
        $res = mysqli_query($conn, "SELECT * FROM users WHERE Username = '".$username_query."'");
        $row = mysqli_fetch_object($res);
        if($res->num_rows > 0)
        {
            $credenziali_esistenti = "true";
            $_SESSION['errore2'] = true;
        }
        else
        {
            $pw_query = password_hash($pw_query, PASSWORD_BCRYPT);
            $query = "INSERT INTO users (Username, Password, Email) VALUES (\"$username_query\", \"$pw_query\", \"$mail_query\")";
            mysqli_query($conn, $query);
            $_SESSION['errore'] = false;
            $_SESSION['errore2'] = false;
            $credenziali_esistenti = "false";
        }
        mysqli_free_result($res);
        mysqli_close($conn);
        echo $credenziali_esistenti;
    }
?>
