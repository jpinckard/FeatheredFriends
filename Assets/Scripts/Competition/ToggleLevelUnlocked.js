#pragma strict

public var icon : UI.Image;
public var text : GameObject;
public var coinSprite : Sprite;
public var checkmark : Sprite;
public var green : Color;

private var button : CanvasGroup;
private var level : int;

function Awake () {
	button = GetComponent(CanvasGroup);
	level = parseInt(GetComponent(ChooseLevel).level);

	SetIcon();

	// Unlock the first level or anything that has been unlocked.
	if (level == 1 || PlayerPrefs.GetString("CompetitionRaceUnlocked" + level.ToString())){
		button.interactable = true;
	}
	// If the group remains disabled,
	else{
		// set the image to be transparent.
		icon.color.a= .5;
	}
}

function SetIcon(){
	//////////////////
	// Change Icon //
	// If the prize prefab is money....
	if (GetComponent(ChooseLevel).prizeItemType.Contains("Money")){
		icon.sprite = coinSprite;
		text.SetActive(true);
		text.GetComponent(UI.Text).text = GetComponent(ChooseLevel).prizeItemType.Replace("Money", "$");
	}
	// Show Color icon
	else if (GetComponent(ChooseLevel).prizeItemType.Contains("Material")){
		ColorButton.GetColorIcon(References.colors[References.GetColorByName(GetComponent(ChooseLevel).prizeItemType.Replace("Material",""))], icon);
		Debug.Log(References.colors[References.GetColorByName(GetComponent(ChooseLevel).prizeItemType.Replace("Material",""))].name.ToString());
	}
	// If the level is unlocked but has not yet been won, show the prize icon.
	else{icon.sprite = GetComponent(ChooseLevel).prizePrefab.GetComponent(UI.Image).sprite;}

	// If the level is unlocked and has been beaten, change the icon to a checkmark.
	if (PlayerPrefs.GetString("CompetitionRaceUnlocked" + (level + 1).ToString())){
		icon.sprite = checkmark;
		icon.color = green;
		text.SetActive(false);
	}
}

function UnlockLevel(level : String){
	PlayerPrefs.SetString("CompetitionRaceUnlocked" + level.ToString(), "Unlocked");
}