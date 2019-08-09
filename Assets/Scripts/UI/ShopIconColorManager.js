#pragma strict
/*
This script changes the shop's icon to a darker color depending on whether the image has the word 'icon' in its name.
*/
public var colorDark : Color;

private var image : UI.Image;
image = GetComponent(UI.Image);


function Update () {
	if (image.sprite.name.Contains("Icon")){
		image.color = colorDark;
	}
	else if (image.color != Color.white){
		image.color = Color.white;
	}	
}
