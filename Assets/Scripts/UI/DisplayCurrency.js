#pragma strict
public var showMoneyEarned : boolean = false;
private var initialCash : int;

function Start(){
	initialCash =  PlayerPrefs.GetInt("Buttons");
}

function Update(){
	if (showMoneyEarned){
		gameObject.GetComponent(UI.Text).text = "$" + (PlayerPrefs.GetInt("Buttons") - initialCash).ToString();
	}
	else{gameObject.GetComponent(UI.Text).text = "$" + PlayerPrefs.GetInt("Buttons").ToString();}
}