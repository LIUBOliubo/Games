
var textdata = [];

var textformat = {};

BrowserDetect.init();

switch(BrowserDetect.Language)
{
	/*
	case "it":
		textformat.thousandseparator = ".";
		break;
	case "de":
		textformat.thousandseparator = ".";
		break;
	case "fr":
		textformat.thousandseparator = ".";
		break;
	case "ru":
		textformat.thousandseparator = ".";
		break;
		*/
	default:
		textdata[0] = "Get Ready";
		textdata[1] = "touch / fire to start";
		textdata[2] = "Rotate Screen";
		textdata[3] = "Game Over";
		textdata[4] = "X2";
		textdata[5] = "X5";
		textdata[6] = "BONUS";
		textdata[7] = "Stage Complete";
		textdata[8] = "Shots Fired ";
		textdata[9] = "Hit Ratio ";
		textdata[10] = "Bonus ";
		textdata[11] = "Co-Pilot";
		textdata[12] = "Starfigher";
		textdata[13] = "Ace's";
		textdata[14] = "Heroic";
		textdata[15] = "Enter your name";
		textdata[16] = "EXTRA LIFE";
		textdata[17] = "LASERS";
		textformat.thousandseparator = ",";
		break;
}
