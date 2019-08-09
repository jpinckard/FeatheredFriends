/*
This script is for variables, particularly long lists, that need to be kept up with and static between scenes.
It's also a handy place to put static functions!
It's attached to the Controller object, which is not destroyed on scene load.
*/

static var saveChickens : SaveChickens;
public var boxes : List.<Transform> = List.<Transform>(); // This will hold the boxes. It's public because I access it in 'ShopManager'

///////////////////
///// Colors //////
public var iconList : List.<Sprite> = List.<Sprite>(); // So I can set the color icons in the inspector.
public var colorList : List.<Material> = List.<Material>();
public var lockedColorList : List.<Material> = List.<Material>();

static var metallicColors : List.<Material> = List.<Material>(); // All of the possible metallic colors.
static var naturalColors : List.<Material> = List.<Material>(); // All of the natural colors.
static var specialColors : List.<Material> = List.<Material>(); // All of the special colors.
static var colors : List.<Material>; // All of the possible colors a chicken can be.
static var lockedColors : List.<Material> = List.<Material>(); // All of the colors that must be unlocked.
static var colorNames : List.<String> = List.<String>(); // All of the possible color names.
static var colorIcons : List.<Sprite> = List.<Sprite>(); // All of the possible colors a chicken can be.

///////////////////
//// Clothing /////
public var hatsList : List.<GameObject> = List.<GameObject>();
public var necklacesList : List.<GameObject> = List.<GameObject>();
public var glassesList : List.<GameObject> = List.<GameObject>();
public var shoesList : List.<GameObject> = List.<GameObject>();

static var hats : List.<GameObject> = List.<GameObject>();
static var necklaces : List.<GameObject> = List.<GameObject>();
static var glasses : List.<GameObject> = List.<GameObject>();
static var shoes : List.<GameObject> = List.<GameObject>();

public var unlockableClothesList : List.<GameObject> = List.<GameObject>();
static var unlockableClothes : List.<GameObject> = List.<GameObject>();

///////////////////
//// Features /////
public var beaksList : List.<Mesh> = List.<Mesh>();
public var combsList : List.<Mesh> = List.<Mesh>();
public var tailsList : List.<Mesh> = List.<Mesh>();
public var crestSidesWattleMesh : Mesh;

static var beaks : List.<Mesh> = List.<Mesh>();
static var combs : List.<Mesh> = List.<Mesh>();
static var tails : List.<Mesh> = List.<Mesh>();
static var crestSidesWattle : Mesh;
///////////////////
////// Other //////
public var foodList : List.<GameObject> = List.<GameObject>();
static var food : List.<GameObject> = List.<GameObject>();

/////////////
// STARTUP //
function Awake(){
	if (!beaks.Count){
		// Meshes
		beaks = beaksList;
		tails = tailsList;
		combs = combsList;
		crestSidesWattle = crestSidesWattleMesh;

		// Clothes
		hats = hatsList;
		necklaces = necklacesList;
		glasses = glassesList;
		shoes = shoesList;
		unlockableClothes = unlockableClothesList;

		//Food
		food = foodList;
	}
	SetStaticColors();
}


////////////////////////////
///// GENERAL FUNCTIONS ////

static function GetAnimator(chicken : GameObject){
	var animator : Animator;
	if (chicken.GetComponent(ChickenStats).chicken.age == 1){
		animator = chicken.transform.Find("Chick").GetComponent(Animator);
	}
	else{
		animator = chicken.transform.Find("Hen").GetComponent(Animator);
	}

	return animator;
}

////////////////////////////
///// COLOR FUNCTIONS //////

// This function will run exactly once and set all of the game's colors.
function SetStaticColors(){
	if (!colors){
		colors = colorList;
		colorIcons = iconList;
		lockedColors = lockedColorList;

		// Sort colors into subgroups
		for (var i = 0; i< colors.Count; i ++){
			if (colors[i].ToString().Contains("Metallic")){metallicColors.Add(colors[i]);}
			else if (colors[i].ToString().Contains("Special")){specialColors.Add(colors[i]);}
			else{naturalColors.Add(colors[i]);}
		}
	}
}

static function GetColorByName(name : String){
	for (var i = 0; i< colors.Count; i ++){
		if (colors[i].name == name){
			return i;
		}
	}
	Debug.Log("No color was found with the name " + name);
	return 0;
}

static function UnlockColor(color : Material){
	PlayerPrefs.SetString(color.name, "Unlocked");
}


////////////////////////////
///// SPAWNER FUNCTIONS ////

// ChickenPrice is currently based entirely on feather color.
static function GetChickenPrice(color : String){

	var price : int = 100; //100 coins is the base price of an egg.

	// Set price based on color
	if (color.Contains("Special")){price *= 25;}
	else if (color.Contains("Metallic")){price *= 50;}

	else if (color.Contains("Brown")){price *= 1;}
	else if (color.Contains("Yellow")){price *= 2;}
	else if (color.Contains("Blue")){price *= 3;}
	else if (color.Contains("Gray")){price *= 4;}
	else if (color.Contains("Teal")){price *= 5;}
	else if (color.Contains("Red")){price *= 6;}
	else if (color.Contains("Green")){price *= 7;}
	else if (color.Contains("Purple")){price *= 8;}

	// Modify price based on shade
	if (color.Contains("0")){price *= 1.5;}
	if (color.Contains("1")){price *= 1.2;}
	if (color.Contains("2")){price *= 1.1;}
	if (color.Contains("3")){price *= 1.6;}

	return price;
}

////////////////////////////
/////// MESH FUNCTIONS /////
static function SetMesh(path : String, mesh : Mesh, chickenObj : Transform){
	chickenObj.Find(path).GetComponent(MeshFilter).sharedMesh = mesh;
}

static function GetMeshByName(meshList : List.<Mesh>, name : String){
	for (var i = 0; i< meshList.Count; i ++){
		if (meshList[i].name == name){
			return meshList[i];
		}
	}
	return null;
}

static function GetElementByName(list : List.<GameObject>, name : String){
	for (var i = 0; i< list.Count; i ++){
		if (list[i].name == name){
			return i;
		}
	}

	Debug.Log("No object was found with the name " + name + ".");
	return null;
}