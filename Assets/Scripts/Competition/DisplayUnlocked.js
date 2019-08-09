#pragma strict
/*
This script is used to display and manage unlockable colors. To be used with UnlockThroughScore.
*/

public var unlockableIcon : UI.Image; // the image where the unlocked item/color is displayed
public var unlockablePreviewIcon : UI.Image; // the image where the unlocked item/color preview is displayed
public var unlockablePreviewText : UI.Text;
public var unlockThroughScore : UnlockThroughScore;

public var unlockCanvas : GameObject;
public var unlockablePreviewCanvas : GameObject;

public var baseScore : int = 100; // A simple score tracker. Score is used to unlock unlockables.


function UnlockColor(score : float, level : String){
	var neededScore : float = baseScore * (PlayerPrefs.GetInt(level+"Unlock#") + 1);
	var color : Material;
	// Get the unlockable color. If it's null, we've already unlocked everything.
	color = unlockThroughScore.GetNextColor();

	// If there is still a color to unlock,
	if (color!= null){
		// Set Image
		ColorButton.GetColorIcon(color, unlockablePreviewIcon);
		// Unlock Color if Racer got to a high enough position
		if (score >= neededScore){
			// Unlock Color
			References.UnlockColor(color);
			// Show Unlocked Item Canvas
			unlockCanvas.SetActive(true);
			// Set Color Icon
			ColorButton.GetColorIcon(color, unlockableIcon);
			// Find the next available color and set the preview to it.
			color = unlockThroughScore.GetNextColor();
			if (color!=null){ColorButton.GetColorIcon(color, unlockablePreviewIcon);}
			else{unlockablePreviewCanvas.SetActive(false);}
			// Iterate the current unlockable #
			PlayerPrefs.SetInt(level + "Unlock#", PlayerPrefs.GetInt(level + "Unlock#") + 1);
			// Update the needed score
			neededScore = baseScore * (PlayerPrefs.GetInt(level + "Unlock#") + 1);
		}
		else{unlockCanvas.SetActive(false);}
		// Set Text
		unlockablePreviewText.text = "Reach a score of " + neededScore.ToString() + " or greater to unlock:";
	}
	else{unlockablePreviewCanvas.SetActive(false);unlockCanvas.SetActive(false);}
}
