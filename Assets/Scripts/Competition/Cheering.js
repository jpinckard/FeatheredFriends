#pragma strict
public var controller : CompetitionRaceRun;
public var audioController : AudioController;

public var trip : Trip;

public var cheerVal : float;
public var cooldown : float;
public var tripVal : float;
// If you stay towards the max on the cheer counter for a certain amount of time, the trip timer starts counting down.
// If it gets all the way to zero, the chicken will trip!
private var tripTime : float = 2f;
private var tripTimer : float;

////////
// UI //
public var fillImage : UI.Slider;

function Start(){tripTimer = tripTime;}

function Cheer(){
	// Fill up the bar
	fillImage.value += cheerVal;
	// And play a sound effect.
	audioController.PlaySound(audioController.cheer);
}

// Slowly decrease cheerval
function Update(){
	if (controller.controller.isGrounded){
		// Cooldown on cheering
		fillImage.value -= (cooldown * Time.deltaTime);

		// Adjust speed based on fill value
		controller.speed = fillImage.value * (controller.baseSpeed * 2);

		///////////
		// TRIP ///
		// Trip when the timer reaces zer0.
		if (tripTimer < 0){
			trip.Trip();
			tripTimer = tripTime;
		}
		// If we're above the trip threshold,
		else if (fillImage.value > tripVal){
			// Drain the timer.
			tripTimer -= (Time.deltaTime);
		}
		// If we're below the trip threshold, add to the timer.
		else if (tripTimer <= tripTime){tripTimer += (.1 * Time.deltaTime);}
	}
	// If the player is falling,
	else {
		//their speed is equal to their base speed
		controller.speed = controller.baseSpeed;
	}
}