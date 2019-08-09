#pragma strict
/*
This script is for purchasing new chickens to add to your flock!
Attach it to a 'purchase' button.
You should not be able to open the shop if you have max chickens, so make sure to have a script on the Hatchery button that prevents it.
*/

private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);

public var changeScene : ChangeScene;

public var chickenStats : ChickenStats;
public var priceText : UI.Text;
public var emptyBoxes : String[];

// Get all empty boxes
function Start(){emptyBoxes = PlayerPrefs.GetString("EmptyBoxes").Split(","[0]);}

// Set Button Price
function SetItem(){
	// Set the button's price to the egg's value
	transform.Find("Text").GetComponent(UI.Text).text = "$" + chickenStats.chicken.price.ToString();
}

// if player cannot afford egg, disable button
function Update(){gameObject.GetComponent(UI.Button).interactable = PlayerPrefs.GetInt("Buttons") >= chickenStats.chicken.price;}

// When the button is clicked, buy the egg.
function Adopt(){

	// Set transition time=
	chickenStats.gameObject.GetComponent(ChickenAgeScript).GetTransitionTime();

	// Set up the chicken
	var chicken : Chicken = chickenStats.chicken;

	// Play Sound Effect
	audioController.PlaySound(audioController.money);

	// Disable Blutton
	gameObject.GetComponent(UI.Button).interactable = false;

	// Set PopupLayout to confirm purchase

	// Play button press noise
	audioController.PlaySound(audioController.button);

	// Set chicken's box number to empty box number
	chicken.box = parseInt(emptyBoxes[0]);

	// remove money from bank;
	PlayerPrefs.SetInt("Buttons", PlayerPrefs.GetInt("Buttons") - chicken.price);

	// Save Chicken
	var saveChickenList : List.<Chicken> = List.<Chicken>();
	saveChickenList.Add(chicken);
	SaveChickens.SetChicken(0, PlayerPrefs.GetInt("TotalChickens").ToString(), saveChickenList);
	// Iterate the total number of chickens
	PlayerPrefs.SetInt("TotalChickens", PlayerPrefs.GetInt("TotalChickens") + 1); 

	// Change Scene
	//changeScene.ChangeScene("ChickenBoxManager");
}

/*
function RandomChicken(chicken : Chicken){
		// Check if the egg is special, metallic, or naturally colored.
		var eggType : String;
		eggType = colorNames[Random.Range(0, colorNames.Count)];

		var colorList : List.<Material>;

		if (eggType.Contains("Metallic")){colorList = References.metallicColors;}
		else if (eggType.Contains("Special")){colorList = References.specialColors;}
		else{colorList = References.naturalColors;}

		chickenList[i].featherColor = colorList[Random.Range(0, colorList.Count)].name;
		chickenList[i].combColor = colorList[Random.Range(0, colorList.Count)].name;
		chickenList[i].beakColor = colorList[Random.Range(0, colorList.Count)].name;
}
*/