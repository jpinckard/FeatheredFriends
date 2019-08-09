#pragma strict

import System.Linq;

// A list of the objects holding the chicken stats
public var chickenObjects : List.<GameObject> = List.<GameObject>();
// All of the chicken stats
public var chickens : List.<Chicken> = List.<Chicken>();
// Chickens the player starts the game with
public var defaultChickens : List.<Chicken> = List.<Chicken>();
// Clothes that the player will start out with.
public var defaultClothes : List.<String> = List.<String>();

function Awake(){
	// Give the player some default chickens on a new save.
	if (!PlayerPrefs.GetInt("FirstRun")){DefaultSave();}
	// Summon the chickens
	else{GetChickens();}
}

// Add a chicken to playerprefs
function AddChicken(chicken : Chicken){
	// Add to the number of total chickens
	chickens.Add(chicken);
	SaveChickens();
}

// Saves your chickens when the game is closed
//function OnApplicationQuit(){SaveChickens();}

// We'll need a list of all of the chickens the player currently has and a list of their parameters.
function SaveChickens(){

	// Update the chickens list
	GetChickensFromObjects();

	// Remind PlayerPrefs how many chickens we have
	PlayerPrefs.SetInt("TotalChickens", chickens.Count);

	// For each chicken that we own,
	for (var i = 0; i < chickens.Count; i ++){
		// Set all of the chicken's values in PlayerPrefs.
		SetChicken(i, i.ToString(), chickens);
	}
}

// Get the chickenlist when the game starts
function GetChickens(){
	// For each chicken that we own,
	for (var i : int = 0; i < PlayerPrefs.GetInt("TotalChickens"); i ++){
		// Initialize the new chicken
		var chicken : Chicken = Chicken();

		chicken = GetChicken(i.ToString(), chicken);

		chickens.Add(chicken);
	}
}

static function SetChicken(i : int, variableName : String, chickenList : List.<Chicken>){
	PlayerPrefs.SetString("chicken" + variableName +  "name", chickenList[i].name);
	PlayerPrefs.SetInt("chicken" + variableName +  "age", chickenList[i].age);
	PlayerPrefs.SetString("chicken" + variableName +  "transitionTime", chickenList[i].transitionTime);

	PlayerPrefs.SetString("chicken" + variableName +  "featherColor", chickenList[i].featherColor);
	PlayerPrefs.SetString("chicken" + variableName +  "beakColor", chickenList[i].beakColor);
	PlayerPrefs.SetString("chicken" + variableName +  "combColor", chickenList[i].combColor);
	PlayerPrefs.SetString("chicken" + variableName +  "eyeColor", chickenList[i].eyeColor);

	PlayerPrefs.SetString("chicken" + variableName +  "hat", chickenList[i].hat);
	PlayerPrefs.SetString("chicken" + variableName +  "glasses", chickenList[i].glasses);
	PlayerPrefs.SetString("chicken" + variableName +  "necklace", chickenList[i].necklace);
	PlayerPrefs.SetString("chicken" + variableName +  "shoes", chickenList[i].shoes);

	// Set Color
	PlayerPrefs.SetString("chicken" + variableName +  "HatColor", chickenList[i].hatColor);
	PlayerPrefs.SetString("chicken" + variableName +  "GlassesColor", chickenList[i].glassesColor);
	PlayerPrefs.SetString("chicken" + variableName +  "NecklaceColor", chickenList[i].necklaceColor);
	PlayerPrefs.SetString("chicken" + variableName +  "ShoesColor", chickenList[i].shoesColor);

	PlayerPrefs.SetInt("chicken" + variableName +  "price", chickenList[i].price);
	PlayerPrefs.SetInt("chicken" + variableName +  "hunger", chickenList[i].hunger);
	PlayerPrefs.SetInt("chicken" + variableName +  "box", chickenList[i].box);

	PlayerPrefs.SetString("chicken" + variableName +  "beak", chickenList[i].beak);
	PlayerPrefs.SetString("chicken" + variableName +  "comb", chickenList[i].comb);
	PlayerPrefs.SetString("chicken" + variableName +  "tail", chickenList[i].tail);

	PlayerPrefs.SetFloat("chicken" + variableName +  "love", chickenList[i].love);
	PlayerPrefs.SetFloat("chicken" + variableName +  "speed", chickenList[i].speed);
}

static function GetChicken (variableName : String, chicken : Chicken){
	// Get all of the chicken's values in PlayerPrefs.
	chicken.name = PlayerPrefs.GetString("chicken" + variableName + "name");
	chicken.age = PlayerPrefs.GetInt("chicken" + variableName + "age");
	chicken.transitionTime = PlayerPrefs.GetString("chicken" + variableName + "transitionTime");

	chicken.featherColor = PlayerPrefs.GetString("chicken" + variableName + "featherColor");
	chicken.beakColor = PlayerPrefs.GetString("chicken" + variableName + "beakColor");
	chicken.combColor = PlayerPrefs.GetString("chicken" + variableName + "combColor");
	chicken.eyeColor = PlayerPrefs.GetString("chicken" + variableName + "eyeColor");

	chicken.hat = PlayerPrefs.GetString("chicken" + variableName + "hat");
	chicken.glasses = PlayerPrefs.GetString("chicken" + variableName + "glasses");
	chicken.necklace = PlayerPrefs.GetString("chicken" + variableName + "necklace");
	chicken.shoes = PlayerPrefs.GetString("chicken" + variableName + "shoes");

	chicken.hatColor = PlayerPrefs.GetString("chicken" + variableName +  "HatColor");
	chicken.glassesColor = PlayerPrefs.GetString("chicken" + variableName +  "GlassesColor");
	chicken.necklaceColor = PlayerPrefs.GetString("chicken" + variableName +  "NecklaceColor");
	chicken.shoesColor = PlayerPrefs.GetString("chicken" + variableName +  "ShoesColor");

	chicken.price = PlayerPrefs.GetInt("chicken" + variableName + "price");
	chicken.hunger = PlayerPrefs.GetInt("chicken" + variableName + "hunger");
	chicken.box = PlayerPrefs.GetInt("chicken" + variableName + "box");


	chicken.beak = PlayerPrefs.GetString("chicken" + variableName + "beak");
	chicken.comb = PlayerPrefs.GetString("chicken" + variableName + "comb");
	chicken.tail = PlayerPrefs.GetString("chicken" + variableName + "tail");

	chicken.love = PlayerPrefs.GetFloat("chicken" + variableName + "love");
	chicken.speed = PlayerPrefs.GetFloat("chicken" + variableName + "speed");

	return chicken;
}

function GetChickensFromObjects(){
	chickens.Clear();
	// Add the objects' chickenStats to chickens
	for (var i = 0; i < chickenObjects.Count; i++){
		chickens.Add(chickenObjects[i].GetComponent(ChickenStats).chicken);
	}
}

function DefaultSave(){
	// It's no longer the first run, so toggle the bit
	PlayerPrefs.SetInt("FirstRun", 1);
	// Set them up with some default chickens
	for (var i = 0; i < defaultChickens.Count; i ++){chickens.Add(defaultChickens[i]);}
	// Then set the chickencount in playerprefs.
	PlayerPrefs.SetInt("TotalChickens", defaultChickens.Count);
	// Set the volume options
	PlayerPrefs.SetFloat("SFXVolume", 1);
	PlayerPrefs.SetFloat("MusicVolume", .5);

	// Give the player 10 apples
	PlayerPrefs.SetInt("FoodApple", 10);
	// Give the player 2 pumpkins
	PlayerPrefs.SetInt("FoodPumpkin", 2);
	// Give them default money
	PlayerPrefs.SetInt("Buttons", 100);

	// Lock all locked colors
	for (i = 0; i < References.lockedColors.Count; i ++){PlayerPrefs.SetString(References.lockedColors[i].name, "Locked");}

	// Next, let's start them out with an outfit by setting all the default clothes to 'purchased'.
	for (i =0; i < defaultClothes.Count; i++){PlayerPrefs.SetString(defaultClothes[i], "Purchased");}

}

function SetSelectedChicken(){
	var selectedChicken : List.<Chicken> = List.<Chicken>();
	selectedChicken.Add(MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken);
	// Sets chicken under the variable name chicken999
	SetChicken(0, "Selected", selectedChicken);
}

// This function works for floats.
function SaveStat(boxNum : int, statName : String, statVal : float){
	for (var i : int; i < chickens.Count; i++){
		if (chickens[i].box == boxNum){

			// Change the appropriate  stat
			switch (statName){
				case "speed":
					chickens[i].speed = statVal;
					break;
				case "love":
					chickens[i].love = statVal;
					break;
			}

			// Save changes
			SetChicken(i, i.ToString(), chickens);
		}
	}	
}