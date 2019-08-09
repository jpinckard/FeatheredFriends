#pragma strict

private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);

private var saveChickens : SaveChickens;
saveChickens = GameObject.Find("Main Camera").GetComponent(SaveChickens);

public var mailboxAnimator : Animator;

public var hideUI : GameObject;

public var itemContainer : Transform;

public var popupCanvas : GameObject;
private var popupLayout : PopupLayout;

public var sellButton : UI.Button;

private var saleConfirmed : boolean = false;

function Start(){
	popupLayout = popupCanvas.GetComponent(PopupLayout);
	// If the chicken is in the sale box when the game starts up, then we've already asked the user if he wants to sell it
	if (itemContainer.childCount > 0){saleConfirmed = true;}
}

function Update () {

	// If there's someone in the sell box, ask to confirm the sale
	if (itemContainer.childCount > 0 && !saleConfirmed){
		audioController.PlaySound(audioController.blopOn);
		ConfirmSale();
		saleConfirmed = true;
	}
	else if (itemContainer.childCount == 0 && saleConfirmed){
		saleConfirmed = false;
	}
}

function SellChicken(){

	var item : Chicken = itemContainer.GetChild(0).gameObject.GetComponent(ChickenStats).chicken;

	// Play Sound
	audioController.PlaySound(audioController.money);

	// remainingButtons is equal to the player's current buttons plus the price of the chicken
	var remainingButtons : int;
	remainingButtons = PlayerPrefs.GetInt("Buttons") + GetPrice(item);

	// Set the player's buttons (currency) to itself plus the value of the chicken in buttons
	PlayerPrefs.SetInt("Buttons", remainingButtons);

	saveChickens.chickenObjects.Remove(itemContainer.GetChild(0).gameObject);
	saveChickens.chickens.Remove(itemContainer.GetChild(0).GetComponent(ChickenStats).chicken);

	// Remove chicken from save
	saveChickens.SaveChickens();

	// Eggsterminate Chicken
	Destroy(itemContainer.GetChild(0).gameObject);

	// Close mailbox
	mailboxAnimator.SetTrigger("Close");
}

function ConfirmSale(){
	// You can only sell a chicken if there is one in the box.
	if (itemContainer.childCount > 0){
		var item : Chicken = itemContainer.GetChild(0).gameObject.GetComponent(ChickenStats).chicken;

		// Hide the panels
		hideUI.SetActive(false);

		// Don't allow the player to sell a chicken if they don't have enough to breed!
		if (PlayerPrefs.GetInt("TotalChickens") <= 2){
			popupLayout.EnableLayout('Info');
			popupLayout.SetText("You can't sell " + item.name + "! If you do, you won't have enough chickens! You must have no fewer than two.");
		}
		else{
			popupLayout.EnableLayout('SellChicken');
			popupLayout.SetText("Are you sure you want to sell " + item.name + " for " + GetPrice(item) + " coins?\nThis can't be undone!");
		}
	}
	else{
		popupLayout.EnableLayout('Info');
		popupLayout.SetText("You must put a chicken in the cage to sell it.");
	}
}

function GetPrice(item : Chicken){
	var price : int;
	price = (item.price / 3) + (item.love * 10);
	return price;
}