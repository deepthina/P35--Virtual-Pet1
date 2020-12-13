//Create variables here
var dog, hungrydogImage, happydogImage;
var database;
var foodS, foodStock;

function preload() {
  hungrydogImage = loadImage("images/dogImg.png");
  happydogImage = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250, 300, 10, 10);
  dog.addImage(hungrydogImage);
  dog.scale=0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

}


function draw() {

  background(46, 139, 87);

  if (keyDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happydogImage);
  }

  drawSprites();
  //add styles here

  textSize(20);
  fill("white");
  text("Note: Press Up arrow to feed Dimpy milk!", 100, 30);

  text("Food Remaining: "+ foodS ,150,200);

}


function readStock(data) {
  foodS = data.val();
}


function writeStock(quantity) {
  if (quantity <= 0) {
    quantity = 0;
  }
  else {
    quantity = quantity - 1;
  }
  database.ref('/').update({ Food: quantity });
}

