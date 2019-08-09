#pragma strict
/*
This script is used to control the breeding feature. It allows the user to put two chickens in the red box.
The chickens will display an animation and, after a set amount of time, create an egg with a combination of their features.
*/
private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);

private var saveChickens : SaveChickens;
saveChickens = GameObject.Find("Main Camera").GetComponent(SaveChickens);

public var chickenSpawner : ChickenSpawner;
chickenSpawner = GameObject.Find("UI Container/ChickenBoxManager/ChickenBoxes").GetComponent(ChickenSpawner);

public var disableOnMaxChickens : DisableOnMaxChickens;

public var popupLayout : PopupLayout;
private var popupDisplayed : boolean = true; // has the popup already been displayed?

/////////////
// PUBLIC ///
public var boxA : Transform;
public var boxB : Transform;
public var breedSpawnSpot : Transform;
public var breedingTimer : UI.Text;

// chicken
private var chicken : List.<Chicken> = List.<Chicken>(); // this list is 1 item long and contains the chicken you bred
private var chickenA : ChickenStats;
private var chickenB : ChickenStats;

////////////
// Colors //
private var featherColor : String;
private var beakColor : String;
private var combColor : String;

////////////
// Meshes //
private var beak : String;
private var comb : String;
private var tail : String;

public var heartsParticles : ParticleSystem;

// Timing Variables
public var breedTime : float = 10f;
private var breedDate : System.DateTime;
private var timePassed : System.TimeSpan;
private var breeding : boolean = false;

function Start(){
	// If there are chickens in the box on startup, then continue breeding where they left off
	if (PlayerPrefs.GetString("BreedDate")!= null){
		DisplayBreeding();
		System.DateTime.TryParse(PlayerPrefs.GetString("BreedDate"), breedDate);
	}
}

function Update(){

	// Get Breeder Chickens
	chickenA = GetBreeder(boxA);
	chickenB = GetBreeder(boxB);

	// If we have a momma and a daddy chicken, and there's no egg, and we don't have too many chickens already
	if (chickenA && chickenB && transform.Find("Box1003/ChickenBox").transform.childCount == 0){
		if (PlayerPrefs.GetInt("TotalChickens") >= chickenSpawner.boxNum){
			if (!popupDisplayed){
				popupLayout.EnableLayout('Info');
				popupLayout.SetText("You can't breed any more chickens. You have too many!");
				popupDisplayed = true;
			}
			StopBreeding();
		}
		else{
			// If the breed date isn't set, set it
			if (!PlayerPrefs.GetString("BreedDate")){GetBreedDate();}
			// Otherwise, start breeding
			Breeding();
		}
	}
	else{StopBreeding();popupDisplayed = false;}
}

function GetBreeder(box : Transform){
	if (box.Find("ChickenBox").transform.childCount >= 1 && box.Find("ChickenBox/chickenHen(Clone)").GetComponent(ChickenStats).chicken.age == 2){
		return box.Find("ChickenBox/chickenHen(Clone)").GetComponent(ChickenStats);
	}
	return null;
}

function Breeding(){
	// Get the time until the chickens are finished breeding
	timePassed = System.DateTime.Now - breedDate;

	// Show the remaining time in the breeding alarm
	breedingTimer.text = (timePassed.Minutes + ":" + timePassed.Seconds).Replace("-", "");

	// If the chickens have finished breeding,
	if (timePassed.TotalSeconds > 0){
		// Create the egg
		BreedChickens();
		// And get the time until the next chicken is hatched.
		GetBreedDate();
	}
}

function StopBreeding(){
	// Cease the breeding process
	heartsParticles.Pause();
	heartsParticles.gameObject.SetActive(false);
	// Reset breeding time
	PlayerPrefs.SetString("BreedDate", null);
	breedingTimer.transform.parent.gameObject.SetActive(false);
}

function GetBreedDate(){
	// Get the time until they chickens complete their breeding
	breedDate = System.DateTime.Now.AddMinutes(breedTime);
	// Save it
	PlayerPrefs.SetString("BreedDate", breedDate.ToString("M/d/yyyy hh:mm:ss tt"));
	// Show both of the chickens happy
	if(chickenA){chickenA.gameObject.GetComponent(ChickenEmotions).Happy();}
	if(chickenB){chickenB.gameObject.GetComponent(ChickenEmotions).Happy();}

	DisplayBreeding();
}

function DisplayBreeding(){
	// Show the breeding timer
	breedingTimer.transform.parent.gameObject.SetActive(true);
	// Show pretty hearts with a particle effect!
	heartsParticles.gameObject.SetActive(true);
	heartsParticles.Play();
}

function BreedChickens(){
	// Update the hatchery button - if we have max chickens, it needs to be disabled.
	disableOnMaxChickens.CheckChickenCount();

	// Create the new chicken's ChickenStats
	var newChicken : Chicken;

	// Play the breeding sound effect
	audioController.PlaySound(audioController.musicBox);

	// Make sure your list is empty
	chicken.Clear();

	// Get the chicken's genetics
	featherColor = ChooseColor(chickenA.chicken.featherColor, chickenB.chicken.featherColor);
	beakColor = ChooseColor(chickenA.chicken.beakColor, chickenB.chicken.beakColor);
	combColor = ChooseColor(chickenA.chicken.combColor, chickenB.chicken.combColor);

	comb = ChooseColor(chickenA.chicken.comb, chickenB.chicken.comb);
	beak = ChooseColor(chickenA.chicken.beak, chickenB.chicken.beak);
	tail = ChooseColor(chickenA.chicken.tail, chickenB.chicken.tail);

	// Give the chicken its properties
	newChicken = new Chicken("", 0, null, featherColor, beakColor, combColor, "Brown3", "", "", "", "", "", "", "", "", 10,  0, 1003, beak, comb, tail, 0, 0);

	// Add the new egg to the list
	chicken.Add(newChicken);

	// Spawn egg
	chickenSpawner.CreateChicken(chickenSpawner.chickenPrefab, chicken);

	// Reset the variables
	chickenA = null;
	chickenB = null;
}

function ChooseColor(colorA : String, colorB : String){
	var colors : List.<String> = List.<String>();
	colors.Add(colorA);
	colors.Add(colorB);
	return colors[Random.Range(0, 2)];
}