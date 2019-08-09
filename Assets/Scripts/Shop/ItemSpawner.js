/*
This script spawns a list of buttons as children of a gameObject.
For best results, attach a layout group component to the contentHolder gameObject.

This script also manages whether or not an item is visible to the user, depending on whether that item has been purchased.
Items are declared 'purchased' in ItemButton.
*/
#pragma strict
static var itemType : String = "Hats";
// The button; we'll put the item we want to display inside of it.
public var buttonPrefab : GameObject;
// A list of the objects for which to instantiate buttons. hatList is the default.
public var itemList : List.<GameObject> = List.<GameObject>();
// The gameobject to hold the buttons. It should probably have a layout script of some sort.
public var contentHolder : Transform;
public var lockIcon : Sprite;

// Are we spawning items for a shop?
public var shop : boolean = false;
// We only need the following variables if we're spawning a shop.
public var nameText : UI.Text;
public var descriptionText : UI.Text;
public var icon : UI.Image;
public var defaultSprite: Sprite;
public var purchaseButton : PopupLayout;
public var popupCanvas : PopupLayout;

function CreateButtons(itemList : List.<GameObject>){
	// Clear list
	for (var i = 0; i < contentHolder.transform.childCount; i++){GameObject.Destroy(contentHolder.transform.GetChild(i).gameObject);}

	for (i = 0; i < itemList.Count; i++){
		var newButton : GameObject;
		var itemDisplay : GameObject;
		var icon : GameObject;
		// Create the button
		newButton = Instantiate(buttonPrefab, Vector3.zero, Quaternion.identity);
		// Set the item that the button will set
		newButton.GetComponent(ItemButton).buttonNum = i;
		// Set the parent of the new button to the viewport
		newButton.transform.SetParent(contentHolder, false);

		var itemButton : ItemButton = newButton.GetComponent(ItemButton);
		itemButton.itemSpawner = this;

		// if we have an icon image stored, set the button's icon.
		if (itemList[i].GetComponent(UI.Image)){
			icon = newButton.transform.Find("Icon").gameObject;
			var sprite : Sprite;

			// Set item icon if the item has been purchased or if it has an inventory space of > 0)
			if((itemList[i].name.Contains("Remove") || PlayerPrefs.GetString(ItemSpawner.itemType + itemList[i].name) == "Purchased") || (shop)|| (itemType == "Food" && PlayerPrefs.GetInt(ItemSpawner.itemType + itemList[i].name) > 0)){
				// Set the button's icon to the image stored on the item display game object.
				sprite = itemList[i].GetComponent(UI.Image).sprite;
			}
			// Lock the button if we're not in the shop.
			else if (!shop){
				// Set lock icon if the item has not been purchased
				sprite = lockIcon;
				// Set the sprite to be transparent
				icon.GetComponent(UI.Image).color.a = .5;
				// We cannot select a locked button.
				newButton.GetComponent(UI.Button).interactable = false;
			}

			icon.GetComponent(UI.Image).sprite = sprite;

			// If the item is food,
			if (itemType == "Food"){
				
				if(!shop){
					// Allow food icons to be dragged.
					icon.GetComponent(DragItem).enabled = true;
					// Hide the food if there isn't any in the inventory.
					if (PlayerPrefs.GetInt(ItemSpawner.itemType + itemList[i].name) <= 0){itemButton.gameObject.SetActive(false);}
				}
				// Show number of items in inventory.
				itemButton.inventoryNum.SetActive(true);
				// Set the inventory text to the num of items in the inventory.
				itemButton.inventoryNum.transform.Find("Text").GetComponent(UI.Text).text = PlayerPrefs.GetInt(ItemSpawner.itemType + itemList[i].name).ToString();

			}
		}
		// Set the value of the item so we can retrieve it later.
		if (itemButton){itemButton.price = itemList[i].GetComponent(Item).price;}

		if (shop){
			// If the item is a remove button, or if we've already purchased it, and if it's not food:
			if (itemList[i].name.Contains("Remove") || References.unlockableClothes.Contains(itemList[i]) || PlayerPrefs.GetString(ItemSpawner.itemType + itemList[i].name) == "Purchased" && itemType != "Food"){
				// We don't need the remove option in the shop.
				//itemList.Remove(itemList[i]);
				newButton.SetActive(false);
				//i -= 1;
				/*
				itemButton.GetComponent(UI.Button).interactable = false;
				icon.GetComponent(UI.Image).color.a = .5;
			}
			else if (itemList[i].name.Contains("Remove")){
				itemList.Remove(itemList[i]);
				Destroy(newButton);
				i -= 1;
			*/
			}

			else{
				// Make it so we can buy the button.
				itemButton.shop = true;
				newButton.GetComponent(ItemButton).buttonNum = i;
				// See 'PopupLayout' fmi.
				itemButton.popupCanvas = popupCanvas;
				itemButton.purchaseButton = purchaseButton;
				// Set the description of the item.
				itemButton.nameText = itemList[i].name;
				itemButton.description = itemList[i].GetComponent(Item).description;
				itemButton.icon = sprite;
			}
		}
	}
}
