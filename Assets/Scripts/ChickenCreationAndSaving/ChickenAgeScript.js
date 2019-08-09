#pragma strict

private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);

private var saveChickens : SaveChickens;
saveChickens = GameObject.Find("Main Camera").GetComponent(SaveChickens);

public  var chickenSpawner : ChickenSpawner;
chickenSpawner = GameObject.FindWithTag("ChickenSpawner").GetComponent(ChickenSpawner);

public  var breedChickens : BreedChickens;
breedChickens = GameObject.Find("UI Container/ChickenBoxManager").GetComponent(BreedChickens);

// our sweet chicken boy
private var chickenStats : Chicken;
chickenStats = gameObject.GetComponent(ChickenStats).chicken;

// Is the chicken still aging?
public var aging : boolean = true;

// The time it takes for the chicken to age in minutes.
private var eggTime : float = .5;
private var chickTime : float = 1;
public var timePassed : System.TimeSpan;

// When the chicken has enough love to change from a chick to a hen.
private var loveTransition : float = 5; 

// The date at which the chicken will transition to a new age
private var transDate : System.DateTime;

public var egg : GameObject;
public var chick : GameObject;
public var hen : GameObject;

public var particleFeathers : ParticleSystem;
public var particleClouds : ParticleSystem;

// The transition markup is a percentage that is added to the price of the chicken when it ages.
private var transitionMarkup : int = 20;

function Start(){

	egg = gameObject.transform.Find("Egg").gameObject;
	chick = gameObject.transform.Find("Chick").gameObject;
	hen = gameObject.transform.Find("Hen").gameObject;

	if (chickenStats.age >= 2){aging = false;}
	else{
		// Get transitiontime from the chickenstats
		if(chickenStats.transitionTime == null && chickenStats.age < 2){GetTransitionTime();}

		System.DateTime.TryParse(chickenStats.transitionTime, transDate);
	}
}

function Update () {
	if(aging && chickenStats.transitionTime != null){ChickenAging();}
}

function GetTransitionTime(){
	if (!chickenStats){chickenStats = gameObject.GetComponent(ChickenStats).chicken;}
	// Get the time at which the chicken will transition to a new age
	// The transitions take longer as it gets older
	if (chickenStats.age == 0){transDate = System.DateTime.Now.AddMinutes(eggTime);}
	if (chickenStats.age == 1){transDate = System.DateTime.Now.AddMinutes(chickTime);}
	chickenStats.transitionTime = transDate.ToString("M/d/yyyy hh:mm:ss tt");
}

function Transition(){
	
	if (chickenStats.age == 0){
		// Hatch from an egg to a chick
		audioController.PlaySound(audioController.success1);
		audioController.PlaySound(audioController.chick);
		chick.SetActive(true);
		egg.GetComponent(Animator).SetTrigger("Hatch");
		chick.GetComponent(Animator).SetTrigger("Hatch");
	}
	else{
		// Turn from a chick into a hen
		audioController.PlaySound(audioController.success2);
		audioController.PlaySound(audioController.chooseLevel);
		hen.SetActive(true);
		gameObject.transform.Find("Chick").GetComponent(Animator).SetTrigger("ChickToHen");
		gameObject.transform.Find("Hen").GetComponent(Animator).SetTrigger("ChickToHen");
		particleFeathers.Play();
		particleClouds.Play();
		aging = false;
	}

	chickenStats.age ++;

	chickenStats.price += transitionMarkup;
	saveChickens.SaveChickens();
}

function ChickenAging(){
	// Get the time that's passed since the transition date
	timePassed = System.DateTime.Now - transDate;
	// If the chicken is still aging and enough time has passed, allow the chicken to transition.
	if (timePassed.TotalSeconds > 0 && (chickenStats.love >= loveTransition || chickenStats.age == 0)){
		Transition();
		GetTransitionTime();
	}
}