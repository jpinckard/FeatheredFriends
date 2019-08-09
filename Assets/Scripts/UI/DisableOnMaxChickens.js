#pragma strict
/*
This script has two options : disable the button, or show a popup explaining why you can't do what you're trying to do.
*/
public var chickenSpawner : ChickenSpawner;
public var popupLayout : PopupLayout;
public var changeScene : ChangeScene;

public var disableOnMax : boolean = false;

function Start(){CheckChickenCount();}

function CheckChickenCount(){
	if (disableOnMax){GetComponent(UI.Button).interactable = (PlayerPrefs.GetInt("TotalChickens") < (chickenSpawner.boxNum - 1));}
}

function OnClick(){
	// If we've reached max chickens
	if (PlayerPrefs.GetInt("TotalChickens") > (chickenSpawner.boxNum - 1)){
		popupLayout.EnableLayout('Info');
		popupLayout.SetText("You have too many chickens!\n\nYou can't buy any more chickens until you get rid of some!");
		Debug.Log("Don't Go To Hatchery");
	}
	else{changeScene.ChangeScene("Hatchery");Debug.Log("Chickens:" + PlayerPrefs.GetInt("TotalChickens") + "Boxes:"+(chickenSpawner.boxNum - 1).ToString());}
}

