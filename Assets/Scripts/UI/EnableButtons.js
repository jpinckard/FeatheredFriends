/*
This script will disable buttons until the chicken is of a certain age.
*/
public var minAge : int = 1;
public var buttons : List.<UI.Button> = List.<UI.Button>();

private var buttonsOn : boolean = false;

function Update(){
	// Toggle clotihng button based on chicken's age
	if (MenuNavigation.selectedChicken && MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken.age <= minAge){
		EnableButtons(false);
	}
	else{
		EnableButtons(true);
	}
}

function EnableButtons(enabled : boolean){
	for (var i : int; i < buttons.Count; i++){buttons[i].interactable = enabled;}
	buttonsOn = enabled;
}