<?php
    // Avvia la sessione
    session_start();
    // Elimina la sessione
    session_destroy();
    // Vai alla login
    header("Location: ../php/index.php");
    exit;
?>