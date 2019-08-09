#pragma strict

public var newGravity : float = 0;

function OnTriggerEnter(other : Collider){
	if (other.gameObject.name == "chickenRacer"){
		other.gameObject.GetComponent(PlatformerControls).moveDirection.y = newGravity;
	}
}

function OnTriggerStay(other : Collider){
	if (other.gameObject.name == "chickenRacer"){
		other.gameObject.GetComponent(PlatformerControls).jump = false;
	}
}
function OnTriggerExit(other : Collider){
	if (other.gameObject.name == "chickenRacer"){
		other.gameObject.GetComponent(PlatformerControls).jump = true;
	}
}