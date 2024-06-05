-- Creazione del database WebSite
CREATE DATABASE WebSite;

-- Uso del database WebSite
USE WebSite;

-- Creazione della tabella Users
CREATE TABLE Users (
    ID INT(11) PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(45) NOT NULL UNIQUE,
    Password VARCHAR(256) NOT NULL,
    Email VARCHAR(319) NOT NULL
);

-- Creazione della tabella Campioni
CREATE TABLE Campioni (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(45),
    Costo INT(11),
    Tratto VARCHAR(45),
    Tratto_secondario VARCHAR(45),
    Tratto_terziario VARCHAR(45),
    Path VARCHAR(200) UNIQUE
);

-- Creazione della tabella Album
CREATE TABLE Album (
    ID INT(11) PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL,
    Path VARCHAR(200) NOT NULL
);

-- Creazione della tabella Composizioni
CREATE TABLE Composizioni (
    ID INT(11) PRIMARY KEY AUTO_INCREMENT,
    NomeComposizione VARCHAR(40) NOT NULL,
    User INT(11) NOT NULL,
    Album INT(11) NOT NULL,
    FOREIGN KEY (User) REFERENCES Users(ID),
    FOREIGN KEY (Album) REFERENCES Album(ID)
);

-- Creazione della tabella CampioniComposizioni
CREATE TABLE CampioniComposizione (
	ID INT PRIMARY KEY AUTO_INCREMENT,
	IDcomposizione INT NOT NULL,
	CampioneComp VARCHAR(200) NOT NULL,
    Hexagon INT(6) NOT NULL,
    Item1 VARCHAR(200),
    Item2 VARCHAR(200),
    Item3 VARCHAR(200),
    FOREIGN KEY (IDcomposizione) REFERENCES Composizioni(ID)
);