
var textdata = [];
var textformat = {};

BrowserDetect.init();

switch(BrowserDetect.Language)
{
	/*
	case "it":
		textdata[0] = "ORDA DI NEMICI ";
		textdata[1] = "Per avviare il gioco toccate lo schermo";
		textdata[2] = "Passate in modalità schermo intero";
		textdata[3] = "GAME OVER";
		textdata[4] = "Bentornato, pilota!";
		textdata[5] = "La Terra Vi da il benvenuto!";
		textdata[6] = " Rimangono miglia alla terra";
		textdata[7] = " Siete a miglia da casa";
		textdata[8] = "LIVELLO SUPERATO";
		textdata[9] = "Enter your name";
		textformat.thousandseparator = ".";
		break;
	case "de":
		textdata[0] = "Feindeswelle ";
		textdata[1] = "Um mit dem Spiel zu beginnen, berühren Sie den Bildschirm.";
		textdata[2] = "Schalten Sie in den Portraitmodus um.";
		textdata[3] = "Game Over!";
		textdata[4] = "Herzlich willkommen zurück, Pilot!";
		textdata[5] = "Die Erde begrüsst Sie!";
		textdata[6] = " Bis zur Erde sind es noch meilen.";
		textdata[7] = " Sie befinden sich noch meilen von daheim.";
		textdata[8] = "Der Level wurde absolviert.";
		textdata[9] = "Enter your name";
		textformat.thousandseparator = ".";
		break;
	case "fr":
		textdata[0] = "VAGUE D’ENNEMIS ";
		textdata[1] = "Pour commencer le jeu toucher l’écran";
		textdata[2] = "Passer au mode portrait";
		textdata[3] = "JEU FINI";
		textdata[4] = "Bon retour, pilote!";
		textdata[5] = "La Terre Vous salue!";
		textdata[6] = " miles Vous séparent de la Terre";
		textdata[7] = " Vous êtes à miles de chez vous";
		textdata[8] = "NIVEAU PRIS";
		textdata[9] = "Enter your name";
		textformat.thousandseparator = ".";
		break;
	case "ru":
		textdata[0] = "ВОЛНА ";
		textdata[1] = "Коснитесь экрана, чтобы начать игру";
		textdata[2] = "Пожалуйста, поверните экран";
		textdata[3] = "GAME OVER";
		textdata[4] = "Добро пожаловать, пилот!";
		textdata[5] = "Приветствуем тебя на Земле!";
		textdata[6] = " км до Земли";
		textdata[7] = " км от дома";
		textdata[8] = "LEVEL COMPLETE";
		textdata[9] = "Enter your name";
		textformat.thousandseparator = ".";
		break;
		*/
	default:
		textdata[0] = "LEVEL ";
		textdata[1] = "Tap Screen To Play";
		textdata[2] = "Switch to portrait mode";
		textdata[3] = "GAME OVER";
		textdata[4] = "Welcome home, pilot.";
		textdata[5] = "Planet Earth salutes you.";
		textdata[6] = "Miles to Earth = ";
		textdata[7] = "Miles from home = ";
		textdata[8] = "LEVEL COMPLETE";
		textdata[9] = "Enter your name";
		textformat.thousandseparator = ",";
		break;
}