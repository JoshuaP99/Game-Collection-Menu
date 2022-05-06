//The game class is the way to create a specific game
//This holds all information for the object and is invoked with the collection class
class Game{
    constructor(gameName, publisher, yearReleased) {
        this.gameName = gameName;
        this.publisher = publisher;
        this.yearReleased = yearReleased;
    }
  
    describe() {
        return `${this.gameName} was published by ${this.publisher} and released ${this.yearReleased}`;
    }
}

//The collection class holds the parameters for creating a game and holding that information
//The catalog class has it's own array that holds its own information within the overall array
class Collection {
  constructor(name){
    this.name = name;
    this.catalog = [];
  }
    
  addGame(game){
    if(game instanceof Game) {
      this.game.push(game);
    } else {
      throw new Error("That's not a game");
    }
  }
  
  describe(){
    return `${this.game} has ${this.catalog.length} games`;
  }
}

//
class Menu {
  constructor(){
    this.collection = [];
    this.selectedCollection = null;
  }
  
  //This is the code to create the interactivity with the menu
  //When the specific number is used it calls upon one of the functions within the class menu
  start(){
    let selection = this.menuOptions();
    while (selection != 0) {
      switch (selection){
        case "1":
          this.createCollection();
          break;
        case "2":
        	this.viewCollection();
            break;
      	case "3":
        	this.deleteCollection();
            break;
      	case "4":
            this.displayCollections();
            break;
      	default:
        	selection = 0;
        }
      selection = this.menuOptions();
    }
    alert("Closing collector");
  }
  
  //Creates a menu for users to see their options
  //To use the function the index number has to be used rather than the name
  menuOptions(){
      return prompt(`
      0) Exit
      1) Create new collection
      2) View collection
      3) Delete collection
      4) Display all collections
      `);
    }
   
  //Creates the collection menu showing all options to the user
  showCollectionOptions(collectionInfo){
      return prompt (`
      0) Back
      1) Add Game
      2) Delete game
      ------------------
      ${collectionInfo}
    `);
  }
   
  //This function displays each collection and gies their index number
  //This lets the user know which number will invoke that collection
  //to access in the viewCollection function
  displayCollections() {
  	let gameString = ""
    for (let i = 0; i < this.collection.length; i++) {
    	gameString += i + ") " + this.collection[i].name + "\n";
    }
    alert(gameString);
  }
  
  //This function allows the user to create a new collection
  //This also pushes the collection to the collection array listing them individually
  createCollection() {
  	let gameSet = prompt("Enter the title for the new collection");
    this.collection.push(new Collection(gameSet));
  }
  
  //viewCollection allows the user to view one element in the collection array
  //Each element in the collection array holds it own values with the catalog array
  //It holds all infromation created with the Game class
  viewCollection() {
    let index = prompt("Which collection do you want?");
    if (index > -1 && index < this.collection.length) {
      this.selectedCollection = this.collection[index];
      let description = "Collection name: " + this.selectedCollection.name + "\n";
      
      for (let i = 0; i < this.selectedCollection.catalog.length; i++){
        description += i + ") " + this.selectedCollection.catalog[i].gameName 
        + ' - ' + this.selectedCollection.catalog[i].publisher + ' - ' + 
        this.selectedCollection.catalog[i].yearReleased + "\n";
      }
      
      let selection = this.showCollectionOptions(description)
      switch (selection){
        case "1":
          this.createGame();
          break
        case "2":
        	this.deleteGame();
      }
    }
  }
  
  //This function allows the user to delete an element from the collection array
  //The specific collection is invoked with the selectedCollection parameter
  //This selectedCollection is then spliced from the array
  deleteCollection() {
    let index = prompt("Enter the collection you want to delete");
    if (index > -1 && index < this.selectedCollection.length);{
      this.selectedCollection.splice(index, 1);
    }
    
  }

  //createGame allows the user to call upon the collection class and create a game
  //This allows for users to input a new game within their collection
  createGame() {
    let name = prompt("Enter the title of the new game");
    let position = prompt("Enter the year the game was published");
    let height = prompt("Enter who published the game");
    this.selectedCollection.catalog.push(new Game(name, position, height));
  }

  //The delete game function will delete the game element and all properties from the collection
  //The function is invoked in the catalog array since the games are stored in there
  deleteGame() {
    let index = prompt("Enter the collection you want to delete");
    if (index > -1 && index < this.selectedCollection.catalog.length){
      this.selectedCollection.catalog.splice(index, 1);
    }
  }
}

let menu = new Menu();
menu.start();