#pragma strict

// If an object is being moved by the user, we don't want the scroll rect to move.
public var dragging = false;
public var scrollRect = true;
public var scrollRectChickenBoxes : UnityEngine.UI.ScrollRect;
public var scrollRectShop : UnityEngine.UI.ScrollRect;

function Update(){
	if (scrollRect){
		scrollRectChickenBoxes.enabled = !dragging ;
		scrollRectShop.enabled = !dragging;
	}
	else if (scrollRectChickenBoxes.enabled){
		scrollRectChickenBoxes.enabled = false;
		scrollRectShop.enabled = false;
	}
}

// used in food button
function TogglePet(bool : boolean){DragAndPet.allowPet = bool;}