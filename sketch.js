var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var Feedtime;
var Lastfeed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton("FEED DOG")
  feed.position(500,15)
  feed.mousePressed(FeedDog)
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
 
  drawSprites();
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function FeedDog(){
  dog.addImage(happyDog);
  foodObj.image=loadImage("milkImage.png")
  foodS--;
  database.ref('/').update({
    Food:foodS
  })
  foodobj.updateFoodStock(foodobj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodobj.getFoodStock(),
    FeedTime:hour ()
  })
}


function addFoods(){
  foodS++;
  dog.addImage(sadDog)
  foodObj.image=loadImage("milk.png")
  database.ref('/').update({
    Food:foodS
  })
}
