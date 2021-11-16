/**
 * -----------------------------------------------------------------------------------------------
 * Game completed by 16.11.2021.
 * Story: Protagonist is a famous explorer and enthusiast in ancient knowledge and secrets.
 * In this part of Protagonist aka adventurer, he goes to ancient temple at Vietnam to obtain 
 *   'Vong phusang', powerful and holy fictional object that gives extreme power to the one who
 *   yeilds it.
 * This game for now, just has 1 level and is super easy. I am planning to add more levels in this
 *   game, but not now.
 * -----------------------------------------------------------------------------------------------
 */

//if any comment has '*' at its end, then next line uses method, function or property from p5.

var coinsArray = [];

var bgImg0, bgImg1, bgImg2, bgImg3;

var playBtn;

var fff_forward, backTo1982, karmaticArcade;

var adventurer;
var adventurerImgL,
  adventurerImgR,
  adventurerRunningR,
  adventurerRunningL,
  adventurerJumpingR,
  adventurerJumpingL,
  adventurerFallingR,
  adventurerFallingL;

var not_ground,
  ground,
  ground1,
  ground2,
  ground3,
  ground4,
  ground5,
  ground6,
  ground7,
  groundImg,
  groundImg1,
  groundImg2,
  groundImg3,
  groundImg4,
  groundImg5,
  groundImg6,
  groundImg7;

var gameState = 0;

var coin_animation, collectible1, collectible1_img;

var falling = false;
var falling_hard = false;
var leftSide = false;
var rightSide = true;
var dead = false;

var fireballs;
var fireballImg;

var score = 0;

var coin_sound_effect;

//function where all images, animations & sounds are preloaded.*
function preload() {
    //images*
    bgImg0 = loadImage("assets/images/background0.png");
    bgImg1 = loadImage("assets/images/background1.png");
    groundImg = loadImage("assets/images/ground.png");
    groundImg1 = loadImage("assets/images/ground1.png");
    groundImg2 = loadImage("assets/images/ground2.png");
    groundImg3 = loadImage("assets/images/ground3.png");
    groundImg4 = loadImage("assets/images/ground4.png");
    groundImg5 = loadImage("assets/images/ground5.png");
    groundImg6 = loadImage("assets/images/ground6.png");
    groundImg7 = loadImage("assets/images/ground7.png");
    collectible1_img = loadImage("assets/images/Vong phusang.png");
    fireballImg = loadImage("assets/images/fireball.png");

    //animations*
    bgImg2 = loadAnimation(
        "assets/images/sprite_00.png",
        "assets/images/sprite_01.png",
        "assets/images/sprite_02.png",
        "assets/images/sprite_03.png",
        "assets/images/sprite_04.png",
        "assets/images/sprite_05.png",
        "assets/images/sprite_06.png",
        "assets/images/sprite_07.png",
        "assets/images/sprite_08.png",
        "assets/images/sprite_09.png",
        "assets/images/sprite_10.png",
        "assets/images/sprite_11.png",
        "assets/images/sprite_12.png",
        "assets/images/sprite_13.png"
    );
    adventurerImgL = loadAnimation("assets/images/protagonist_00.png");
    adventurerImgR = loadAnimation("assets/images/protagonist_01.png");
    adventurerRunningR = loadAnimation(
        "assets/images/protagonist_06.png",
        "assets/images/protagonist_07.png",
        "assets/images/protagonist_08.png",
        "assets/images/protagonist_09.png"
    );
    adventurerRunningL = loadAnimation(
        "assets/images/protagonist_02.png",
        "assets/images/protagonist_03.png",
        "assets/images/protagonist_04.png",
        "assets/images/protagonist_05.png"
    );
    adventurerJumpingL = loadAnimation("assets/images/protagonist_10.png");
    adventurerFallingL = loadAnimation("assets/images/protagonist_11.png");
    adventurerJumpingR = loadAnimation("assets/images/protagonist_13.png");
    adventurerFallingR = loadAnimation("assets/images/protagonist_14.png");

    coin_animation = loadAnimation(
        "assets/images/coin_0.png",
        "assets/images/coin_1.png",
        "assets/images/coin_2.png",
        "assets/images/coin_3.png"
    );

    //fonts*
    fff_forward = loadFont("assets/fonts/FFFFORWA.otf");
    backTo1982 = loadFont("assets/fonts/BACKTO1982.otf");

    //sound effect*
    coin_sound_effect = loadSound("assets/sounds/coin_effect.wav");
}

//this function does work once i.e. this function never gets repeated.*
function setup() {
    //creating canvas.*
    createCanvas(1350, 350);

    playBtn = createButton("START");
    playBtn.position(620, 300);
    playBtn.id("startBtn");

    adventurer = createSprite(40, 290, 10, 20);
    adventurer.addAnimation("standingR", adventurerImgR);

    not_ground = createSprite(width / 2, 27, width, 20);
    not_ground.addImage(groundImg);
    not_ground.scale = 0.8;

    ground = createSprite(width / 2, 314, width, 20);
    ground.addImage(groundImg);
    ground.scale = 0.8;

    ground1 = createSprite(210, 260, 120, 20);
    ground1.addImage(groundImg1);

    ground2 = createSprite(360, 220, 100, 20);
    ground2.addImage(groundImg2);

    ground3 = createSprite(480, 170, 80, 20);
    ground3.addImage(groundImg3);

    ground4 = createSprite(620, 240, 140, 20);
    ground4.addImage(groundImg4);

    ground5 = createSprite(780, 170, 110, 20);
    ground5.addImage(groundImg5);

    ground6 = createSprite(940, 190, 130, 20);
    ground6.addImage(groundImg6);

    ground7 = createSprite(1100, 160, 80, 20);
    ground7.addImage(groundImg7);

    //creating coins and push them into array by looping 7 times and 3 times each (to create 3 coins together)
    for (var c = 0; c < 7; c++) {
        for (var j = 190; j <= 230; j += 20) {
            coinsArray.push([createSprite(j, 240, 10, 10)]);
        }
        for (var i = 340; i <= 380; i += 20) {
            coinsArray.push([createSprite(i, 200, 10, 10)]);
        }
        for (var k = 460; k <= 500; k += 20) {
            coinsArray.push([createSprite(k, 150, 10, 10)]);
        }
        for (var l = 600; l <= 640; l += 20) {
            coinsArray.push([createSprite(l, 220, 10, 10)]);
        }
        for (var m = 760; m <= 800; m += 20) {
            coinsArray.push([createSprite(m, 150, 10, 10)]);
        }
        for (var n = 920; n <= 960; n += 20) {
            coinsArray.push([createSprite(n, 170, 10, 10)]);
        }
        for (var o = 1080; o <= 1120; o += 20) {
            coinsArray.push([createSprite(o, 140, 10, 10)]);
        }
    }
    //adding animation to each array element (sprite) of coinArray array.*
    for (var b = 0; b < coinsArray.length; b++) {
        coinsArray[b][0].addAnimation("coinsAnimation", coin_animation);
    }

    collectible1 = createSprite(1340, 265, 10, 10);
    collectible1.addImage(collectible1_img);

    //creating fireballs' group.*
    fireballs = new Group();
}

//this function keeps on repeating.*
function draw() {

    //game state for main menu display.
    if (gameState == 0) {
        //making each sprite invisible.*
        adventurer.visible = false;
        ground.visible = false;
        ground1.visible = false;
        ground2.visible = false;
        ground3.visible = false;
        ground4.visible = false;
        ground5.visible = false;
        ground6.visible = false;
        ground7.visible = false;
        collectible1.visible = false;
        not_ground.visible = false;
        //looping through coinArray to make each sprite (coin) invisible.
        for (var i = 0; i < coinsArray.length; i++) {
            coinsArray[i][0].visible = false;
        }

        //setting background, so that every time frame changes canvas is cleared.*
        background(bgImg0);
        
        //displaying text on canvas.*
        textAlign(CENTER);
        textFont(backTo1982);
        fill("red");
        textSize(30);
        text("Tales of Adventurer", width / 2, height / 2 - 20);

        textAlign(LEFT);
        fill("black");
        textFont(fff_forward);
        var instructionY = height / height + 25;
        textStyle(BOLD);
        textSize(12);
        text("Rules:", width / width + 20, instructionY);
        textStyle(NORMAL);
        textSize(10);
        text(
            "1.Don't get killed! Falling from a height can kill you.",
            width / width + 20,
            instructionY + 20
        );
        text(
            "2.Jump and pass through obstacles.",
            width / width + 20,
            instructionY + 40
        );
        text(
            "3.Get to the end line to get a reward that would be helpful for you in the next level.",
            width / width + 20,
            instructionY + 60
        );

        //making play button (from line no. 140) functional.*
        playBtn.mousePressed(() => {
            //increasing game state to 1 i.e. play.
            gameState = 1;
            //hiding play button.*
            playBtn.hide();
        });
    }

    //game state for play state.
    if (gameState == 1) {
        //making each sprite visible.*
        adventurer.visible = true;
        ground.visible = true;
        ground1.visible = true;
        ground2.visible = true;
        ground3.visible = true;
        ground4.visible = true;
        ground5.visible = true;
        ground6.visible = true;
        ground7.visible = true;
        collectible1.visible = true;
        not_ground.visible = true;
        //using the same method as of line no.230 but this time making them visible.
        for (var i = 0; i < coinsArray.length; i++) {
            coinsArray[i][0].visible = true;
        }

        // setting collider.*
        adventurer.setCollider("rectangle", 0, 0, 22, 55);

        background("grey");

        //plotting background image.*
        fill("#ee0000");
        image(bgImg1, 0, 0, width, height);
        //this line is for finding co-ordinates on canvas.*
        // text(mouseX + "," + mouseY, mouseX, mouseY);

        if (keyIsDown(LEFT_ARROW)) {
            //making sprite move.*
            adventurer.x -= 4;
            //adding and changing animation of adventurer sprite.*
            adventurer.addAnimation("runningL", adventurerRunningL);
            adventurer.changeAnimation("runningL");
            leftSide = true;
            rightSide = false;
        }

        if (keyIsDown(RIGHT_ARROW)) {
            //making sprite move.*
            adventurer.x += 4;
            //adding and changing animation of adventurer sprite.*
            adventurer.addAnimation("runningR", adventurerRunningR);
            adventurer.changeAnimation("runningR");
            rightSide = true;
            leftSide = false;
        }

        if (keyIsDown(UP_ARROW)) {
            // checking if adventurer is facing left or right using boolean variable.
            if (leftSide == true) {
                //making sprite move.*
                adventurer.velocityY = -6.5;
                //adding and changing animation of adventurer sprite.*
                adventurer.addAnimation("jumpingL", adventurerJumpingL);
                adventurer.changeAnimation("jumpingL");
                falling = false;
            } else if (rightSide == true) {
                //making sprite move.*
                adventurer.velocityY = -6.5;
                //adding and changing animation of adventurer sprite.*
                adventurer.addAnimation("jumpingR", adventurerJumpingR);
                adventurer.changeAnimation("jumpingR");
                falling = false;
            }
            //else making it fall with gravity and making 'falling' true.*
        } else {
            adventurer.velocityY += 0.8;
            falling = true;
        }

        //looping through coinArray to check whether adventuer (sprite) is touching coin (sprite).*
        /**If true then:
         * play sound effect.
         * add score.
         * making coin (sprite) invisible by changing its x position.
         */
        for (var d = 0; d < coinsArray.length; d++) {
            if (adventurer.isTouching(coinsArray[d][0])) {
                coin_sound_effect.play();
                // I chose this gigantic, disturbing, recuring number because score is getting added by this number 7 times because of for loop.
                //Therefore, I did maths and obtained a number which gets equal to 1 when added 7 times.
                score += 0.142857142857142857142857142857;
                coinsArray[d][0].x = -100;
            }
        }

        adventurer.collide(ground);
        adventurer.collide(ground1);
        adventurer.collide(ground2);
        adventurer.collide(ground3);
        adventurer.collide(ground4);
        adventurer.collide(ground5);
        adventurer.collide(ground6);
        adventurer.collide(ground7);

        textFont(fff_forward);
        fill("orange");
        text("Coins" + ":" + Math.round(score), 10, 60);

        // making falling false when it touches any of the platform and ground.*
        if (
            adventurer.isTouching(ground) ||
            adventurer.isTouching(ground1) ||
            adventurer.isTouching(ground2) ||
            adventurer.isTouching(ground3) ||
            adventurer.isTouching(ground4) ||
            adventurer.isTouching(ground5) ||
            adventurer.isTouching(ground6) ||
            adventurer.isTouching(ground7)
        ) {
            falling = false;
        }

        // changing game state to 2 i.e. win.
        if (adventurer.isTouching(collectible1)) {
            gameState = 2;
        }

        if (adventurer.velocityY > 14) {
            // falling_hard is boolean variable for checking whether player is falling from a greater height.
            falling_hard = true;
            fill("red");
            text("Falling hard! You might die.", 70, 60);
        }

        // jump to line no.512.
        createFireballs();
    }

    // jump to line no.478.
    checkDeath();

    // game state for win state.
    if (gameState == 2) {
        background(rgb(37, 37, 37));
        adventurer.visible = false;
        ground.visible = false;
        ground1.visible = false;
        ground2.visible = false;
        ground3.visible = false;
        ground4.visible = false;
        ground5.visible = false;
        ground6.visible = false;
        ground7.visible = false;
        collectible1.visible = false;
        not_ground.visible = false;
        // destroying each element of fireballs group.*
        fireballs.destroyEach();
        for (var i = 0; i < coinsArray.length; i++) {
            coinsArray[i][0].visible = false;
        }

        textFont(fff_forward);
        textAlign(CENTER);
        fill("red");
        textSize(40);
        text("Congratulations!!", width / 2, height / 2);
        textSize(20);
        fill("orange");
        text("Thank you for playing this game :)", width / 2, height / 2 + 60);
        text("Hit ctrl + r to restart ;)", width / 2, height / 2 + 100);
    }

    // game state for dead state.
    if (gameState == 3) {
        background(rgb(37, 37, 37));
        adventurer.visible = false;
        ground.visible = false;
        ground1.visible = false;
        ground2.visible = false;
        ground3.visible = false;
        ground4.visible = false;
        ground5.visible = false;
        ground6.visible = false;
        ground7.visible = false;
        collectible1.visible = false;
        not_ground.visible = false;
        fireballs.destroyEach();
        for (var i = 0; i < coinsArray.length; i++) {
            coinsArray[i][0].visible = false;
        }

        textFont(fff_forward);
        textAlign(CENTER);
        fill("red");
        textSize(40);
        text("You died!!", width / 2, height / 2);
        textSize(20);
        fill("orange");
        text(
            `You collected ${Math.round(score)} coins`,
            width / 2,
            height / 2 + 60
        );
        text("Hit ctrl + r to restart ;)", width / 2, height / 2 + 100);
    }

    drawSprites();
}

function checkDeath() {
    // if falling_hard is true and falling is false then dead is true.
    if (falling_hard == true && falling == false) {
        dead = true;
    }

    // if adventurer is touching sprites of fireballs group then dead is true.
    if (adventurer.isTouching(fireballs)) {
        dead = true;
    }

    // if dead is true then game state is changed to 3.
    if (dead == true) {
        gameState = 3;
    }
}

// function that handles key release.*
function keyReleased() {
  if (keyCode === UP_ARROW) {
    if (leftSide == true) {
      adventurer.addAnimation("fallingL", adventurerFallingL);
      adventurer.changeAnimation("fallingL");
    } else {
      adventurer.addAnimation("fallingR", adventurerFallingR);
      adventurer.changeAnimation("fallingR");
    }
  }

  if (keyCode === LEFT_ARROW) {
    adventurer.addAnimation("standingL", adventurerImgL);
    adventurer.changeAnimation("standingL");
  }
  if (keyCode === RIGHT_ARROW) {
    adventurer.addAnimation("standingR", adventurerImgR);
    adventurer.changeAnimation("standingR");
  }
}

// function for creating fireballs.
function createFireballs () {
    if (frameCount % 80 == 0) {
        var fireball1 = createSprite(480, 40, 10, 10);
        fireball1.addImage(fireballImg);
        fireball1.scale = 0.04;
        fireball1.lifetime = 26;
        fireballs.add(fireball1);
    }

    if (frameCount % 60 == 0) {
        var fireball2 = createSprite(1291, 40, 10, 10);
        fireball2.addImage(fireballImg);
        fireball2.scale = 0.04;
        fireball2.lifetime = 60;
        fireballs.add(fireball2);
    }
    fireballs.setVelocityEach(0, 4);
}
