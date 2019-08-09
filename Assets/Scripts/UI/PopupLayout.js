/*
This script allows the use of one popup menu with several layouts.
*/

public var audioController : AudioController;

public var layouts : List.<GameObject> = List.<GameObject>();
public var confirm : UI.Button;
public var options : Options;
public var changeScene : ChangeScene;
public var mainPanel : GameObject;
private var textBox : UI.Text;
private var icon : UI.Image;

// Actions for buttons to perform
public var confirmAction : String = "SellChicken";
public var sellChild : SellChild;
public var rewardedAd : GameObject;
@HideInInspector
public var itemBuyButton : GameObject;

function EnableLayout(layout : String){
	// turn on the popup canvas
	gameObject.SetActive(true);

	var correctLayout : boolean;
	// Enable only the desired layout
	for (var i : int; i < layouts.Count; i++){
		// Set the correct layout
		correctLayout = layouts[i].name.Contains(layout);
		// If the layout is the one we want, then activate it.
		layouts[i].SetActive(correctLayout);

		if (correctLayout && layouts[i].transform.Find("Text")){
			textBox = layouts[i].transform.Find("Text").GetComponent(UI.Text);
		}
		if (correctLayout && layouts[i].transform.Find("Image")){
			icon = layouts[i].transform.Find("Image").GetComponent(UI.Image);
		}
	}

}

function SetText(text : String){
	if (textBox){textBox.text = text;}
}

function ButtonAction(){
	switch (confirmAction){
		case "SellChicken": 
			// Sell the chicken
			sellChild.SellChicken();
			// And show the main panel again
			mainPanel.SetActive(true);
			break;
		//case "ShowRewardedAd":
		//	rewardedAd.SendMessage("ShowRewardedAd");
		//	break;
		case "Reset":
			options.Reset();
			changeScene.ChangeScene("MainMenu");
			break;
		case "ConfirmSale":
			if (itemBuyButton){itemBuyButton.GetComponent(ItemButton).ConfirmSale();}
			break;
		case "BuyItem":
			if (itemBuyButton){itemBuyButton.GetComponent(ItemButton).BuyItem();}
			break;
	}
}

function DisplayItem(image : Sprite, description : String){
	if (icon){icon.sprite = image;}
	if (textBox){textBox.text = description;}
}

function SetButtonAction(buttonAction : String){
	confirmAction = buttonAction;
}