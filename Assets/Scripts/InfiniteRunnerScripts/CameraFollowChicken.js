#pragma strict

public var object : Transform;
//public var height : float = 6;
public var zoom : boolean = false;
public var xModifier : int = 3;
public var xFollow : boolean = true;

function Update () {
	if (xFollow){transform.position = new Vector3(object.position.x + xModifier, transform.position.y, transform.position.z);}
	else{transform.position = new Vector3(object.position.x, object.position.y, object.position.z);}

	if (zoom){transform.position = Vector3.MoveTowards(transform.position, object.position, .5);}
}
