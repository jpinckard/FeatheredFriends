#pragma strict
/*
This very specific script spawns a specified number of chicken objects inside of chicken boxes.
It is also responsible for giving chickens their stats.
It is to be attached to a UI object with a layout group attached.
*/

import System.Collections.Generic;
import ChickenClass;

public var saveChickens : SaveChickens;

public var chickenPrefab : GameObject;
public var boxPrefab : GameObject;

private var chickens : List.<Chicken> = List.<Chicken>(); // All of the chickens we must spawn.
public var boxes : List.<Transform> = List.<Transform>();
public var specialBoxes : List.<Transform> = List.<Transform>();


public var boxNum : int = 11;

// The base price for an egg
private var basePrice : int = 100;

function Awake(){
	chickens = saveChickens.chickens;

	// If the boxes have not been manually set in the inspector, create them.
	if (boxes.Count == 0){CreateBoxes();}

	CreateChicken(chickenPrefab, chickens);
}

function SetPrice(color : String){

	var price : int = basePrice;

	// Set price based on color
	if (color.Contains("Brown")){price *= 1;}
	else if (color.Contains("Yellow")){price *= 2;}
	else if (color.Contains("Blue")){price *= 3;}
	else if (color.Contains("Gray")){price *= 4;}
	else if (color.Contains("Teal")){price *= 5;}
	else if (color.Contains("Red")){price *= 6;}
	else if (color.Contains("Green")){price *= 7;}
	else if (color.Contains("Purple")){price *= 8;}
	else if (color.Contains("Special")){price *= 25;}
	else if (color.Contains("Metallic")){price *= 50;}

	// Modify price based on shade
	if (color.Contains("0")){price *= 1.5;}
	if (color.Contains("1")){price *= 1.2;}
	if (color.Contains("2")){price *= 1.1;}
	if (color.Contains("3")){price *= 1.6;}

	return price;
}

function CreateBoxes(){
	for (var i = 0; i < boxNum; i++){
		var newBox : GameObject;
		newBox = Instantiate(boxPrefab, Vector3.zero, Quaternion.identity);
		newBox.transform.SetParent(gameObject.transform);
		newBox.GetComponent(RectTransform).localPosition.z = 0;
		newBox.name = "Box" + i.ToString();
		boxes.Add(newBox.transform.Find("ChickenBox"));
	}
}

function CreateChicken(chick : GameObject, chickenList : List.<Chicken>){

	for (var chicken : int = 0; chicken < chickenList.Count; chicken ++){

		// Create the new chicken
		var newchicken : GameObject;
		var box : Transform;
		newchicken = Instantiate(chick, Vector3.zero, Quaternion.identity);

		// If the chicken is in a special box,Spawn it via a different path.		 
		if (chickenList[chicken].box > boxes.Count){box = specialBoxes[(chickenList[chicken].box % 1000)];}
		// Otherwise, put it into the normal box.
		else{box = boxes[chickenList[chicken].box];}

		// Set box
		newchicken.transform.parent = box;

		// Then, set its position to its spawn point.
		newchicken.transform.position = box.transform.parent.Find("SpawnSpot").transform.position;

		// Now, we give it's personality!
		SetChicken(newchicken, chickenList[chicken]);

		// Finally,we'll add it to our save script.
		saveChickens.chickenObjects.Add(newchicken);
	}
	saveChickens.SaveChickens();
}

function SetChicken(chicken : GameObject, chickenStats : Chicken){
	// Get the actual chicken prefab's container script
	var objectStats : ChickenStats;
	objectStats = chicken.GetComponent(ChickenStats);

	// Set the chicken's price based on its feather color
	chickenStats.price = SetPrice(chickenStats.featherColor);

	// Set chicken variables
	objectStats.chicken = new Chicken(chickenStats.name, chickenStats.age, chickenStats.transitionTime, chickenStats.featherColor, chickenStats.beakColor, chickenStats.combColor, chickenStats.eyeColor, chickenStats.hat, chickenStats.glasses, chickenStats.necklace, chickenStats.shoes, chickenStats.hatColor,chickenStats.glassesColor,chickenStats.necklaceColor,chickenStats.shoesColor, chickenStats.price, chickenStats.hunger, chickenStats.box, chickenStats.beak, chickenStats.comb, chickenStats.tail, chickenStats.love, chickenStats.speed);
}

// Create a list of all empty boxes separated by commas. Used in PurchaseEgg.
function GetEmptyBoxes(){
	PlayerPrefs.SetString("EmptyBoxes", "");
	for (var i = 0; i < boxes.Count; i++){
		if(boxes[i].childCount == 0){
			PlayerPrefs.SetString("EmptyBoxes", PlayerPrefs.GetString("EmptyBoxes") + i + ",");
		}
	}
	if (PlayerPrefs.GetString("EmptyBoxes") == ""){Debug.Log("No Boxes were found!");}
}