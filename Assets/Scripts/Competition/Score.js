/*
This script displays the score and changes stats accordingly.
*/
public var saveChickens : SaveChickens;
public var audioController : AudioController;

public var statMeter : StatMeter;
public var highScoreText : UI.Text;

function SetHighScore(level : String, score : int){
	// Save High Score //
	if(PlayerPrefs.GetInt(level + "HighScore") < score){
		// Save High Score
		PlayerPrefs.SetInt(level + "HighScore", score);
		// Show High Score Text
		highScoreText.text = "NEW RECORD!\n" + PlayerPrefs.GetInt(level + "HighScore");
		// Play UI sound effect
		audioController.PlaySound(audioController.newRecord);
	}
	else{
		// Set Text
		highScoreText.text = "SCORE: " + score.ToString() + "\nBEST SCORE: " + PlayerPrefs.GetInt(level + "HighScore").ToString();
	}
}

// Set a new speed based on the score
function SetNewSpeed(score : int, chickenStats : ChickenStats){

	// Show new speed on screen
	highScoreText.text += "\nYour chicken's speed has increased by " + (score / 100f) + ".";

	// Adjust chicken's speed
	chickenStats.chicken.speed += (score / 100f);
	saveChickens.SaveStat(chickenStats.chicken.box, "speed", chickenStats.chicken.speed);
	// SetChicken takes a list as a parameter
	var chickenList : List.<Chicken> = List.<Chicken>();
	chickenList.Add(chickenStats.chicken);
	saveChickens.SetChicken(0, "Selected", chickenList);

	// Set Fill Bar
	statMeter.statVal = chickenStats.chicken.speed;
	//animateFillBar.fillBar.fillAmount = racerChicken.speed;
}