<?php
    session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <title>TFTactics</title>
    <link rel="stylesheet" href="../css/login.css" type="text/css">
    <link rel="stylesheet" href="../css/body_navbar.css" type="text/css">
    <script src="../js/registration.js" defer></script> 
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Encode+Sans:wght@100..900&display=swap');
    </style>
</head>

<body>
    <div id="bg">
        <form name="log-form" method="post"> 
            <h1>Registration</h1>
            <?php
                if(isset($_SESSION['errore']) && $_SESSION['errore'])
                {
                    echo "<p class='errore'>";
                    echo "L'Email inserita è già associata ad un account. Usa una mail diversa.";
                    echo "</p>";
                }
                if(isset($_SESSION['errore2']) && $_SESSION['errore2'])
                {
                    echo "<p class='errore'>";
                    echo "L'Username scelto è già associato ad un account. Scegli un altro Username.";
                    echo "</p>";
                }
            ?>
            <div id="form-container">
                <div class="info"><label for="USER">Username</label><input type="text" id="USER" name="USER" required></label></div>
                <div class="info"><label for="PW">Password</label><input type="password" id="PW" name="PW" required></label></div>
                <div class="info"><label for="MAIL">Email</label><input type="text" id="MAIL" name="MAIL" required></label></div>
                <input id="submit" type="submit" name="Registrati" value="Salva">
            </div>
        </form>
            <p id="accedi">Hai già un account? <a href="../php/index.php">Accedi</a></p>
        <div id="credenziali">
            <p>La password scelta deve soddisfare i seguenti requisiti:</p>
            <ul id="credenziali">
                <li>Lunghezza minima: 8 caratteri</li>
                <li>Deve contenere almeno una lettera maiuscola</li>
                <li>Deve contenere almeno un numero ed un carattere speciale</li>
            </ul>
        </div>
    </div>    
</body>
</html>