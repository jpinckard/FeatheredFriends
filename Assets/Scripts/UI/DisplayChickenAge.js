#pragma strict
private var timePassed : String;
private var timeSpan : System.TimeSpan;

private var alarmText : UI.Text;
alarmText = transform.GetComponent(UI.Text);


function Update(){
	// If a chicken is selected, we're inside of a box, and the chicken is younger than 2
	if (MenuNavigation.selectedChicken && CameraZoom.dest != Vector3.zero && MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken.age < 2){
		// Get the time that has passed since the chicken transitioned
		timeSpan = MenuNavigation.selectedChicken.GetComponent(ChickenAgeScript).timePassed;
		// Convert time passed to a string
		timePassed = (timeSpan.Hours + ":" + timeSpan.Minutes + ":" + timeSpan.Seconds).Replace("-", "");
		// Set the alarm text
		alarmText.text = timePassed;
	}
	else if (MenuNavigation.selectedChicken && MenuNavigation.selectedChicken.GetComponent(ChickenStats).chicken.age == 2){
		alarmText.text = "Fully Grown!";
	}	
}