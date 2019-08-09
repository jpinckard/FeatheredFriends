#pragma strict
/*
This script monitors the chicken's appearance.
It keeps up with the chicken's displayed models, materials, meshes, and everything!
Attach it to a Chicken object to make it work.

It can spawn any chicken. By default, it spawns the chicken stats attached to the same gameObject,
but if you check the bool 'GetSelectedChicken', it will spawn the selected chicken instead.
*/

///////////////////
// REWRITE NOTES //
/*
Clothing needs to be saved to the chicken.
*/

public var chickenStats : ChickenStats;
public var clothesSpawner : ClothesSpawner;

////////////////////
// CHICKEN MODELS //
public var hen : GameObject;
public var chick : GameObject;
public var egg : GameObject;

////////////////////
// MESH LOCATIONS //
public var featherParts : List.<GameObject> = List.<GameObject>();
public var beakParts : List.<GameObject> = List.<GameObject>();
public var combParts : List.<GameObject> = List.<GameObject>();
public var eggParts : List.<GameObject> = List.<GameObject>();
public var eyes : List.<GameObject> = List.<GameObject>();

public var comb : GameObject;
public var wattle : GameObject;
public var cheeks : List.<GameObject> = List.<GameObject>();
public var tail : List.<GameObject> = List.<GameObject>();
public var beak : List.<GameObject> = List.<GameObject>();

////////////////////
///// CLOTHING /////

public var hatList : List.<GameObject> = List.<GameObject>();
public var glassesList : List.<GameObject> = List.<GameObject>();
public var necklaceList : List.<GameObject> = List.<GameObject>();
public var shoesList : List.<GameObject> = List.<GameObject>();
@HideInInspector
public var hat : List.<GameObject>;
@HideInInspector
public var glasses : List.<GameObject>;
@HideInInspector
public var necklace : List.<GameObject>;
@HideInInspector
public var shoes : List.<GameObject>;

// Get the selected chicken
public var GetSelectedChicken : boolean = false;

function Start(){

	if(chickenStats.chicken.age > 2){chickenStats.chicken.age = 2;}

	clothesSpawner.SpawnClothes();

	if (GetSelectedChicken){chickenStats.chicken = SaveChickens.GetChicken("Selected", chickenStats.chicken);}

	SetChickenAgeModel();
	SetEyes();
	SetOutfit();
	SetMeshes();
	SetModelMaterials();
}

// Change all clothing articles to those in ChickenStats.
function SetOutfit(){
	if (chickenStats.chicken.hat){ChangeClothes(References.GetElementByName(References.hats, chickenStats.chicken.hat), "Hats");}
	if (chickenStats.chicken.glasses){ChangeClothes(References.GetElementByName(References.glasses, chickenStats.chicken.glasses), "Glasses");}
	if (chickenStats.chicken.shoes){ChangeClothes(References.GetElementByName(References.shoes, chickenStats.chicken.shoes),"Shoes");}
	if (chickenStats.chicken.necklace){ChangeClothes(References.GetElementByName(References.necklaces, chickenStats.chicken.necklace),"Necklaces");}
}

function SetModelMaterials(){
	// If the chicken has a crest, set its comb color to its feather color.
	if (chickenStats.chicken.comb.Contains("Crest")){chickenStats.chicken.combColor = chickenStats.chicken.featherColor;}
	// Set Model Materials
	SetModelsToMaterial(eyes, 			References.colors[References.GetColorByName(chickenStats.chicken.eyeColor)]);
	SetModelsToMaterial(featherParts,   References.colors[References.GetColorByName(chickenStats.chicken.featherColor)]);
	SetModelsToMaterial(beakParts,		References.colors[References.GetColorByName(chickenStats.chicken.beakColor)]);
	SetModelsToMaterial(combParts, 		References.colors[References.GetColorByName(chickenStats.chicken.combColor)]);
}

function SetEyes(){
	// Give the chicken light eyes if it has a dark shade
	if (chickenStats.chicken.featherColor == "Gray3"){chickenStats.chicken.eyeColor = "Gray1";}
	else{chickenStats.chicken.eyeColor = "Gray3";}
}

function ChangeClothes(clothes : int, itemType : String){
	switch (itemType){
		case "Hats":
			hat = SetClothes(References.hats[clothes], hatList, itemType, References.colors[References.GetColorByName(chickenStats.chicken.hatColor)]);
			chickenStats.chicken.hat = hat[0].name;
			break;
		case "Glasses":
			glasses = SetClothes(References.glasses[clothes], glassesList, itemType, References.colors[References.GetColorByName(chickenStats.chicken.glassesColor)]);
			chickenStats.chicken.glasses = glasses[0].name;
			break;
		case "Necklaces":
			necklace = SetClothes(References.necklaces[clothes], necklaceList, itemType, References.colors[References.GetColorByName(chickenStats.chicken.necklaceColor)]);
			chickenStats.chicken.necklace = necklace[0].name;
			break;
		case "Shoes":
			shoes = SetClothes(References.shoes[clothes], shoesList, itemType, References.colors[References.GetColorByName(chickenStats.chicken.shoesColor)]);
			chickenStats.chicken.shoes = shoes[0].name;
			break;
	}
}

// This script toggles the active articles of clothing in a pool of gameobjects.
function SetClothes(clothes : GameObject, clothesList : List.<GameObject>, itemType : String, material : Material){

	var returnClothesList : List.<GameObject> = List.<GameObject>();

	for (var i : int; i < clothesList.Count; i++){
		// If we've found a piece of clothing to turn on,
		if (clothesList[i].name == clothes.name){
			// Activate it
			clothesList[i].SetActive(true);
			// And add it to the list of cltohes of its type.
			returnClothesList.Add(clothesList[i]);
			// Set its color.
			SetClothesToMaterial(clothesList, material);
		}
		// If we're not setting the clothing, deactivate it.
		else{clothesList[i].SetActive(false);}
	}

	if (itemType.Contains("Hat") && !clothes.GetComponent(Item).showComb){
		// Toggle visibility of the comb.
		comb.SetActive(clothes.name.Contains("Remove"));
	}
	return returnClothesList;
}

function SetClothesToMaterial(clothes : List.<GameObject>, material : Material){
	// Change the color of every item in the list.
	for (var i : int; i < clothes.Count; i++){
		// Change the color of the primary article of clothing.
		if (!clothes[i].name.Contains("Remove") && clothes != glassesList){clothes[i].transform.Find("Primary").GetComponent(Renderer).sharedMaterial = material;}
	}
}

function SetModelsToMaterial(models : List.<GameObject>, material : Material){
	for (var i : int; i < models.Count; i++){
		models[i].transform.GetComponent(Renderer).sharedMaterial = material;
	}
}

function SetChickenAgeModel(){
	// Disable the innappropriate models, leaving the correct one active.
	switch(chickenStats.chicken.age){
		case 0:
			chick.SetActive(false);
			hen.SetActive(false);
			break;
		case 1:
			egg.SetActive(false);
			hen.SetActive(false);
			break;
		case 2:
			chick.SetActive(false);
			egg.SetActive(false);
			break;
	}
}

function SetMeshes(){
	// Otherwise, set all the comb parts to be active.
	for (var i : int =0 ; i < combParts.Count; i++){combParts[i].GetComponent(MeshFilter).sharedMesh = References.GetMeshByName(References.combs, chickenStats.chicken.comb);}
	for (i=0; i < beak.Count; i++){beak[i].GetComponent(MeshFilter).sharedMesh = References.GetMeshByName(References.beaks, chickenStats.chicken.beak);}
	for (i=0; i < tail.Count; i++){tail[i].GetComponent(MeshFilter).sharedMesh = References.GetMeshByName(References.tails, chickenStats.chicken.tail);}

	// USe a different mesh for wattles if you have certain combs.
	if (chickenStats.chicken.comb.Contains("CombOver")){wattle.GetComponent(MeshFilter).sharedMesh = References.GetMeshByName(References.combs, "CombChicken");}
	else if (chickenStats.chicken.comb.Contains("CrestSides")){
		wattle.GetComponent(MeshFilter).sharedMesh = References.crestSidesWattle;
		wattle.SetActive(true);

	}
	// If we have a crest, enable cheeks and disable the wattle.
	else if (chickenStats.chicken.comb.Contains("Crest")){
		// Enable Cheeks!
		for (i=0; i < cheeks.Count; i++){cheeks[i].SetActive(true);}
		// Disable Wattle...
		wattle.SetActive(false);
	}
	else if (chickenStats.chicken.beak.Contains("Duck")){wattle.SetActive(false);}
}

@script RequireComponent(ClothesSpawner);