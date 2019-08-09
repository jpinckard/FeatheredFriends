#pragma strict
/*
This code allows the user to drag UI elements across the screen.
To use this script, add it to the element you wish to drag. Then, add an 'Event Trigger' component to that object.
Add two new event types : 'OnPointerDown' and 'OnPointerUp', each of which corresponds to a function in this script.

Next, you'll probably want something to drag the object into. Look at the 'Chicken Eat' script for an example of how that would work.

As of version 26 of Chicken Box, this only works with 2d UI elements. To get a version that works with 3D gameObjects, get a script from a previous verison (if available) or edit this.
*/
private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);

private var IsDragging : ToggleDragAndDrop;
IsDragging =  GameObject.FindWithTag("MainCamera").GetComponent(ToggleDragAndDrop);

public var scrollRectPath : String;
// So we can find a different scroll rect every time
@HideInInspector
public var scrollRect : UI.ScrollRect;

public var dragging : boolean = false;
private var originalScale : Vector3;
private var fingerBuffer : float = 50;


function Start(){
	originalScale = transform.localScale;
	// Find the scroll rect that contains our object
	if (GameObject.Find(scrollRectPath)){scrollRect = GameObject.Find(scrollRectPath).GetComponent(UI.ScrollRect);}
	// Only raycast the icon if this script turns on
	gameObject.GetComponent(UI.Image).raycastTarget = true;
}

function Update(){
    if (dragging){DragUI();}
}

function DragUI(){
	gameObject.transform.position = Vector2(Input.mousePosition.x, Input.mousePosition.y + fingerBuffer);;
}

function OnPointerDown(){
	if (gameObject.GetComponent(DragItem).enabled){
		// We're holding the mouse and dragging the item
		if (scrollRect){scrollRect.enabled = false;}
		// Make it bigger
		transform.localScale *= 2;
		IsDragging.dragging = true;
		dragging = true;
		// Play the noise
		audioController.PlaySound(audioController.bloop);
		// Set this as the item to eat
		ChickenEat.item = gameObject;
	}
}

function OnPointerUp(){
	StopDragging();
}

function StopDragging(){
	if (gameObject.GetComponent(DragItem).enabled){
		if (scrollRect){scrollRect.enabled = true;}
		IsDragging.dragging = false;
		// If we were dragging the item,
		if (dragging){
			// We just released it;
		    dragging = false;
			// Put it back where it came from
			transform.localPosition = Vector3.zero;
			// Rescale it
			transform.localScale = originalScale; 
			// Play the noise
	    	audioController.PlaySound(audioController.blop);
	    }
    }
}