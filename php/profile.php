<?php
    session_start();
    if(!isset($_SESSION['username']))   header("Location: ../php/index.php");
?>

<!DOCTYPE html>
<html>
<head>
    <title>TFTactics</title>
    <link rel="stylesheet" href="../css/body_navbar.css" type="text/css">
    <link rel="stylesheet" href="../css/style_team_builder.css" type="text/css">
    <link rel="stylesheet" href="../css/footer.css" type="text/css">
    <link rel="stylesheet" href="../css/profile.css" type="text/css">
    <script src="../js/index.js" defer></script>
    <script src="../js/profile.js" defer></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Encode+Sans:wght@100..900&display=swap');
    </style>
</head>
<body>
    <article>
        <nav id="upperbar">
            <div id="logo">
                <img id="logo" src="../images/index_images/web_icon.jpeg"/>
                <span id="slogo">TFTactics</span>
            </div>  
            <div id="logout"><a href="../php/logout.php">Log out</a></div>
            <div id="navbar-btn"><img src="https://rerollcdn.com/Qwiki/UI/windows-icon.svg" id="btn-icon">Download TFTactics</div>
            <div id="hamburger-box">
                <div class="hamburger"></div>
                <div class="hamburger"></div>
                <div class="hamburger"></div>
            </div>

            <div id="hamburger-box-x" class="hidden">
                <div id="x1" class="hamburger"></div>
                <div id="x2" class="hamburger"></div>
            </div>
        </nav>
        <nav id="navbar">
            <ul>
            <li><a href="../html/team_builder.html" class="navBarSpan">Team Builder</a></li>
            </ul>
        </nav>

        <section>
        <div class="row">
            <div class="container">
                <div id = "modal-four-row" class='hidden'>
                    <div id="board-container">
                        <div id="board">
                            <div id="board-builder">
                                <div id="four-row"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="mobile-menu" class="hidden">
                    <h2 id="mobile-nav">Navigation</h2>
                    <ul>
                        <li class="mobile-link"><a href="./team_builder.html">Team Builder</a></li>
                    </ul>
                </div>
                <h1>Benvenuto <?php echo $_SESSION['username']?>! Ecco le tue squadre preferite</h1>
                <div id="compositions-container"></div>

            </div>
        </div>
        </section>

        <footer>
            <div class="container">
                <div id="foot">
                    <a href="" class="footer-Span">Privacy Policy</a>
                    <a href="" class="footer-Span">Contact</a>
                    <a href="" class="footer-Span">Manage Cookie Settings</a>
                </div>
            </div>
        </footer>
    </article>
</body>
</html>