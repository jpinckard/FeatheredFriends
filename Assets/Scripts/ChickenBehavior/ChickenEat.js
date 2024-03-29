#pragma strict
/*
This script affects the selected chicken when a food item is dragged over an attached panel with an image component.
It's useful for UI to interact with the worldspace in simple cases.

This script handles chicken food consumption.
*/

private var audioController : AudioController;
audioController = GameObject.Find("Main Camera").GetComponent(AudioController);

private var IsDragging : ToggleDragAndDrop;
IsDragging = GameObject.Find("Main Camera").GetComponent(ToggleDragAndDrop);

public var emptyInventoryTip : EmptyInventoryTip;

private var animator : Animator;

// The speed at which to eat
private var munchTime : float = .75;
// The scale at which you're done eating
private var finishScale : float = 0.5;
// The item we're going to eat.
static var item : GameObject;
// Is the chicken currently eating?
static var eating : boolean;

private var foodHitBox : GameObject;

function Update(){
	if(item && eating){EatFood();}
	if (!IsDragging.dragging){StopEating();}
}

function OnPointerEnter(){
	// If food has been dragged into the mouse
	if (item && item.GetComponent(DragItem).dragging){
		// Begin Eating
		eating = true;
		// Get animator
		animator = References.GetAnimator(MenuNavigation.selectedChicken);
		// Turn chicken to face the player
		MenuNavigation.selectedChicken.transform.rotation = Quaternion.identity;
	}
}

function OnPointerExit(){
	// If the food has been dragged away from the mouse,
	if (item && item.GetComponent(DragItem).dragging){
		// End the animation
		animator.SetBool("Eat", false);
		// Stop the eating noise
		//audioController.LoopSound(audioController.bite, false);
		// Stop Eating
		eating = false;
	}
}

function EatFood(){
	eating = true;
	// Shrink food as it is eaten
	item.transform.localScale -= (Time.deltaTime / munchTime) * item.transform.localScale;
	// Play eating animation
	animator = References.GetAnimator(MenuNavigation.selectedChicken);
	animator.SetBool("Eat", true);
	//audioController.LoopSound(audioController.bite, true);
	// When we're done eating,
	if (item.transform.localScale.x <= finishScale){
		FinishEating();
	}
}

function FinishEating(){
	StopEating();

	// Play a 'Pop!' noise to indicate that the food is done
	audioController.PlaySound(audioController.blop);

	// The name of the food being eaten
	var foodName : String = item.GetComponent(UI.Image).sprite.name;

	//Raise Love based on food's value
	var value : float;
	value = Mathf.Round(item.transform.parent.gameObject.GetComponent(ItemButton).price) / 100;
	MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken.love += value;

	// Show the chicken happy
	MenuNavigation.selectedChicken.GetComponent(ChickenEmotions).Happy();

	// Stop dragging the item
	item.GetComponent(DragItem).StopDragging();

	///////////////
	// INVENTORY //
	// Remove the food from the player's inventory
	PlayerPrefs.SetInt(("Food" + foodName), PlayerPrefs.GetInt("Food" + foodName) - 1);

	// If we're out of food, show the shop tip.
	emptyInventoryTip.CheckInventory();

	// Update the inventory text
	item.transform.parent.Find("InventoryNum/Text").GetComponent(UI.Text).text = PlayerPrefs.GetInt("Food" + foodName).ToString();

	// If we're out of this food, // Destory the food button.
	if (PlayerPrefs.GetInt("Food" + foodName) <= 0){Destroy(item.transform.parent.gameObject);}

	// Reset item
	item = null;
}

function StopEating(){
	if (item){
		// Enable the scroll rect
		if (item.GetComponent(DragItem).scrollRect){item.GetComponent(DragItem).scrollRect.enabled = true;}
		animator = References.GetAnimator(MenuNavigation.selectedChicken);
		// End the animation
		animator.SetBool("Eat", false);
		// Stop the biting sound
		audioController.LoopSound(audioController.bite, false);
		// Stop Eating
		eating = false;
	}
}