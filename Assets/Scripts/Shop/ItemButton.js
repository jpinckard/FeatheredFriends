#pragma strict
// This script is used for clothing buttons.
private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);

public var itemDisplay : GameObject;
public var purchaseButton : PopupLayout;
public var popupCanvas : PopupLayout;
// A UI element that displays the amount of an item in the player's inventory.
public var inventoryNum : GameObject;

@HideInInspector
public var buttonNum : int;
// We only need the following variables if this button is spawned for a shop.
@HideInInspector
public var shop : boolean = false;
@HideInInspector
public var itemSpawner : ItemSpawner;
@HideInInspector
public var description : String;
@HideInInspector
public var nameText : String;
@HideInInspector
// Used to save the initial color of clothes
var clothesList : List.<GameObject>;
//@HideInInspector
public var price : int;
@HideInInspector
public var icon : Sprite;

// Keeps up with the last clothing changed.
static var currentClothes : String;

private var defaultName : String;
private var defaultDesc : String;

function Start(){
	clothesList = SetItemList.GetItemList(ItemSpawner.itemType);
	// Get default text from shop panel
	if(shop){
		defaultName = itemSpawner.nameText.text;
		defaultDesc = itemSpawner.descriptionText.text;
	}
}
function OnClick(){
	audioController.PlaySound(audioController.button);
	if (shop){
		// Set the description
		DisplayDescription();
		// Enable the purchase button only when an item is selected
		purchaseButton.gameObject.SetActive(true);
		// Tell the purchase button to buy this object
		purchaseButton.itemBuyButton = gameObject;
		// Set the 'confirm purchase' popup to buy this object
		popupCanvas.itemBuyButton = gameObject;
		// Set the purchase button to this price
		purchaseButton.transform.Find("Text").GetComponent(UI.Text).text = "$" + price.ToString();

	}
	else if (ItemSpawner.itemType != "Food"){
		var outfit : Outfit = MenuNavigation.selectedChicken.GetComponent(Outfit);
		var chicken : Chicken = MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken;

		// If we clicked the button twice, remove the clothes.
		if ((ItemSpawner.itemType == "Hats" && chicken.hat == References.hats[buttonNum].name)
			|| (ItemSpawner.itemType == "Necklaces" && chicken.necklace == References.necklaces[buttonNum].name)
			|| (ItemSpawner.itemType == "Shoes" && chicken.shoes == References.shoes[buttonNum].name)
			|| (ItemSpawner.itemType == "Glasses" && chicken.glasses == References.glasses[buttonNum].name)){
			// Set clothes to null
			outfit.ChangeClothes(0, ItemSpawner.itemType);
		}
		else{
			// Set Color
			SetColorInSave();
			// Set Outfit
			outfit.ChangeClothes(buttonNum, ItemSpawner.itemType);
		}
	}
}

function SetColorInSave(){
	
	if (clothesList[buttonNum].transform.Find("Primary")){
		
		// The index of the clothes we're changing
		var clothesName : String = clothesList[buttonNum].transform.Find("Primary").GetComponent(Renderer).sharedMaterial.name;
		// Set item color in save
		switch (ItemSpawner.itemType){
			case "Hats":
				MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken.hatColor = clothesName;
				break;
			case "Necklaces":
				MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken.necklaceColor = clothesName;
				break;
			case "Shoes":
				MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken.shoesColor = clothesName;
				break;
			case "Glasses":
				MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken.glassesColor = clothesName;
				break;
		}
	}
}

function DisplayDescription(){
	// Set Item Description
	var itemList : List.<GameObject> = SetItemList.GetItemList(ItemSpawner.itemType);

	itemSpawner.nameText.text = nameText;
	itemSpawner.descriptionText.text = description;
	itemSpawner.icon.sprite = icon;
}

function BuyItem(){

	// Subtract from currency
	PlayerPrefs.SetInt("Buttons", PlayerPrefs.GetInt("Buttons") - price);

	// Play the money noise
	audioController.PlaySound(audioController.money);

	// Buy Item
	// Food
	if (ItemSpawner.itemType == "Food"){
		// Increase the inventory on that food by one
		PlayerPrefs.SetInt((ItemSpawner.itemType + nameText), PlayerPrefs.GetInt(ItemSpawner.itemType + nameText) + 1);
		// Set the text
		transform.Find("InventoryNum/Text").GetComponent(UI.Text).text = PlayerPrefs.GetInt(ItemSpawner.itemType + nameText).ToString();
	}
	// Clothing
	else{
		PlayerPrefs.SetString(ItemSpawner.itemType + nameText, "Purchased");
		Debug.Log("Purchased:" + ItemSpawner.itemType + nameText);
		// Reset description values
		ResetDescription();
		// Remove Button
		gameObject.SetActive(false);
	}


}

function ResetDescription(){
	itemSpawner.nameText.text = defaultName;
	itemSpawner.descriptionText.text = defaultDesc;
	itemSpawner.icon.sprite = itemSpawner.defaultSprite;
	purchaseButton.itemBuyButton = null;
	purchaseButton.gameObject.SetActive(false);
}

function ConfirmSale(){
	if (PlayerPrefs.GetInt("Buttons") >= price){
		popupCanvas.EnableLayout("Confirm");
		popupCanvas.SetText("Purchase the " + nameText + " for $" + price + "?");
		popupCanvas.SetButtonAction("BuyItem");
	}
	else{
		popupCanvas.EnableLayout("Info");
		popupCanvas.SetText("You don't have enough coins to buy the " + nameText + ".");
	}
}