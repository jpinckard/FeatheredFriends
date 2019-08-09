#pragma strict
/*
It determines the first, second, and third place winners. Currently, the winner is determined by the order in which the racers collide with the trigger to which this script should be attached.
This works for races. However, another type of competition will likely need slightly different code, so this will need to be updated!
*/

public var audioController : AudioController;
public var popupLayout : PopupLayout;

// UI Elements
public var winCanvas : GameObject;
public var titleText : UI.Text;
public var descriptionText : UI.Text;
public var moneyImage : Sprite;
public var hideUI : GameObject;
public var unlockableIcon : UI.Image;

// Camera Follow
public var cameraFollowPlayer : CameraFollowChicken;
public var cameraPodiumSpot : Transform;
public var cameraAnimator : Animator;

// Winner Variables
public var podiumSpot : List.<Transform> = List.<Transform>(); // The spots on the podium at which the racers will stand. It's important that these are in order!
private var winners : List.<Chicken> = List.<Chicken>(); // The racers who have crossed the finish line

// All of the chickens competing in the race.
public var racers : List.<GameObject> = List.<GameObject>();

//// PRIZES ////
private var prizeType : String;
private var prize : GameObject;

// If the Player won.
static var win : boolean;

function Start(){win = false;}

function OnTriggerEnter(other : Collider){
	// A chicken has crossed the finish line!
	if (other.tag == "Chicken"){
		// Determine the place of the chicken who crossed the finish line
		switch (winners.Count){
			case 0:
				winners.Add(SetWinner(other.gameObject, "Idle", "FIRST PLACE", "Congratulations, you won!", audioController.trumpetFanfare));
				break;
			case 1:
				winners.Add(SetWinner(other.gameObject, "Idle", "SECOND PLACE", "You got second place. Try training your chicken for speed!", audioController.lose));
				break;
			case 2:
				winners.Add(SetWinner(other.gameObject, "Sad", "THIRD PLACE", "You got third place. Try training your chicken for speed!", audioController.lose));
		}
	}

}

function SetWinner(racer : GameObject, animParameter : String, place : String, description : String, clip : AudioClip){
	// Set the racer to move to the spawnpoint
	racer.GetComponent(CompetitionRaceRun).spawnpoint = podiumSpot[0];
	// Set the racer's animation
	racer.GetComponent(CompetitionRaceRun).animParameter = animParameter;
	// Remove the podium spawnpoint from the list - it's no longer available
	podiumSpot.Remove(podiumSpot[0]);
	// Remove the racer from the list, he's no longer racing
	racers.Remove(racer);

	// The player's win condition.
	if (racer.name == "Player"){	
		// Hide some UI elements
		hideUI.SetActive(false);

		// If there are no current winners, then the player won.
		if (winners.Count == 0){win = true;}

		// Play a sound effect
		audioController.PlaySound(clip);

		// Play music
		audioController.musicSource.clip = audioController.raceOverSong;
		audioController.musicSource.Play();

		// Set the UI text
		titleText.text = place;
		descriptionText.text = description;

		// Zoom the camera to the podium.
		cameraFollowPlayer.zoom = true;
		cameraFollowPlayer.object = cameraPodiumSpot;
		cameraAnimator.SetTrigger("PodiumDisplay");

		// Stop the muuuuuusic!
		audioController.musicSource.clip = null;

		// Send all other racers to the podium
		for (var i : int; i < racers.Count; i++){
			racers[i].GetComponent(CompetitionRaceRun).spawnpoint = podiumSpot[i];
		}
	}
	return racer.GetComponent(ChickenStats).chicken;
}

function Win(){
	// If this is the first time the player has won the level
	if (win && !PlayerPrefs.GetString("CompetitionRaceWon" + (parseInt(ChooseLevel.difficultyLevel)).ToString())){

		prize = ChooseLevel.prize;
		prizeType = ChooseLevel.prizeType;

		///////////////////
		//// ADD PRIZE ////
		// Increase food in inventory
		if (prizeType.Contains("Food")){PlayerPrefs.SetInt((prizeType + prize.name), PlayerPrefs.GetInt(prizeType + prize.name) + 1);}
		// OR increase money
		else if (prizeType.Contains("Money")){PlayerPrefs.SetInt("Buttons", PlayerPrefs.GetInt("Buttons") + parseInt(prizeType.Replace("Money","")));}
		// OR add material to inventory
		else if (prizeType.Contains("Material")){References.UnlockColor(References.colors[References.GetColorByName(prizeType.Replace("Material",""))]);}
		// Add clothing to inventory and unlock it.
		else{PlayerPrefs.SetString(prizeType + prize.name, "Purchased");PlayerPrefs.SetString(prize.name, "Unlocked");}

		//////////////////////////
		//// LEVEL MANAGEMENT ////
		// Set level as won
		PlayerPrefs.SetString("CompetitionRaceWon" + (parseInt(ChooseLevel.difficultyLevel)).ToString(), "Won");
		// Unlock next level
		PlayerPrefs.SetString("CompetitionRaceUnlocked" + (parseInt(ChooseLevel.difficultyLevel) + 1).ToString(), "Unlocked");

		///////////////////
		//// INTERFACE ////
		// Show popup canvas
		popupLayout.EnableLayout("ItemDisplay");

		// Display money
		if (prizeType.Contains("Money")){popupLayout.DisplayItem((moneyImage), "Congratulations, you won $" + prizeType.Replace("Money","") + "\nand unlocked the next level!");}
		// Display material
		else if (prizeType.Contains("Material")){
			// Get color icon
			ColorButton.GetColorIcon(References.colors[References.GetColorByName(prizeType.Replace("Material",""))], unlockableIcon);
			// Display icon and text
			popupLayout.DisplayItem(unlockableIcon.sprite, "Congratulations, you unlocked the new color " + prizeType.Replace("Material","") + "\nand unlocked the next level!");}
		// Display prize
		else{popupLayout.DisplayItem(prize.GetComponent(UI.Image).sprite, "Congratulations, you won the " + prize.name + "\nand unlocked the next level!");}
	}
	else{
		// Show the popup panel for a generic win.
		winCanvas.SetActive(true);
	}
}