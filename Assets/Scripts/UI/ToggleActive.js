#pragma strict

public var inactive : boolean;

function Update () {
	if (inactive){gameObject.SetActive(false);}
	else{gameObject.SetActive(true);}
}
