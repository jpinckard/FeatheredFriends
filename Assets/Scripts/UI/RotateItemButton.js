#pragma strict
/*
This script rotates the selected chicken when a button is held down or depending on a slider value.
*/
public var rotateSpeed : float;
private var rotating : boolean = false;
// Rotate the chicken.
function Update(){if(rotating){MenuNavigation.selectedChicken.transform.Rotate(Vector3.up * Time.deltaTime * rotateSpeed);}}

function RotateWithButton(){rotating = true;}

function StopRotating(){rotating = false;}

function RotateWithSlider(){
	var slider : UI.Slider =  GetComponent(UI.Slider);
	var yVal : float = slider.value;
	// Rotate the slider continuously
	if (yVal == slider.maxValue){slider.value = slider.minValue + .01;}
	else if (yVal == slider.minValue){slider.value = slider.maxValue - .01;}

	// Rotate the chicken.
	MenuNavigation.selectedChicken.transform.rotation = Quaternion.Euler(0, yVal * 360, 0);
}

function TogglePet(toggle : boolean){MenuNavigation.selectedChicken.GetComponent(DragAndPet).enabled = toggle;}