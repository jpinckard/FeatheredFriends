#pragma strict
/*
This script will cause its chicken to trip occasionally.
It's used for competitions in conjunctin with a cheer meter;
cheer too much, and there will be negative consequences on
your burnt-out chicken. Cheer too little, and he won't move!
*/

private var controller : CharacterController;
controller = GetComponent.<CharacterController>();

private var chickenBlink : ChickenBlink;
chickenBlink = GetComponent(ChickenBlink);

public var audioController : AudioController;

private var anim : Animator;

// Average Time between tripping
private var tripTime : float = 10f;
private var tripStayTime : float = 2f; // Average time to stay tripped. Chicken will stay tripepd a number between tripStayTime and 2x tripStayTime.
private var tripTimer : float;

function Start () {
	// Get animator
	anim = References.GetAnimator(gameObject);
	// Reset the trip timer
	//ResetTripTimer();
}

function Update () {
	// If we've not yet tripped and the timer has counted down, trip.
	//if (controller.enabled && Time.time % tripTimer < .1 && Time.time > 1){Trip();}
}

// Trip the chicken over! 'trip' is true if you're tripping and false if you're untripping.
function Trip(){
	// Play noise
	audioController.PlaySound(audioController.trip);
	// Close eyes
	chickenBlink.EyeToggle(true);
	// Animate
	anim.SetBool("Trip", true);
	// Pause chicken
	controller.enabled = false;

	// wait for however long you want the trip to last.
	yield WaitForSeconds(Random.Range(tripStayTime, tripStayTime + (tripStayTime /2))); 

	// Open eyes
	chickenBlink.EyeToggle(false);
	// Animate
	anim.SetBool("Trip", false);
	// Unpause chickens
	controller.enabled = true;

	// Reset the timer.
	//ResetTripTimer();
}

function ResetTripTimer(){
	tripTimer = Random.Range(tripTime - (tripTime / 2), tripTime + (tripTime / 2));
}