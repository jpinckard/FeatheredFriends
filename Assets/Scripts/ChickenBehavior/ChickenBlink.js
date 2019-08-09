#pragma strict

private var chickenStats : ChickenStats;
chickenStats = gameObject.GetComponent(ChickenStats);

private var outfit : Outfit;
outfit = gameObject.GetComponent(Outfit);

// Eye Materials
public var eyeClosed : Material;
public var eyeClosedDark : Material;
public var eyeClosedLight : Material;

public var eyeOpen: Material;
public var eyeOpenDark : Material;
public var eyeOpenLight : Material;

private var blinkTime : float = 4f;
private var blinkTimer : float;
private var blink : boolean = false;
// are the chicken's eyes closed from EyeToggle?
private var keepClosed : boolean = false;

function Start(){
	////// Set the eye color ///////
	// eyes are dark
	if (chickenStats.chicken.featherColor.Contains("3") && !chickenStats.chicken.featherColor.Contains("Yellow")){
		eyeOpen = eyeOpenLight;
		eyeClosed = eyeClosedLight;
	}
	// eyes are light
	else{
		eyeOpen = eyeOpenDark;
		eyeClosed = eyeClosedDark;
	}

	Blink();
	// Blink at a radnom time
	SetBlinkTimer();

}

function Update(){Blink();}

function EyeToggle(eyesClosed : boolean){
	var eyeState : Material;
	
	if (eyesClosed){eyeState = eyeClosed;}
	else{eyeState = eyeOpen;}

	// Set all eyes to the material
	outfit.SetModelsToMaterial(outfit.eyes, eyeState);
	keepClosed = eyesClosed;
}

function Blink(){
	if (Time.time % blinkTimer < .1 && !keepClosed && !blink){
		blink = true;
		EyeToggle(true);
		yield WaitForSeconds(.1); // Blinks last about a tenth of a second.
		EyeToggle(false);
		blink = false;

		SetBlinkTimer();
	}
}

function SetBlinkTimer(){
	blinkTimer = Random.Range(blinkTime -1, blinkTime + 1);
}