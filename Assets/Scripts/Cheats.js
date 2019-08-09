#pragma strict
/*
This code manages any cheats or cheat codes within the game.
I guess you could call it.... the cheat code
*/

public var cheater : boolean = false;
public var cheatObjs : List.<GameObject> = List.<GameObject>(); // All of the gameobjects that enable cheating.

function Awake(){
	if (PlayerPrefs.GetString("Cheater") && PlayerPrefs.GetString("Cheater")=="true"){ToggleCheats();}
}

function ToggleCheats(){
	// Set the current cheat state
	cheater = !cheater;
	// Save the current cheat state
	PlayerPrefs.SetString("Cheater", cheater.ToString());
	// Toggle all of the cheat objects
	for (var i : int; i < cheatObjs.Count; i++){cheatObjs[i].SetActive(cheater);}
}