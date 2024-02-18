    // Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
}

    // Create Dino Objects
const createDinoObjects = async function(){
    const data = await fetch("./dino.json").then(data => data.json());
    const dinosArray = data.Dinos.map(dino=> {
        let {species, weight, height, diet, where, when, fact} = dino;
        return new Dino(species, weight, height, diet, where, when, fact);
    })
    return dinosArray
}

    // Create Human Object
function Human(name, height, weight, diet) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
}

const human = new Human();

    // Use IIFE to get human data from form
const getHumanData = (function(){
    return function(){
        human.name = document.getElementById('name').value;
        human.height = parseInt(document.getElementById('feet').value)*12 + parseInt(document.getElementById('inches').value);
        human.weight = parseInt(document.getElementById('weight').value);
        human.diet = document.getElementById('diet').value;
    }
})();

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
Dino.prototype.compareWeight = function() {
    if(this.weight > human.weight) {
        this.fact = `${this.species} is ${this.weight - human.weight} lbs heavier than ${human.name}`;
    }
    else {
        this.fact = `${this.species} is ${human.weight - this.weight} lbs lighter than ${human.name}`;
    }
}
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function() {
    if(this.height > human.height) {
        this.fact = `${this.species} is ${this.height - human.height} inches taller than ${human.name}`;
    }
    else {
        this.fact = `${this.species} is ${human.height - this.height} inches shorter than ${human.name}`;
    }
}
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function() {
    if(this.diet === human.diet) {
        this.fact = `Both ${this.species} and ${human.name} are ${this.diet}`;
    }
    else {
        this.fact = `${this.species} is ${human.diet} but ${human.name} is ${human.diet}`;
    }
}
/**
* @description Shuffle an array
* @param {Array} array - The array need to be shuffled
*/
const shuffle = function(array){
    let length = array.length, temp, i, j;
    for (i = length-1; i > 0; i--) {
        j = Math.floor(Math.random()*length);
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;        
    }
}
    // Generate Tiles for each Dino in Array
const generateTiles = function(dinosArray){
    shuffle(dinosArray);
    const pigeonIndex = dinosArray.findIndex((dino) => dino.species ==='Pigeon');
    const compareArray = [1,1,1,0,0,0,0];
    shuffle(compareArray);
    compareArray.splice(pigeonIndex,0,0);
    dinosArray.forEach((dino, index) => {
        if(compareArray[index]){
            const randomCompareMethod = Math.floor(Math.random()*3);
            switch(randomCompareMethod){
                case 0:
                    dino.compareWeight();
                    break;
                case 1:
                    dino.compareHeight();
                    break;
                case 2:
                    dino.compareDiet();
                    break;
                default:
                    break;
            }
        }
    })
    dinosArray.splice(4,0,human);

}  
        // Add tiles to DOM
const addTilesToDom = function(dinosArray){
    const grid = document.getElementById('grid');
    dinosArray.forEach((dino) => {
        const div = document.createElement("div");
        div.className = "grid-item";
        const h3Node = document.createElement("h3");
        const imgNode = document.createElement("img");
        const pNode = document.createElement("p");
    
        if (dino instanceof Human) {
            imgNode.src = "./images/human.png";
            h3Node.textContent = dino.name;
            div.appendChild(h3Node);
            div.appendChild(imgNode);
        } else {           
            imgNode.src = `./images/${(dino.species.toLowerCase())}.png`;
            h3Node.textContent = dino.species;
            pNode.textContent = dino.fact;            
            div.appendChild(h3Node);
            div.appendChild(imgNode);
            div.appendChild(pNode);
        }         
        grid.appendChild(div);
    })
}        
    // Remove form from screen
const removeForm = function(){
    const form = document.getElementById('dino-compare');
    form.remove();
}
// On button click, prepare and display infographic
const compare = async function(){
    getHumanData();
    const dinosArray = await createDinoObjects();
    generateTiles(dinosArray);
    addTilesToDom(dinosArray);
    removeForm();
}
const button = document.getElementById('btn');
button.addEventListener('click', compare);
