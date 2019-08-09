#pragma strict

function SetMesh(path : String, mesh : Mesh, chickenObj : Transform){
	chickenObj.Find(path).GetComponent(MeshFilter).sharedMesh = mesh;
}

// Debug Delete
function SetSelectedChickenDuckBeak(){
	Debug.Log("Beaks" + References.beaks.Count);
	SetMesh("Hen/parentBone/bodyBone/headBone/Face/Beak", References.beaks[0], MenuNavigation.selectedChicken.transform);
}