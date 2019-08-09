#pragma strict

private var saveChickens : SaveChickens;
saveChickens = GameObject.FindWithTag("MainCamera").GetComponent(SaveChickens);

private var audioController : AudioController;
audioController =  GameObject.FindWithTag("MainCamera").GetComponent(AudioController);

private var menuNavigation : MenuNavigation;
menuNavigation = GameObject.FindWithTag("MainCamera").GetComponent(MenuNavigation);

public var IsDragging : ToggleDragAndDrop;
IsDragging =  GameObject.FindWithTag("MainCamera").GetComponent(ToggleDragAndDrop);

public var chickenSpawner : ChickenSpawner;
chickenSpawner = GameObject.FindWithTag("ChickenSpawner").GetComponent(ChickenSpawner);

private var chickenStats : ChickenStats;
chickenStats = gameObject.GetComponent(ChickenStats);

private var chickenBlink : ChickenBlink;

private var animator : Animator;

static var allowDrag : boolean = true;
static var allowPet : boolean = true; // toggled in ToggleDragAndDrop on the food buttons./

private var dragging : boolean = false;
private var distance : float;
private var originalBox : GameObject; // the box the chicken was originally draged from
private var boxNum : int;
private var boxName : String;


// The time the user has held their touch
private var touchTime : float = 0;
// The time to hold before the chicken will drag
private var dragTime : float = .1;
// Is the user currently holding their mouse down?
private var holdingMouse : boolean = false;

// raises love by 1 after petting for however many seconds loveModifier is set to. 10 seconds for every unit of loveModifier; a value of 3 translates to 30 seconds.
private var loveModifier : float = 3;

function Start(){
	originalBox = transform.parent.gameObject;
	chickenBlink = gameObject.GetComponent(ChickenBlink);
	animator = References.GetAnimator(gameObject);
}

function Update(){
    if (dragging){
        var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        var rayPoint : Vector3 = ray.GetPoint(distance);
        transform.position = rayPoint;

    }

	// Determine how long the player held down the mouse
    if (holdingMouse && !dragging){touchTime += Time.deltaTime;}

	// If the user dragged the screen
	if (touchTime > dragTime && !dragging){
		// If we're not in a box or in the shop, drag the chicken
		if (CameraZoom.dest == Vector3.zero){DragChicken();}
		// If we are in a box, pet the chicken
		else if (MenuNavigation.selectedChicken == gameObject && allowPet){PetChicken();}
		// Reset time screen was touched
		touchTime = 0;
	}
}

function OnMouseDown(){
	// We're holding the mouse and dragging the chicken.
	holdingMouse = true;
	IsDragging.dragging = true;
}

function OnMouseUp(){
	holdingMouse = false;
	IsDragging.dragging = false;

	// If we were dragging the chicken, set the chicken to whatever box is in its chickenStats.
	if (dragging){
		var box : Transform;
		// If the chicken is in a special box,Spawn it via a different path.		 
		if (chickenStats.chicken.box > chickenSpawner.boxes.Count){box = chickenSpawner.specialBoxes[(chickenStats.chicken.box % 1000)];}
		// Otherwise, put it into the normal box.
		else{box = chickenSpawner.boxes[chickenStats.chicken.box];}
		// We are no longer dragging.
	    dragging = false;
    	// Play a sound effect
    	audioController.PlaySound(audioController.blop);
    	// Set position
		transform.position = box.transform.parent.Find("SpawnSpot").transform.position;
		// Set box num
		chickenStats.chicken.box = parseInt(box.transform.parent.name.Replace("Box", ""));
		// Set box as parent
		chickenStats.transform.parent = box;
		// Save
		saveChickens.SaveChickens();
	}

    // The player tapped the chicken and we can drag
    else if (DragAndPet.allowDrag){
       	DragAndPet.allowDrag = false;
       	// Play sound effect
       	audioController.PlaySound(audioController.blopOn);
  		// Select the chicken
		MenuNavigation.selectedChicken = gameObject;
    	// Zoom to the selected box
		CameraZoom.ZoomToPos(Vector3(transform.parent.transform.position.x,  transform.parent.transform.position.y, transform.parent.transform.position.z - menuNavigation.boxDistance));
		// Show the proper menu
		menuNavigation.ShowMenu("Box");
		// Save
		saveChickens.SetSelectedChicken();
	}

	StopPet();

	// Save new stats.
	saveChickens.SaveChickens();

	// Change chicken's eyes to opened
	chickenBlink.EyeToggle(false);
}

function DragChicken(){
    distance = Vector3.Distance(transform.position, Camera.main.transform.position);
    dragging = true;
    originalBox = transform.parent.gameObject;
    // If we're not in the box or the shop, then play the 'boop' noise.
	audioController.PlaySound(audioController.bloop);
}

function PetChicken(){
	// Change chickens eyes to closed
	chickenBlink.EyeToggle(true);

	// Show the hearts particles
	gameObject.GetComponent(ChickenEmotions).loveParticles.Play();

	// pet chicken animation
	// We have to get the animator every time in case the chicken aged.
	animator = References.GetAnimator(gameObject);
	// Run the animation!
	animator.SetBool("Pet", true);

	// Play petting sound
	audioController.LoopSound(audioController.petting, true);

	// Love meter raises
	chickenStats.chicken.love += (Time.deltaTime / loveModifier);
}

function StopPet(){
	// Hide the hearts particles
	gameObject.GetComponent(ChickenEmotions).loveParticles.Stop();

	// stop the pet chicken animation
	animator.SetBool("Pet", false);

	audioController.LoopSound(audioController.petting, false);
}