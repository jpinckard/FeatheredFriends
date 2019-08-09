/*
This script is used to set the type of item displayed in the items scrollbar.
*/
public var itemSpawner : ItemSpawner;

public var itemType : String;

private var itemList : List.<GameObject>;

function Start(){itemList = GetItemList(itemType);};

function SetItemType(){
	// Tell chickenOutfit which clothes to change
	ItemSpawner.itemType = itemType;
	// Get Item List
	itemList = GetItemList(itemType);
	// Create a list of buttons
	itemSpawner.CreateButtons(itemList);
}

static function GetItemList(itemType : String){
	// Get itemList from resources
	var list : List.<GameObject>;
	switch (itemType){
		case "Hats":
			list = References.hats;
			break;
		case "Glasses":
			list = References.glasses;
			break;
		case "Necklaces":
			list = References.necklaces;
			break;
		case "Shoes":
			list = References.shoes;
			break;
		case "Food":
			list = References.food;
			break;
	}
	return list;
}

