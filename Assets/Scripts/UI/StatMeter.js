#pragma strict
/*
This script will set an image with a 'fill' setting to a certain value. If the value is greater than one, the bar will reset and a level will be added and displayed.
*/
private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);

// UI
public var levelText : UI.Text;
public var fillImage : UI.Image;

// the value of the stat to display
public var statVal : float;
// If this is null, the selectedChicken's stats will be displayed instead.
public var chickenStats : ChickenStats;
private var levelNum : String;

public enum StatType{
	LOVE,
	SPEED,
	BEAUTY,
}
public var statType : StatType = StatType.LOVE;

function OnEnable(){
	if (MenuNavigation.selectedChicken){
		chickenStats = MenuNavigation.selectedChicken.GetComponent(ChickenStats);
	}
	GetStatType();
	levelNum = parseInt(statVal).ToString();
	levelText.text = levelNum;
}

function Update () {
	// Get stat to change
	GetStatType();

	// Change the stat level if the bar is full
	if (chickenStats && statVal > 1){LevelUpStat();}
	// If the bar isn't full, set its value.
	else if (chickenStats){fillImage.fillAmount = statVal;}
	else if (MenuNavigation.selectedChicken){
		chickenStats = MenuNavigation.selectedChicken.GetComponent(ChickenStats);
		levelNum = parseInt(statVal).ToString();
		levelText.text = levelNum;
	}
}

function GetStatType(){
	switch(statType){
		case StatType.LOVE:
			statVal = chickenStats.chicken.love;
			break;
		case StatType.SPEED:
			statVal = chickenStats.chicken.speed;
			break;
		case StatType.BEAUTY:
			statVal = chickenStats.chicken.speed;
			break;
	}
}

function LevelUpStat(){
	levelText.text = parseInt(statVal).ToString();
	// Love until next level
	fillImage.fillAmount = (statVal % parseInt(statVal));

	// If love is nonzero and whole - in other words, if you just gained a new level
	if (levelNum != levelText.text){
		levelNum = levelText.text;
		audioController.PlaySound(audioController.love);
	}
}