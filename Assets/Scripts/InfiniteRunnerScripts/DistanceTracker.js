#pragma strict

private var dist : int;
public var distanceMeter : UI.Text;
@HideInInspector
public var racer : ChickenStats;

function Start(){
	racer = gameObject.GetComponent(ChickenStats);
}
function Update () {
	dist = transform.position.x;
	// Set the distance traveled text.
	if (dist < 0){distanceMeter.text = "0m";}
	else{distanceMeter.text = dist.ToString() + "m";}
}