#pragma strict

public var saveChickens : SaveChickens;

public var input : UI.InputField;

// Total number of race levels
private var raceLevelCount : int = 9;

function Cash(){
	UnityEngine.Debug.Log("Cash:"+ input.text);
	if (input.text != ""){
		// Set cash to the number in the input field
		PlayerPrefs.SetInt("Buttons", parseInt(input.text));
	}
	else{UnityEngine.Debug.Log("Input is null.");}
}

function ToggleFirstPlay(){
	PlayerPrefs.SetInt("FirstRun", 0);
}

function Save(){saveChickens.SaveChickens();}

function Reset(){
	PlayerPrefs.DeleteAll();
	saveChickens.chickens.Clear();
	saveChickens.chickenObjects.Clear();
}

function MaxCash(){
	PlayerPrefs.SetInt("Buttons", 99999);
}

function AgeChicken(){
	if(MenuNavigation.selectedChicken){MenuNavigation.selectedChicken.GetComponent(ChickenAgeScript).Transition();}
}

function UnlockAllRaceLevels(){
	for (var i : int = 1; i < raceLevelCount; i++){
		PlayerPrefs.SetString("CompetitionRaceUnlocked" + i, "True");
	}
}

function MaxSpeed(){
	if(MenuNavigation.selectedChicken){MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken.speed = 99;}
}

function MaxLove(){
	if(MenuNavigation.selectedChicken){MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken.love = 99;}
}