#pragma strict
/*
This script can:
	* Dislay a list of colors that you can use to change your clothes' materials.
	* Scroll through all of the colors with left and right buttons or just by clicking through in one direction.

*** THE BUTTON BOOLEAN ***
If the 'button' boolean is true, the script will assume that it is attached to one button which will scroll through all
possible materials. If the 'button' boolean is false, this script assumes that it is attached to a gameObject with 
a *SCROLL VIEW* component. Set the 'contentHolder' variable to 'contents', which will be created automatically when the
scroll view component is created. The name 'contents' is arbitrary.

Best used with a ColorButton prefab with a ColorButton script. 
*/

//public var isButton : boolean;
public var buttonPrefab : GameObject;
@HideInInspector
public var currentMaterial : Material;
public var contentHolder : Transform;
public var audioController : AudioController;

public var eggParts : List.<GameObject>; // This only needs to be set if we're changing the color of an egg.
public var chickenStats : ChickenStats; // This only needs to be set if we're changing the color of an egg.
public var priceText : UI.Text; // This only needs to be set if we're changing the color of an egg.

public enum ColorType{
	CLOTHES,
	EGG
}
public var colorType : ColorType = ColorType.CLOTHES;

// Our position in the References list
private var num : int;

// Spawn all color buttons.
function Start(){
	for (var i : int; i < References.colors.Count; i++){

		// Create the button
		var newButton : GameObject = Instantiate(buttonPrefab, Vector3.zero, Quaternion.identity);

		// Set the color that the button will set
		newButton.GetComponent(ColorButton).buttonNum = i;

		if (colorType == ColorType.EGG){
			// Set Button
			newButton.GetComponent(ColorButton).eggParts = eggParts;
			newButton.GetComponent(ColorButton).chickenStats = chickenStats;
			newButton.GetComponent(ColorButton).priceText = priceText;
		}

		// Set the audio controller
		newButton.GetComponent(ColorButton).audioController = audioController;

		// Set the parent of the new button to the viewport
		newButton.transform.SetParent(contentHolder, false);
	}
}


/*
function ColorScroll (direction : int){
	//'direction' will either be 1 or -1
	// Set the list's boundaries.
	num += direction;
	if (num < 0){num = References.colors.Count;}
	else if (num >= References.colors.Count){num = 0;}
	currentMaterial = References.colors[num];

	chickenOutfit.GetClothes(MenuNavigation.selectedChicken.transform, MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken.age);
	chickenOutfit.SetClothesColor(ItemSpawner.itemType, num, MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken);
}
*/
/*
function HideUI(){
		if (ItemSpawner.itemType == "Food" || ItemSpawner.itemType == "Clothes" || ItemSpawner.itemType == "Glasses"){
			if (isButton){
				GetComponent(UI.Button).interactable = false;
				transform.GetChild(0).GetComponent(UI.Image).color.a = .5;
			} // If we're not a button, we're a scrolling viewport
			else{
				transform.GetChild(0).gameObject.SetActive(false);
			}
		}
		// Otherwise, show the color UI.
		else{
			if (isButton){
				GetComponent(UI.Button).interactable = true;
				transform.GetChild(0).GetComponent(UI.Image).color.a = 1;
			}
			else{
				transform.GetChild(0).gameObject.SetActive(true);
			}
		}
}
*/