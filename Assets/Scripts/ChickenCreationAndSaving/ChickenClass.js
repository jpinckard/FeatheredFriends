#pragma strict

class ChickenClass extends MonoBehaviour{
	public class Chicken{
		var name : String;
		var age : int; // 0 is egg, 1 is chick, 2 is hen
		var transitionTime : String;

		// Aesthetic Features
		var featherColor : String;
		var beakColor : String;
		var combColor : String;
		var eyeColor : String;
		var hat : String;
		var glasses : String;
		var necklace : String;
		var shoes : String;
		var hatColor : String;
		var glassesColor : String;
		var necklaceColor : String;
		var shoesColor : String;
		var price : int;
		var hunger : int;
		var box : int;

		// Meshes
		var beak : String;
		var comb : String;
		var tail : String;

		// Stats
		var love : float;
		var speed : float;

		public function Chicken(){
		 // Empty Constructor for serialization and creating new chicks
		}

		public function Save(){
			// Write self to XML file
			//var chickenCollection : ChickenCollection = ChickenContianer.Load(Path.Combine(Application.dataPath, "chickens.xml"));
			//chickenCollection.Save(Path.Combine(Application.persistentDataPath, "chickens.xml"));
		}

		public function Chicken(chickenName : String, ageState : int, transTime : String, color0 : String, color1 : String, color2 : String, newEyeColor: String, newHat : String, newGlasses : String, newNecklace : String, newShoes : String, newHatColor : String, newGlassesColor : String, newNecklaceColor : String, newShoesColor : String, priceOfChicken : int, hungerNum : int, boxNum : int, beakName : String, combName : String, tailName : String, newLove : float, newSpeed : float){
			name = chickenName;
			age = ageState;
			transitionTime = transTime;

			featherColor = color0;
			beakColor = color1;
			combColor = color2;
			eyeColor = newEyeColor;

			hat = newHat;
			glasses = newGlasses;
			necklace = newNecklace;
			shoes = newShoes;

			hatColor = newHatColor;
			glassesColor = newGlassesColor;
			necklaceColor = newNecklaceColor;
			shoesColor = newShoesColor;

			hunger = hungerNum;
			box = boxNum;
			price = priceOfChicken;

			beak = beakName;
			comb = combName;
			tail = tailName;

			love = newLove;
			speed = newSpeed;
		}
	}
}