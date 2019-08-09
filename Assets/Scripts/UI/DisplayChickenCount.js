#pragma strict

private var chickenText : UI.Text;
chickenText = transform.GetComponent(UI.Text);

function Update(){
	chickenText.text = PlayerPrefs.GetInt("TotalChickens").ToString();
}