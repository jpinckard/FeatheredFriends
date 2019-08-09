#pragma strict
/*
This script is used to unlock colors through scores in a minigame. It is meant to be for general use.
Every unlockable material is associated with a score that will unlock it!
*/
public var unlockableColors : List.<Material> = List.<Material>();

//Get the next available color to unlock
public function GetNextColor(){
	for (var i : int; i < unlockableColors.Count; i++){
		if (PlayerPrefs.GetString(unlockableColors[i].name) == "Locked"){
			return unlockableColors[i];
		}
	}
	return null;
}