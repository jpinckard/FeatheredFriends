#pragma strict
public var cheats : Cheats;
public var popupLayout : PopupLayout;

private var saveChickens : SaveChickens;
saveChickens = GameObject.Find("Main Camera").GetComponent(SaveChickens);

public var input : UI.InputField;

public var text : UI.Text;

function NameChicken(){
	MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken.name = input.text;
}

function EnableCheatsByName(){
	if (text.text == "Joybot"){cheats.ToggleCheats();}
}

function SetText(name : String){
	input.text = name;
	text.text = name;
	// If they leave the text blank
	if (text.text == ""){text.text = "Tap to name chicken";}
}