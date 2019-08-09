#pragma strict

private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);

private var saveChickens : SaveChickens;
saveChickens = GameObject.Find("Main Camera").GetComponent(SaveChickens);

private var toggleDrag : ToggleDragAndDrop;
toggleDrag = GameObject.Find("Main Camera").GetComponent(ToggleDragAndDrop);

public var chickenHoverBox : boolean = false;


function OnTriggerEnter(chicken : Collider){
	// If a chicken enters the box and there's not already a chicken in the box and we're dragging the mouse,
	if (chicken.CompareTag("Chicken") && !gameObject.transform.Find("ChickenBox").childCount && toggleDrag.dragging){
		chickenHoverBox = true;
		// Set the chicken's box number to our box number
		chicken.GetComponent(ChickenStats).chicken.box = parseInt(gameObject.name.Replace("Box", ""));
	}
}
function OnTriggerStay(chicken : Collider){

	 // if the chicken is over the box and the player has released the chicken
	if (chicken.CompareTag("Chicken") && chickenHoverBox && !toggleDrag.dragging){

		// Play sound effect
		audioController.PlaySound(audioController.blop);

		// Put it at the spawnspot
		chicken.transform.position = gameObject.transform.Find("SpawnSpot").transform.position;

		// Set the chicken's parent to our box
		chicken.transform.parent = transform.Find("ChickenBox");

		// We're no longer hovering with the chicken
		chickenHoverBox = false;

		// Save changes
		saveChickens.SaveChickens();
	}
}

function OnTriggerExit(chicken : Collider){
	// We're no longer hovering.
	if (chicken.CompareTag("Chicken")){chickenHoverBox = false;}
}