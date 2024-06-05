<?php
    session_start();
    if(isset($_SESSION["username"]))
    {
        // Vai alla home
        header("Location: ../html/home.html");
        exit;
    }
    $conn = mysqli_connect("localhost", "root", "", "web_site_test");
    if(isset($_POST["USER"]) && isset($_POST["PW"]))
    {
        $username_query = mysqli_real_escape_string($conn, $_POST["USER"]);
        $pw_query = mysqli_real_escape_string($conn, $_POST["PW"]);
        $query = "SELECT * FROM users WHERE Username = '".$username_query."'";
        $res = mysqli_query($conn, $query);
        if($row = mysqli_fetch_assoc($res))
        {
            if(password_verify($pw_query, $row['Password']))
            {
                $_SESSION["username"] = $row['Username'];
                header("Location: ../html/home.html");
                exit;
            }
        }      
        else    $errore = true;
        mysqli_free_result($res);
        mysqli_close($conn);
    }
?>
<!DOCTYPE html>
<html>
<head>
    <title>TFTactics</title>
    <link rel="stylesheet" href="../css/body_navbar.css" type="text/css">
    <link rel="stylesheet" href="../css/login.css" type="text/css">
    <script src="../js/login.js" defer></script> 
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Encode+Sans:wght@100..900&display=swap');
    </style>
</head>

<body>
    <div id="bg">
        <form name="log-form" method="post"> 
            <h1>Login</h1>
            <?php
            if(isset($errore))
                {
                    echo "<p class='errore'>";
                    echo "Credenziali non valide, riprova.";
                    echo "</p>";
                }
            ?>
            <div id="form-container">
                <div class="info"><label for="USER">Username</label><input type="text" id="USER" name="USER" required></div>
                <div class="info"><label for="PW">Password</label><input type="password" id="PW" name="PW" required></div>
                <input id="submit" type="submit" name="Accedi" value="Accedi">
            </div>
            <p>Non hai un account? <a href="../php/registration.php">Registrati</a></p>
        </form>
    </div>    
</body>
</html>