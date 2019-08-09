#pragma strict
/*
This script uses lists of clothing prefabs from References to spawn all clothes of a certain type.
The clothes are set as children of their respective spawnpoint lists.
Set it to a chicken object with an 'Outfit' component.
*/
public var outfit : Outfit;

public var hatSpawnpoints : List.<Transform>;
public var necklaceSpawnpoints : List.<Transform>;
public var glassesSpawnpoints : List.<Transform>;
public var shoeSpawnpoints : List.<Transform>;

function SpawnClothes() {
	outfit.hatList = SpawnClothesAtSpawnpoints(hatSpawnpoints, References.hats);
	outfit.necklaceList = SpawnClothesAtSpawnpoints(necklaceSpawnpoints, References.necklaces);
	outfit.glassesList = SpawnClothesAtSpawnpoints(glassesSpawnpoints, References.glasses);
	outfit.shoesList = SpawnClothesAtSpawnpoints(shoeSpawnpoints, References.shoes);
}

// Spawn the given list of clothes at a given list of spawnpoints.
function SpawnClothesAtSpawnpoints(spawnpointList : List.<Transform>, clothesList : List.<GameObject>){
	var returnClothesList : List.<GameObject> = List.<GameObject>();
	var clothes : GameObject;
	// For every spawnpoint,
	for (var spawnpoint : int = 0; spawnpoint < spawnpointList.Count; spawnpoint++){
		// Spawn every related article of clothing
		for (var i : int; i < clothesList.Count; i++){
			//Debug.Log(clothesList[i].name);
			clothes = InstantiateClothes(clothesList[i], spawnpointList[spawnpoint]);
			// And add them to the list to return.
			returnClothesList.Add(clothes);
		}
	}
	return returnClothesList;
}

function InstantiateClothes(clothes : GameObject, spawnpoint : Transform){
	var returnClothes : GameObject;
	// Instantiate the new clothes
	returnClothes = Instantiate(clothes, Vector3.zero, Quaternion.identity, spawnpoint);
	// Set its position to zero
	returnClothes.transform.localPosition = Vector3.zero;
	// Set its rotation to zero
	returnClothes.transform.localRotation = Quaternion.identity;
	// Set scale to one
	returnClothes.transform.localScale = Vector3(1,1,1);
	// Set Name
	returnClothes.name = returnClothes.name.Replace("(Clone)", "");
	// Set it to be inactive
	returnClothes.SetActive(false);
	return returnClothes;
}
