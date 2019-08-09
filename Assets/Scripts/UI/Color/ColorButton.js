#pragma strict
/*
Attach this script to a button to let it change something's color. These buttons are typically spawned in a
_viewport_ UI element from ColorButtonList, which will pull colors from References.

This code is also responsible for setting the color and genetic properties of eggs in the hatchery (see GetEggProperties).

This code depends on an outfit script and a references script. The button number is intended to be set 
automatically from ColorButtonList.
*/

//These are all set in ColorButtonList.
private var outfit : Outfit;
@HideInInspector
public var chickenStats : ChickenStats;
@HideInInspector
public var eggParts : List.<GameObject>;
@HideInInspector
private var price : int;
@HideInInspector
public var priceText : UI.Text;
public var buttonPriceText : UI.Text;

@HideInInspector
public var audioController : AudioController;
public var buttonNum : int = 0;
public var icon : UI.Image;
public var lockIcon : GameObject;
public var lockSprite : Sprite;

function Start(){

	GetColorIcon(References.colors[buttonNum], icon);

	// Get Price By Color
	price = References.GetChickenPrice(References.colors[buttonNum].name);

	// Show price as text
	if (eggParts.Count>0){
		buttonPriceText.gameObject.SetActive(true);
		buttonPriceText.text = "$" + price.ToString();
		if (buttonNum == 0){OnClick();}
	}

	SetLockIcon();
}

function OnClick(){

	// Sound Effect!
	audioController.PlaySound(audioController.blop);

	// Only one of chickenOutfit or eggParts will be set depending on the enum ColorType in ColorButtonList.
	if (eggParts.Count == 0){
		// Set outfit
		outfit = MenuNavigation.selectedChicken.GetComponent(Outfit);
		// Get the chicken's stats
		chickenStats = MenuNavigation.selectedChicken.GetComponent(ChickenStats);
		// Set the clothing to change and the color to change.
		var clothes : List.<GameObject>;
		switch (ItemSpawner.itemType){
			case "Hats": if (outfit.hat){			clothes = outfit.hat; 		outfit.chickenStats.chicken.hatColor = 	    References.colors[buttonNum].name;} break;
			case "Glasses": if (outfit.glasses){	clothes = outfit.glasses;   outfit.chickenStats.chicken.glassesColor =  References.colors[buttonNum].name;} break;
			case "Necklaces": if (outfit.necklace){ clothes = outfit.necklace;  outfit.chickenStats.chicken.necklaceColor = References.colors[buttonNum].name;} break;
			case "Shoes": if (outfit.shoes){		clothes = outfit.shoes;		outfit.chickenStats.chicken.shoesColor =    References.colors[buttonNum].name;} break;
		}
		// Change the clothing color.
		if (clothes){outfit.SetClothesToMaterial(clothes, References.colors[buttonNum]);}
	}

	else{
		// Set Price
		chickenStats.chicken.price = price;
		priceText.text = "$" + price.ToString();
		// Color Egg
		for (var i : int; i < eggParts.Count; i++){eggParts[i].GetComponent(Renderer).sharedMaterial = References.colors[buttonNum];}
		// Set all egg colors and meshes
		GetEggProperties();
	}
}

function GetEggProperties(){

	// The feather color is always equal to the color of the egg.
	chickenStats.chicken.featherColor = References.colors[buttonNum].name;

	/////////////////////
	// RANDOM COLORS ////
	if (chickenStats.chicken.featherColor.Contains("Metallic")){
		chickenStats.chicken.combColor = References.metallicColors[parseInt(Random.Range(0, References.metallicColors.Count))].name;
		chickenStats.chicken.beakColor = References.metallicColors[parseInt(Random.Range(0, References.metallicColors.Count))].name;
	}
	else if (chickenStats.chicken.featherColor.Contains("Special")){
		chickenStats.chicken.combColor = References.colors[buttonNum].name;
		chickenStats.chicken.beakColor = References.colors[buttonNum].name;
	}
	else{
		chickenStats.chicken.combColor = References.naturalColors[parseInt(Random.Range(0, References.naturalColors.Count))].name;
		chickenStats.chicken.beakColor = References.naturalColors[parseInt(Random.Range(0, References.naturalColors.Count))].name;
	}

	/////////////////////
	//// RANDOM MESH ////
	// Set random beaks, combs, and tails. 1 in 3 chance of having a non-generic version of each.
	chickenStats.chicken.comb = References.combs[parseInt(Random.Range(0, References.combs.Count))].name;
	chickenStats.chicken.beak = References.beaks[parseInt(Random.Range(0, References.beaks.Count))].name;
	chickenStats.chicken.tail = References.tails[parseInt(Random.Range(0, References.tails.Count))].name;
}

// This function is also used in competitions to set the icons for unlocked colors.
static function GetColorIcon(color : Material, icon : UI.Image){
	var name : String = color.name;
	// If the icon needs to be textured:
	if (name.Contains("Special") || name.Contains("Metallic")){
		icon.sprite = GetColorIconByName(name);
		if (!name.Contains("Metallic")){icon.color = Color.white;}
		else{icon.color = color.color;}
	}
	else{icon.color = color.color;}
}

function SetLockIcon(){
	// If the button has not been unlocked, set it to uninteractable and change its icon to a lock.
	if (PlayerPrefs.GetString(References.colors[buttonNum].name) == "Locked"){
		GetComponent(UI.Button).interactable = false;
		lockIcon.SetActive(true);
		// Hide price if locked
		buttonPriceText.gameObject.SetActive(false);
	}
}

static function GetColorIconByName(name : String){
	for (var i = 0; i< References.colorIcons.Count; i ++){
		if (name.Contains(References.colorIcons[i].name) || (name.Contains("Metallic") && References.colorIcons[i].name.Contains("Metallic"))){
			return References.colorIcons[i];
		}
	}
	Debug.Log("No color was found with the name " + name);
	return References.colorIcons[0];
}