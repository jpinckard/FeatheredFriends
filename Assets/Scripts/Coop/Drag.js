#pragma strict
/*
This script is used to drag a chicken parallel to a plane in any view.

NOTES
// This code should go somewhere else!
/*
	// If we're eating, turn us back to face the player
	if ((ItemSpawner.itemType == "Food") && transform.rotation != Quaternion.identity){ // || MenuNavigation.dest == "Clothes"
		transform.rotation = Quaternion.identity;
	}
*/

private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);

private var menuNavigation : MenuNavigation;
menuNavigation = GameObject.FindWithTag("MainCamera").GetComponent(MenuNavigation);

private var cameraZoom : CameraZoom;
cameraZoom = GameObject.FindWithTag("MainCamera").GetComponent(CameraZoom);

private var controller : CharacterController;
controller = gameObject.GetComponent(CharacterController);

public var speed : float = 5;

static var allowDrag : boolean = true;

private var dragging : boolean = false;
private var distance : float;
private var moveDirection : Vector3;
private var plane : Plane = new Plane(Vector3.up, Vector3.zero);

// The time the user has held their touch
private var touchTime : float = 0;
// The time to hold before the chicken will drag
private var dragTime : float = .1;
// Is the user currently holding their mouse down?
private var holdingMouse : boolean = false;

function Update(){
	if(allowDrag){
		if(dragging){DragChicken();}
		if (holdingMouse && !dragging){Debug.Log("Holding");touchTime += Time.deltaTime;}
		StartDragging();
	}
}


function DragChicken(){
	Debug.Log("Dragging");
    var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    var ent : float = 100;
    if (plane.Raycast(ray, ent)){
    	var hitPoint = ray.GetPoint(ent);
    	var offset : Vector3 = hitPoint - transform.position;
        if (offset.magnitude > 1){
			offset = offset.normalized * speed;
			moveDirection = offset;
			// Apply Gravity
			//if (!controller.isGrounded){moveDirection.y = -10;}
			// Move Controller
			controller.Move(moveDirection * Time.deltaTime);
			Debug.DrawRay(ray.origin, ray.direction * ent, Color.green);
        }
	}
}

// Starts the drag event
function StartDragging(){
	// If the user dragged the screen
	if (touchTime > dragTime && !dragging){
		// Boop!
		audioController.PlaySound(audioController.bloop);
		// Get Distance
		distance = Vector3.Distance(transform.position, Camera.main.transform.position);
	    dragging = true;
		touchTime = 0;
		// Face camera
		transform.rotation.y = 233;
	}
}

function OnMouseDown(){
	Debug.Log("Mouse Down!");
	// We're holding the mouse and dragging the chicken.
	holdingMouse = true;
}

function OnMouseUp(){
	MenuNavigation.selectedChicken = gameObject; // TEST! WE SHOULDN'T NEED THIS EVENTUALLy
	// If we tapped, Zoom to the chicken.
	if (touchTime < dragTime){
		Debug.Log("Touch Time: " +touchTime);
       	// Play sound effect
       	audioController.PlaySound(audioController.blopOn);
  		// Select the chicken
		MenuNavigation.selectedChicken = gameObject;
    	// Zoom to the selected box
		CameraZoom.ZoomToPos(Vector3(transform.position.x,  transform.position.y + cameraZoom.yBuffer, transform.position.z + cameraZoom.zBuffer));
		//Camera.main.transform.LookAt(transform.position, Vector3.up);
		allowDrag = false;
		// Show the proper menu
		menuNavigation.ShowMenu("Box");
	}
	dragging = false;
	holdingMouse = false;
}


