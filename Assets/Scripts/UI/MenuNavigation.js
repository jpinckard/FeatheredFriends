#pragma strict
/*
This script doesn't do much; it's used by DragAndPet to turn on the box menu.
*/
private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);

// The chicken we currently have selected. I need this so I can change its clothes from a separate UI.
static var selectedChicken : GameObject;
static var dest : String = "ChickenBoxManager";

@HideInInspector
public var boxDistance : float; // This is used in DragAndPet

public var panels : List.<GameObject>;
public var nameInput : NameInput;

function ShowMenu(panelName : String){
	for (var i : int; i < panels.Count; i++){
		if (panels[i].name.Contains(panelName)){
			panels[i].SetActive(true);
			dest = panels[i].name;
			// Update name text
			if(nameInput){nameInput.SetText(MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken.name);}
		}
		else{panels[i].SetActive(false);}
	}
}