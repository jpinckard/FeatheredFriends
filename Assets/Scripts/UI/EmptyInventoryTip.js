#pragma strict
public var emptyInventory : GameObject;

function Update(){CheckInventory();}

function CheckInventory (){
	var hasChildren : boolean;

	for (var i : int = 0; i < transform.childCount; i++){
		if (transform.GetChild(i).gameObject.activeSelf){
			hasChildren = true;
		}
	}

	emptyInventory.SetActive(!hasChildren);
}
