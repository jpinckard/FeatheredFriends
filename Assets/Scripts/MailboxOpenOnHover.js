#pragma strict
/*
Opens the mailbox when a chicken is hovering. Closes it when a chiken is not hovering.
Mailbox is closed when a chicken is sold in SellChild.
*/
private var toggleDrag : ToggleDragAndDrop;
toggleDrag = GameObject.Find("Main Camera").GetComponent(ToggleDragAndDrop);

public var animator : Animator;

private var open : boolean = false;

function Start(){if (gameObject.transform.Find("ChickenBox").childCount){animator.SetTrigger("Open");open=true;}}

function OnTriggerEnter(chicken : Collider){
	if (chicken.CompareTag("Chicken") && toggleDrag.dragging){
		animator.SetTrigger("Open");
		open = true;
	}
}

function OnTriggerExit(chicken : Collider){
	if (chicken.CompareTag("Chicken") && toggleDrag.dragging){
		animator.SetTrigger("Close");
		open = false;
	}
}

function Update(){
	if (!open && gameObject.transform.Find("ChickenBox").childCount){animator.SetTrigger("Open");open=true;}
}