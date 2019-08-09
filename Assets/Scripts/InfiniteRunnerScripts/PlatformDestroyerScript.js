#pragma strict

function OnTriggerEnter(other : Collider){
	if (other.tag == "Player"){
		Debug.Log("Game Over!");
	}
	else if (other.gameObject.transform.parent){
		Destroy(other.gameObject.transform.parent.gameObject);
	}
	else{Destroy(other.gameObject);}
}